/**
 * 世界坐标系：横轴为时间，纵轴为思想分支巷道。
 * 世界原点位于左上角；年份 → x 的换算在此定义。
 */

export const YEAR_ORIGIN = 1860
export const PX_PER_YEAR = 26

export const yearToX = (year: number): number => (year - YEAR_ORIGIN) * PX_PER_YEAR
export const xToYear = (x: number): number => YEAR_ORIGIN + x / PX_PER_YEAR

/** 世界覆盖的时间范围（1860—NOW≈2020，含两端留白） */
export const YEAR_MAX = 2020
/** 世界容器尺寸：宽度由时间跨度换算（+ 左右各 260px 呼吸），高度容纳上下分支巷道 */
export const WORLD_W = yearToX(YEAR_MAX) + 520
export const WORLD_H = 1500
/** 世界 y=0（主巷道）在容器内的纵向偏移 */
export const OY = 750

/** 相机缩放范围（世界变大后最小缩放调低，让全景能一屏放下） */
export const ZOOM_MIN = 0.18
export const ZOOM_MAX = 2.0

export const clamp = (v: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, v))
