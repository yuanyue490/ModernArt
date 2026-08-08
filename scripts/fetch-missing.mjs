#!/usr/bin/env node
/**
 * 多来源公有领域图片抓取（查找缺失作品图）：
 *   1. Wikimedia Commons（filetype:bitmap，宽 ≥1200，取 1800 宽缩略图）
 *   2. 大都会博物馆开放 API（仅 isPublicDomain / CC0）
 *   3. 芝加哥艺术学院 API（仅 public_domain，IIIF 1686px）
 * 用法: node scripts/fetch-missing.mjs
 * 已存在的文件默认跳过，加 --force 重新抓。
 */
import { createWriteStream, existsSync, mkdirSync } from 'node:fs'
import { pipeline } from 'node:stream/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/artworks')
const UA = 'ModernArt150/0.2 (educational art-history site; localhost dev)'
const FORCE = process.argv.includes('--force')

mkdirSync(OUT, { recursive: true })

/* 待补作品：依次为 Commons / Met / AIC 的搜索词组。
 * mustMatch 是防呆护栏：命中结果的标题必须匹配该正则才会被下载，
 * 否则全文搜索可能带回风马牛不相及的文件（教训：搜 "Braque The Portuguese"
 * 曾命中一只名叫 "Mottled emigrant" 的蝴蝶照片）。 */
