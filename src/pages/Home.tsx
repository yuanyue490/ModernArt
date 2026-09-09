import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { SpatialMap } from '../components/map/SpatialMap'
import { Hero } from '../components/home/Hero'
import { TimelineNav } from '../components/home/TimelineNav'
import { MobileTimeline } from '../components/home/MobileTimeline'
import { cameraStore } from '../lib/cameraStore'
import { computeFit, focusCamera } from '../lib/fit'
import { yearToX } from '../lib/world'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import type { Movement } from '../data/types'

const EASE = [0.22, 1, 0.36, 1] as const

export default function Home() {
  const navigate = useNavigate()
  const reducedMotion = usePrefersReducedMotion()

  const [entered, setEntered] = useState(
    () =>
      cameraStore.entered ||
      new URLSearchParams(window.location.search).has('entered'),
  )
  const [viewYear, setViewYear] = useState(1895)

  /* 相机 */
  const camX = useMotionValue(0)
  const camY = useMotionValue(0)
  const zoom = useMotionValue(0.5)

  /* Hero 鼠标视差 */
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 55, damping: 18 })
  const sy = useSpring(my, { stiffness: 55, damping: 18 })
  const mapRotateY = useTransform(sx, (v) => v * 2.4)
  const mapRotateX = useTransform(sy, (v) => v * -1.8)
  const heroTextX = useTransform(sx, (v) => v * -16)
  const heroTextY = useTransform(sy, (v) => v * -12)

  /* 穿过 Hero，进入时间线（ref 防抖，避免 StrictMode 下副作用双调） */
  const enteringRef = useRef(false)
  const enter = useCallback(() => {
    if (enteringRef.current) return
    enteringRef.current = true
    cameraStore.entered = true
    setEntered(true)
    const f = computeFit(window.innerWidth, window.innerHeight)
    const d = reducedMotion ? 0 : 1.15
    animate(camX, f.x, { duration: d, ease: EASE })
    animate(camY, f.y, { duration: d, ease: EASE })
    animate(zoom, f.zoom, { duration: d, ease: EASE })
  }, [camX, camY, zoom, reducedMotion])

  const backToHero = useCallback(() => {
    enteringRef.current = false
    setEntered(false)
  }, [])

  /* Hero 态：滚轮 = 进入 */
  useEffect(() => {
    if (entered) return
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (e.deltaY > 4) enter()
    }
    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [entered, enter])

  /* Hero 态：鼠标视差；进入后归零 */
  useEffect(() => {
    if (entered || reducedMotion) {
      mx.set(0)
      my.set(0)
      return
    }
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5)
      my.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [entered, reducedMotion, mx, my])

  /* 首页锁定页面滚动 */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  /* 时间轴拖动 → 平移镜头 */
  const scrubTo = useCallback(
    (year: number) => {
      const target = window.innerWidth / 2 - yearToX(year) * zoom.get()
      animate(camX, target, { duration: reducedMotion ? 0 : 0.55, ease: EASE })
    },
    [camX, zoom, reducedMotion],
  )

  /* 点击节点 → 镜头推进 → 进入详情页 */
  const select = useCallback(
    (m: Movement) => {
      cameraStore.lastFocusId = m.id
      const fc = focusCamera(m, window.innerWidth, window.innerHeight)
      const d = reducedMotion ? 0 : 0.7
      animate(camX, fc.x, { duration: d, ease: [0.55, 0.06, 0.2, 1] })
      animate(camY, fc.y, { duration: d, ease: [0.55, 0.06, 0.2, 1] })
      animate(zoom, fc.zoom, { duration: d, ease: [0.55, 0.06, 0.2, 1] })
      window.setTimeout(() => navigate(`/movement/${m.id}`), reducedMotion ? 0 : 680)
    },
    [camX, camY, zoom, navigate, reducedMotion],
  )

  const selectMobile = useCallback(
    (m: Movement) => {
      cameraStore.lastFocusId = m.id
      navigate(`/movement/${m.id}`)
    },
    [navigate],
  )

  return (
    <motion.main
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="fixed inset-0 overflow-hidden bg-coal"
    >
      {/* 2.5D 透视包装：Hero 态下随鼠标轻微倾斜 */}
      <div
        className={`absolute inset-0 ${entered ? 'hidden lg:block' : 'block'}`}
        style={{ perspective: 1500 }}
        aria-hidden={!entered}
        inert={!entered}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: entered ? 1 : 1.045 }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ rotateX: mapRotateX, rotateY: mapRotateY }}
        >
          <SpatialMap
            camX={camX}
            camY={camY}
            zoom={zoom}
            entered={entered}
            onSelect={select}
            onViewYear={setViewYear}
            reducedMotion={reducedMotion}
          />
        </motion.div>
      </div>

      {/* Hero 覆盖层 */}
      <AnimatePresence>
        {!entered && <Hero key="hero" onEnter={enter} textX={heroTextX} textY={heroTextY} />}
      </AnimatePresence>

      {/* 顶部（Hero 态隐藏，避免与 Hero 文案重叠） */}
      <header
        className={`absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 transition-opacity duration-700 md:px-10 ${
          entered ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          type="button"
          onClick={backToHero}
          className="cursor-pointer text-left font-wide text-[13px] font-extrabold uppercase tracking-[0.22em] text-paper"
        >
          Modern Art <span className="text-smoke">/ 150</span>
        </button>
        <div
          className={`text-[10px] uppercase tracking-[0.3em] text-smoke transition-opacity duration-700 ${
            entered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="lg:hidden">线性时间浏览</span>
          <span className="hidden lg:inline">拖拽平移 · 滚轮缩放 · 点击节点进入</span>
        </div>
      </header>

      <AnimatePresence>
        {entered && <MobileTimeline onSelect={selectMobile} reducedMotion={reducedMotion} />}
      </AnimatePresence>

      {/* 底部时间轴 */}
      <AnimatePresence>{entered && <TimelineNav year={viewYear} onScrub={scrubTo} />}</AnimatePresence>
    </motion.main>
  )
}
