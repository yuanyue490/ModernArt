#!/usr/bin/env node
/**
 * 本地作品图片与溯源元数据校验。
 *
 * 默认：结构错误退出 1，历史待复核项只警告。
 * --strict：任何 needs-review 警告也退出 1，用作发布前内容门禁。
 */
import { createHash } from 'node:crypto'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { artworkImageMeta } from '../src/data/artworkImageMeta.ts'
import { artworks } from '../src/data/artworks.ts'

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const ARTWORKS_DIR = path.join(ROOT, 'public/artworks')
const STRICT = process.argv.includes('--strict')

const errors = []
const warnings = []
const infos = []
const seenIds = new Set()
const usedPaths = new Set()
const retainedPaths = new Set()
const hashes = new Map()
const statusCount = new Map()
let referenceCount = 0

function webpDimensions(buffer) {
  if (buffer.toString('ascii', 0, 4) !== 'RIFF' || buffer.toString('ascii', 8, 12) !== 'WEBP') {
    throw new Error('不是有效的 WebP RIFF 文件')
  }

  const chunk = buffer.toString('ascii', 12, 16)
  if (chunk === 'VP8 ') {
    const marker = buffer.indexOf(Buffer.from([0x9d, 0x01, 0x2a]), 20)
    if (marker === -1) throw new Error('无法读取 VP8 尺寸')
    return {
      width: buffer.readUInt16LE(marker + 3) & 0x3fff,
      height: buffer.readUInt16LE(marker + 5) & 0x3fff,
    }
  }
  if (chunk === 'VP8X') {
    return {
      width: 1 + buffer.readUIntLE(24, 3),
      height: 1 + buffer.readUIntLE(27, 3),
    }
  }
  if (chunk === 'VP8L') {
    const bits = buffer.readUInt32LE(21)
    return {
      width: 1 + (bits & 0x3fff),
      height: 1 + ((bits >> 14) & 0x3fff),
    }
  }
  throw new Error(`不支持的 WebP 编码块：${chunk}`)
}

for (const [movementId, movementArtworks] of Object.entries(artworks)) {
  for (const artwork of movementArtworks) {
    const key = `${movementId}/${artwork.id}`
    if (seenIds.has(artwork.id)) errors.push(`${key}：作品 id 重复`)
    seenIds.add(artwork.id)

    const meta = artwork.imageMeta
    if (!meta) {
      errors.push(`${key}：缺少 imageMeta`)
      continue
    }
    statusCount.set(meta.status, (statusCount.get(meta.status) ?? 0) + 1)

    if (artwork.reference) {
      referenceCount += 1
      for (const field of ['provider', 'url', 'verifiedOn']) {
        if (!artwork.reference[field]) errors.push(`${key}：作品资料缺少 ${field}`)
      }
      if (artwork.reference.url && !artwork.reference.url.startsWith('https://')) {
        errors.push(`${key}：作品资料 URL 必须使用 HTTPS`)
      }
    } else {
      warnings.push(`${key}：作品身份/馆藏资料来源待补`)
    }

    if (meta.retainedAsset) retainedPaths.add(meta.retainedAsset)

    if (!artwork.image) {
      if (meta.status === 'verified' || meta.status === 'needs-review') {
        errors.push(`${key}：状态为 ${meta.status}，但没有 image`)
      }
      if (meta.sha256) errors.push(`${key}：无展示图片却记录了 sha256`)
      continue
    }

    usedPaths.add(artwork.image)
    if (!['verified', 'needs-review'].includes(meta.status)) {
      errors.push(`${key}：有展示图片，但状态为 ${meta.status}`)
    }
    if (!artwork.image.startsWith('/artworks/') || !artwork.image.endsWith('.webp')) {
      errors.push(`${key}：图片路径必须是 /artworks/*.webp`)
      continue
    }

    for (const field of ['provider', 'sourceUrl', 'license', 'sha256']) {
      if (!meta[field]) errors.push(`${key}：有图片但缺少 ${field}`)
    }
    if (meta.sourceUrl && !meta.sourceUrl.startsWith('https://')) {
      errors.push(`${key}：sourceUrl 必须使用 HTTPS`)
    }
    if (meta.status === 'verified') {
      for (const field of ['providerId', 'verifiedOn']) {
        if (!meta[field]) errors.push(`${key}：verified 状态缺少 ${field}`)
      }
    } else if (meta.status === 'needs-review') {
      warnings.push(`${key}：历史图片来源与许可仍待人工复核`)
    }

    const localPath = path.join(ROOT, 'public', artwork.image.slice(1))
    if (!existsSync(localPath)) {
      errors.push(`${key}：本地文件不存在 ${artwork.image}`)
      continue
    }
    const size = statSync(localPath).size
    if (size < 15_000) errors.push(`${key}：文件小于 15KB，疑似无效资源`)

    const buffer = readFileSync(localPath)
    try {
      const { width, height } = webpDimensions(buffer)
      if (Math.max(width, height) < 1200) {
        errors.push(`${key}：图片尺寸 ${width}×${height}，长边不足 1200px`)
      }
    } catch (error) {
      errors.push(`${key}：${error.message}`)
    }

    const sha256 = createHash('sha256').update(buffer).digest('hex')
    if (meta.sha256 && sha256 !== meta.sha256) {
      errors.push(`${key}：SHA-256 与元数据不一致`)
    }
    const duplicate = hashes.get(sha256)
    if (duplicate) errors.push(`${key}：与 ${duplicate} 使用了相同图片`)
    hashes.set(sha256, key)
  }
}

for (const id of Object.keys(artworkImageMeta)) {
  if (!seenIds.has(id)) errors.push(`imageMeta/${id}：找不到对应作品`)
}

for (const file of readdirSync(ARTWORKS_DIR).filter((name) => name.endsWith('.webp'))) {
  const publicPath = `/artworks/${file}`
  if (!usedPaths.has(publicPath) && !retainedPaths.has(publicPath)) {
    errors.push(`${publicPath}：孤儿图片，未被作品引用且未登记为 retainedAsset`)
  }
}

for (const retainedPath of retainedPaths) {
  const localPath = path.join(ROOT, 'public', retainedPath.slice(1))
  if (!existsSync(localPath)) errors.push(`${retainedPath}：登记为 retainedAsset，但文件不存在`)
  infos.push(`${retainedPath}：保留的停用资源，不会在页面展示`)
}

const statuses = [...statusCount.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([status, count]) => `${status}=${count}`)
  .join('，')

console.log(
  `作品 ${seenIds.size} 件；展示图 ${usedPaths.size} 张；作品资料 ${referenceCount}/${seenIds.size}；状态：${statuses}`,
)
for (const info of infos) console.log(`ℹ️ ${info}`)
for (const warning of warnings) console.warn(`⚠️ ${warning}`)
for (const error of errors) console.error(`❌ ${error}`)

if (errors.length || (STRICT && warnings.length)) {
  console.error(
    `校验未通过：${errors.length} 个错误，${warnings.length} 个警告${STRICT ? '（strict）' : ''}`,
  )
  process.exitCode = 1
} else {
  console.log(`校验通过：0 个错误，${warnings.length} 个警告`)
}