const TARGETS = [
  {
    file: 'rodchenko-books.jpg',
    label: 'Rodchenko «Books» 1924',
    mustMatch: /rodchenko|родченко/i,
    commons: ['intitle:Rodchenko intitle:books', 'Rodchenko Books poster 1924', 'Rodchenko Lilya Brik books', 'Родченко книги плакат'],
    met: ['Rodchenko Books'],
    aic: ['Rodchenko'],
  },
  {
    file: 'moholy-nagy-a19.jpg',
    label: 'Moholy-Nagy A 19 (1927)',
    mustMatch: /moholy/i,
    commons: ['intitle:Moholy-Nagy intitle:A19', 'Moholy-Nagy A 19 1927 painting', 'László Moholy-Nagy A 19'],
    met: ['Moholy-Nagy A 19'],
    aic: ['Moholy-Nagy'],
  },
  {
    file: 'braque-portuguese.jpg',
    label: 'Braque（分析立体主义时期油画）',
    mustMatch: /braque/i,
    commons: ['intitle:Braque intitle:Portuguese', 'intitle:Braque intitle:violin intitle:candlestick', 'Georges Braque 1910 1911 analytical cubism'],
    met: ['Braque violin', 'Georges Braque'],
    aic: ['Georges Braque violin', 'Braque'],
  },
  {
    file: 'demoiselles.jpg',
    label: 'Picasso Les Demoiselles d’Avignon（版权未过期，已知无图，直接跳过）',
    mustMatch: /picasso.*demoiselles|demoiselles.*picasso/i,
    commons: [],
    met: [],
    aic: [],
  },
  /* ---- M4：转正节点补缺图 ---- */
  {
    file: 'courbet-stonebreakers.jpg',
    label: 'Courbet The Stone Breakers 1849',
    mustMatch: /courbet|stone.?breaker/i,
    commons: ['Courbet Stone Breakers', 'intitle:Courbet intitle:stone', 'Gustave Courbet Stone Breakers 1849'],
    met: ['Courbet Stone Breakers'],
    aic: ['Courbet'],
  },
  {
    file: 'marc-blue-horses.jpg',
    label: 'Franz Marc The Large Blue Horses 1911',
    mustMatch: /marc|blue.?horse|blauen? ?pferd/i,
    commons: ['Franz Marc Large Blue Horses', 'intitle:Marc intitle:blue intitle:horse', 'Franz Marc blaue Pferde'],
    met: ['Franz Marc blue horses'],
    aic: ['Franz Marc'],
  },
  {
    file: 'magritte-son-of-man.jpg',
    label: 'Magritte The Son of Man 1964',
    mustMatch: /magritte|son of man|fils de l/i,
    commons: ['Magritte Son of Man', 'intitle:Magritte intitle:Son', 'René Magritte fils de l homme'],
    met: ['Magritte Son of Man'],
    aic: ['Magritte'],
  },
  {
    file: 'magritte-treachery.jpg',
    label: 'Magritte The Treachery of Images 1929',
    mustMatch: /magritte|treachery|trahison|pipe|ceci/i,
    commons: ['Magritte Treachery of Images', 'Magritte this is not a pipe', 'Magritte trahison des images'],
    met: ['Magritte pipe'],
    aic: ['Magritte'],
  },
  {
    file: 'flavin-monument.jpg',
    label: 'Dan Flavin Monument for V. Tatlin 1964',
    mustMatch: /flavin|tatlin|fluorescent/i,
    commons: ['Flavin Monument Tatlin', 'intitle:Flavin intitle:Tatlin', 'Dan Flavin fluorescent'],
    met: ['Flavin Tatlin'],
    aic: ['Dan Flavin'],
  },
  {
    file: 'woman-with-hat.jpg',
    label: 'Matisse Woman with a Hat 1905',
    mustMatch: /matisse/i,
    commons: ['intitle:Matisse intitle:Woman intitle:Hat', 'Matisse Woman with a Hat 1905', 'Femme au chapeau Matisse'],
    met: ['Matisse Woman with a Hat'],
    aic: ['Matisse'],
  },
  {
    file: 'matisse-dance.jpg',
    label: 'Matisse Dance (I) 1909',
    mustMatch: /matisse|danse/i,
    commons: ['intitle:Matisse intitle:Dance', 'Matisse La Danse 1909', 'Matisse Dance MoMA'],
    met: ['Matisse Dance'],
    aic: ['Matisse'],
  },
  {
    file: 'derain-charing-cross.jpg',
    label: 'Derain Charing Cross Bridge 1906',
    mustMatch: /derain|charing/i,
    commons: ['Derain Charing Cross Bridge', 'Derain London bridge 1906', 'intitle:Derain intitle:bridge'],
    met: ['Derain'],
    aic: ['Derain'],
  },
  {
    file: 'dog-leash.jpg',
    label: 'Balla Dynamism of a Dog on a Leash 1912',
    mustMatch: /balla|dog|dynamism/i,
    commons: ['Balla Dynamism of a Dog on a Leash', 'intitle:Balla intitle:dog', 'Giacomo Balla dog leash'],
    met: ['Balla dog'],
    aic: ['Balla'],
  },
  {
    file: 'unique-forms.jpg',
    label: 'Boccioni Unique Forms of Continuity in Space 1913',
    mustMatch: /boccioni|unique forms|continuity/i,
    commons: ['Boccioni Unique Forms of Continuity', 'intitle:Boccioni intitle:forms', 'Boccioni bronze sculpture 1913'],
    met: ['Boccioni'],
    aic: ['Boccioni'],
  },
  {
    file: 'black-square.jpg',
    label: 'Malevich Black Square 1915',
    mustMatch: /malevich|black square|черный квадрат/i,
    commons: ['intitle:Malevich intitle:black intitle:square', 'Malevich Black Square 1915', 'Чёрный квадрат Малевича'],
    met: ['Malevich'],
    aic: ['Malevich'],
  },
  {
    file: 'white-on-white.jpg',
    label: 'Malevich White on White 1918',
    mustMatch: /malevich|white on white/i,
    commons: ['Malevich Suprematist Composition White on White', 'intitle:Malevich intitle:Suprematist intitle:White'],
    met: ['Malevich white'],
    aic: ['Malevich white on white'],
  },
  {
    file: 'suprematist-composition.jpg',
    label: 'Malevich Suprematist Composition 1916',
    mustMatch: /malevich|suprematist/i,
    commons: ['Malevich Suprematist Composition', 'intitle:Malevich intitle:composition', 'Suprematist Composition blue rectangle red beam'],
    met: ['Malevich composition'],
    aic: ['Malevich'],
  },
  {
    file: 'mondrian-composition-ii.jpg',
    label: 'Mondrian Composition II in Red, Blue, and Yellow 1930',
    mustMatch: /mondrian|mondriaan/i,
    commons: ['Mondrian Composition II Red Blue Yellow', 'intitle:Mondrian intitle:composition', 'Piet Mondrian 1930 red blue yellow'],
    met: ['Mondrian Composition'],
    aic: ['Mondrian'],
  },
  {
    file: 'doesburg-counter-composition.jpg',
    label: 'Van Doesburg Counter-Composition V 1924',
    mustMatch: /doesburg|counter-composition/i,
    commons: ['Doesburg Counter-Composition', 'intitle:Doesburg intitle:composition', 'Theo van Doesburg 1924'],
    met: ['van Doesburg'],
    aic: ['van Doesburg'],
  },
  {
    file: 'victory-boogie-woogie.jpg',
    label: 'Mondrian Victory Boogie Woogie 1944',
    mustMatch: /victory boogie/i,
    commons: ['Mondrian Victory Boogie Woogie', 'intitle:Victory intitle:Boogie', 'Piet Mondrian boogie woogie victory'],
    met: ['Mondrian Victory Boogie'],
    aic: ['Mondrian Victory Boogie Woogie'],
  },
]

