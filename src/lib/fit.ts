import { movements } from '../data/movements'
import type { Movement } from '../data/types'
import type { CameraState } from './cameraStore'
import { clamp, OY, ZOOM_MAX, ZOOM_MIN } from './world'

const PAD_X = 300
const PAD_TOP = 280
const PAD_BOTTOM = 280

/** 所有节点（含幽灵）的内容包围盒 */
export function contentBounds() {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const m of movements) {
    minX = Math.min(minX, m.map.x)
    maxX = Math.max(maxX, m.map.x)
    minY = Math.min(minY, m.map.y)
    maxY = Math.max(maxY, m.map.y)
  }
  return {
    minX: minX - PAD_X,
    maxX: maxX + PAD_X,
    minY: minY - PAD_TOP,
    maxY: maxY + PAD_BOTTOM,
  }
}

/** 让整张关系网恰好落入视口的相机 */
export function computeFit(vw: number, vh: number): CameraState {
  const b = contentBounds()
  const zoom = clamp(Math.min(vw / (b.maxX - b.minX), vh / (b.maxY - b.minY)), ZOOM_MIN, 1)
  const cx = (b.minX + b.maxX) / 2
  const cy = (b.minY + b.maxY) / 2 + OY
  return { zoom, x: vw / 2 - cx * zoom, y: vh / 2 - cy * zoom }
}

/** 点击进入详情前的"镜头推进"目标相机 */
export function focusCamera(m: Movement, vw: number, vh: number): CameraState {
  const zoom = 1.35
  return {
    zoom,
    x: vw / 2 - m.map.x * zoom,
    y: vh / 2 - (m.map.y + OY) * zoom,
  }
}

/** Hero 态视角：比全景略远，营造纵深 */
export function heroCamera(vw: number, vh: number): CameraState {
  const fit = computeFit(vw, vh)
  const zoom = fit.zoom * 0.88
  const cx = (vw / 2 - fit.x) / fit.zoom
  const cy = (vh / 2 - fit.y) / fit.zoom
  return { zoom, x: vw / 2 - cx * zoom, y: vh / 2 - cy * zoom }
}

/* ------------------------------------------------------------------ */
/* 相机边界：内容四周最多露出 SCREEN_MARGIN 像素的虚空，                 */
/* 防止无限平移到没有内容的年份/区域。                                   */
/* ------------------------------------------------------------------ */

const SCREEN_MARGIN = 72

/** 给定视口与缩放，计算相机偏移 camX/camY 的合法区间 */
export function cameraOffsetBounds(vw: number, vh: number, zoom: number) {
  const b = contentBounds()
  const worldMinY = b.minY + OY
  const worldMaxY = b.maxY + OY

  /** 单轴计算：[内容近端不越过近边距] 且 [内容远端不越过远边距] */
  const axis = (viewport: number, lo: number, hi: number): [number, number] => {
    const min = viewport - SCREEN_MARGIN - hi * zoom
    const max = SCREEN_MARGIN - lo * zoom
    if (min > max) {
      // 内容比视口小：固定居中
      const centered = (viewport - (lo + hi) * zoom) / 2
      return [centered, centered]
    }
    return [min, max]
  }

  const [minCamX, maxCamX] = axis(vw, b.minX, b.maxX)
  const [minCamY, maxCamY] = axis(vh, worldMinY, worldMaxY)
  return { minCamX, maxCamX, minCamY, maxCamY }
}

/** 把任意相机状态夹取到合法范围（缩放也一并夹取） */
export function clampCamera(vw: number, vh: number, cam: CameraState): CameraState {
  const z = clamp(cam.zoom, ZOOM_MIN, ZOOM_MAX)
  const b = cameraOffsetBounds(vw, vh, z)
  return {
    zoom: z,
    x: clamp(cam.x, b.minCamX, b.maxCamX),
    y: clamp(cam.y, b.minCamY, b.maxCamY),
  }
}
