import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { movements, neighborIds } from '../../data/movements'
import type { Movement } from '../../data/types'
import { cameraStore } from '../../lib/cameraStore'
import { clampCamera, computeFit } from '../../lib/fit'
import { clamp, WORLD_H, WORLD_W, xToYear, ZOOM_MAX, ZOOM_MIN } from '../../lib/world'
import { EdgeLines } from './EdgeLines'
import { MovementNode } from './MovementNode'
import { TimeRuler } from './TimeRuler'
import { DustLayer } from './DustLayer'

interface SpatialMapProps {
  camX: MotionValue<number>
  camY: MotionValue<number>
  zoom: MotionValue<number>
  entered: boolean
  onSelect: (m: Movement) => void
  onViewYear?: (year: number) => void
  reducedMotion: boolean
}

/**
 * 艺术流派空间图（文档 §5）：
 * 一个 2.5D 的世界容器 —— 拖拽平移、滚轮缩放、Hover 联动、点击推进。
 */
export function SpatialMap({
  camX,
  camY,
  zoom,
  entered,
  onSelect,
  onViewYear,
  reducedMotion,
}: SpatialMapProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const enteredRef = useRef(entered)
  enteredRef.current = entered

  /* 初始相机：恢复记忆视角，或取 Hero 远景；从详情返回时拉回全景 */
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const w = el.clientWidth
    const h = el.clientHeight
    const stored = cameraStore.cam

    if (stored) {
      camX.set(stored.x)
      camY.set(stored.y)
      zoom.set(stored.zoom)
      if (cameraStore.entered) {
        const fit = computeFit(w, h)
        const ease = [0.22, 1, 0.36, 1] as const
        const t = window.setTimeout(() => {
          animate(camX, fit.x, { duration: reducedMotion ? 0 : 1.0, ease })
          animate(camY, fit.y, { duration: reducedMotion ? 0 : 1.0, ease })
          animate(zoom, fit.zoom, { duration: reducedMotion ? 0 : 1.0, ease })
        }, 300)
        return () => window.clearTimeout(t)
      }
    } else {
      const fit = computeFit(w, h)
      if (enteredRef.current) {
        // 深链直接进入探索模式
        camX.set(fit.x)
        camY.set(fit.y)
        zoom.set(fit.zoom)
      } else {
        const heroZoom = fit.zoom * 0.88
        const cx = (w / 2 - fit.x) / fit.zoom
        const cy = (h / 2 - fit.y) / fit.zoom
        camX.set(w / 2 - cx * heroZoom)
        camY.set(h / 2 - cy * heroZoom)
        zoom.set(heroZoom)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* 相机持久化（供返回时恢复） */
  useEffect(() => {
    const save = () => {
      cameraStore.cam = { x: camX.get(), y: camY.get(), zoom: zoom.get() }
    }
    const un = [camX.on('change', save), camY.on('change', save), zoom.on('change', save)]
    save()
    return () => un.forEach((u) => u())
  }, [camX, camY, zoom])

  /* 汇报视口中心年份（供时间轴读数） */
  const reportYear = () => {
    const el = ref.current
    if (!el || !onViewYear) return
    const centerWorldX = (el.clientWidth / 2 - camX.get()) / zoom.get()
    onViewYear(Math.round(xToYear(centerWorldX)))
  }
  useMotionValueEvent(camX, 'change', reportYear)
  useMotionValueEvent(zoom, 'change', reportYear)

  /* 拖拽平移（带边界限制：不能滑出内容区） */
  const pan = useRef<{ px: number; py: number; cx: number; cy: number } | null>(null)

  /** 统一入口：任何相机变更都先过边界夹取再写入 */
  const applyCam = (x: number, y: number, z: number) => {
    const el = ref.current
    if (!el) return
    const c = clampCamera(el.clientWidth, el.clientHeight, { x, y, zoom: z })
    camX.set(c.x)
    camY.set(c.y)
    zoom.set(c.zoom)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enteredRef.current) return
    if ((e.target as HTMLElement).closest('[data-node]')) return
    pan.current = { px: e.clientX, py: e.clientY, cx: camX.get(), cy: camY.get() }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!pan.current) return
    applyCam(
      pan.current.cx + (e.clientX - pan.current.px),
      pan.current.cy + (e.clientY - pan.current.py),
      zoom.get(),
    )
  }
  const endPan = () => {
    pan.current = null
  }

  /* 窗口尺寸变化时重新夹取当前相机（防止缩小窗口后内容跑偏） */
  useEffect(() => {
    const onResize = () => applyCam(camX.get(), camY.get(), zoom.get())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* 滚轮缩放（朝光标）/ 触控板双指平移 */
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (!enteredRef.current) return
      e.preventDefault()
      if (!e.ctrlKey && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        applyCam(camX.get() - e.deltaX, camY.get() - e.deltaY, zoom.get())
        return
      }
      const rect = el.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      const z0 = zoom.get()
      const z1 = clamp(z0 * Math.exp(-e.deltaY * 0.0016), ZOOM_MIN, ZOOM_MAX)
      const k = z1 / z0
      applyCam(px - (px - camX.get()) * k, py - (py - camY.get()) * k, z1)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camX, camY, zoom])

  /* 远景尘埃层的视差（慢于世界层，营造纵深） */
  const dustX = useTransform(camX, (v) => v * 0.82 + 30)
  const dustY = useTransform(camY, (v) => v * 0.82 + 20)

  const neighbors = hovered ? neighborIds(hovered) : null

  return (
    <div
      ref={ref}
      className="absolute inset-0 overflow-hidden"
      style={{ cursor: entered ? 'grab' : 'default', touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPan}
      onPointerCancel={endPan}
    >
      {/* 远景：尘埃与坐标点（0.82 倍速视差） */}
      <motion.div className="absolute left-0 top-0" style={{ x: dustX, y: dustY }}>
        <DustLayer />
      </motion.div>

      {/* 世界层 */}
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: camX, y: camY, scale: zoom, transformOrigin: '0 0' }}
      >
        <div className="relative" style={{ width: WORLD_W, height: WORLD_H }}>
          <TimeRuler />
          <EdgeLines hoveredId={hovered} />
          {movements.map((m, i) => (
            <MovementNode
              key={m.id}
              movement={m}
              index={i}
              reducedMotion={reducedMotion}
              visualState={
                hovered === null
                  ? 'normal'
                  : hovered === m.id
                    ? 'active'
                    : neighbors?.has(m.id)
                      ? 'related'
                      : 'dim'
              }
              onHover={setHovered}
              onSelect={onSelect}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