const get = async (url, opts = {}, retries = 3) => {
  let lastErr = new Error('unreachable')
  for (let i = 0; i < retries; i++) {
    const ctrl = new AbortController()
    const t = setTimeout(() => ctrl.abort(), 25000)
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': UA, Accept: 'application/json' },
        signal: ctrl.signal,
        ...opts,
      })
      clearTimeout(t)
      if (res.status === 429) {
        const wait = 6000 * (i + 1)
        console.log(`  .. 429 限流，${wait / 1000}s 后重试 (${i + 1}/${retries})`)
        await new Promise((r) => setTimeout(r, wait))
        lastErr = new Error('HTTP 429')
        continue
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res
    } catch (e) {
      clearTimeout(t)
      lastErr = e
      if (i < retries - 1) await new Promise((r) => setTimeout(r, 3000))
    }
  }
  throw lastErr
}

/* ---- 来源 1: Wikimedia Commons ---- */
async function fromCommons(query, mustMatch) {
  const api =
    'https://commons.wikimedia.org/w/api.php?action=query&format=json' +
    '&generator=search&gsrnamespace=6&gsrlimit=8&prop=imageinfo' +
    '&iiprop=url|size|mime&iiurlwidth=1800&gsrsearch=' +
    encodeURIComponent(query)
  const json = await (await get(api)).json()
  const pages = Object.values(json?.query?.pages ?? {})
  const cands = pages
    .map((p) => ({ title: p.title ?? '', ...(p.imageinfo?.[0] ?? {}) }))
    .filter((ii) => ii.mime === 'image/jpeg' && ii.width >= 1200 && ii.thumburl && mustMatch.test(ii.title))
    .sort((a, b) => b.width - a.width)
  if (!cands.length) return null
  return { url: cands[0].thumburl, note: `commons «${query}» ${cands[0].title} ${cands[0].width}w` }
}

/* ---- 来源 2: Met 开放 API ---- */
async function fromMet(query, mustMatch) {
  const s = await (
    await get(
      'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=' +
        encodeURIComponent(query),
    )
  ).json()
  const ids = (s?.objectIDs ?? []).slice(0, 10)
  for (const id of ids) {
    try {
      const o = await (
        await get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
      ).json()
      if (o?.isPublicDomain && o?.primaryImage && mustMatch.test(`${o.title} ${o.artistDisplayName}`)) {
        return { url: o.primaryImage, note: `met «${query}» #${id} «${o.title}»` }
      }
    } catch {
      /* 单条失败继续 */
    }
  }
  return null
}

/* ---- 来源 3: 芝加哥艺术学院 API ---- */
async function fromAic(query, mustMatch) {
  const api =
    'https://api.artic.edu/api/v1/artworks/search?limit=6' +
    '&fields=id,title,image_id,artist_title&query[term][is_public_domain]=true&q=' +
    encodeURIComponent(query)
  const json = await (await get(api)).json()
  const hit = (json?.data ?? []).find(
    (d) => d.image_id && mustMatch.test(`${d.title} ${d.artist_title}`),
  )
  if (!hit) return null
  return {
    url: `https://www.artic.edu/iiif/2/${hit.image_id}/full/1686,/0/default.jpg`,
    note: `aic «${query}» «${hit.title}»`,
  }
}

async function download(url, dest) {
  const res = await get(url, { headers: { 'User-Agent': UA } })
  const type = res.headers.get('content-type') ?? ''
  if (!type.includes('image')) throw new Error(`非图片 content-type: ${type}`)
  await pipeline(res.body, createWriteStream(dest))
}

for (const t of TARGETS) {
  const dest = path.join(OUT, t.file)
  if (existsSync(dest) && !FORCE) {
    console.log(`SKIP ${t.file}（已存在）`)
    continue
  }
  let found = null
  outer: for (const [source, queries] of [
    ['commons', t.commons],
    ['met', t.met],
    ['aic', t.aic],
  ]) {
    for (const q of queries) {
      try {
        found = source === 'commons' ? await fromCommons(q, t.mustMatch) : source === 'met' ? await fromMet(q, t.mustMatch) : await fromAic(q, t.mustMatch)
      } catch (e) {
        console.log(`  .. ${source} «${q}» 失败: ${e.message}`)
      }
      if (found) break outer
    }
  }
  if (!found) {
    console.log(`MISS ${t.file}  ${t.label}`)
    continue
  }
  try {
    await download(found.url, dest)
    console.log(`OK   ${t.file}  ← ${found.note}`)
  } catch (e) {
    console.log(`FAIL ${t.file}  下载失败: ${e.message}`)
  }
}
console.log('done.')
