import { useRef } from 'react'
import { motion } from 'framer-motion'
import { clamp } from '../../lib/world'

interface TimelineNavProps {
  /** 视口中心对应的年份 */
  year: number
  onScrub: (year: number) => void
}

const MIN = 1840
const MAX = 2020
const TICKS: number[] = []
for (let y = MIN; y <= MAX; y += 10) TICKS.push(y)

/**
 * 常驻极简时间轴（文档 §10）：拖动后整个艺术关系网络随之移动。
 */
export function TimelineNav({ year, onScrub }: TimelineNavProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const pos = clamp(((year - MIN) / (MAX - MIN)) * 100, 0, 100)

  const scrubTo = (clientX: number) => {
    const el = trackRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const t = clamp((clientX - rect.left) / rect.width, 0, 1)
    onScrub(Math.round(MIN + t * (MAX - MIN)))
  }

  return (
    <motion.footer
      initial={{ y: 72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 72, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      className="absolute inset-x-0 bottom-0 z-30 border-t border-line bg-coal/85 backdrop-blur-sm"
    >
      <div className="flex items-stretch gap-6 px-6 py-3 md:px-10">
        {/* 当前年份读数 */}
        <div className="flex w-24 shrink-0 flex-col justify-center">
          <span className="font-mono-num text-2xl font-bold leading-none text-paper">{year}</span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.24em] text-smoke">视口中心</span>
        </div>

        {/* 拖动轨道 */}
        <div
          ref={trackRef}
          className="relative h-14 flex-1 cursor-ew-resize"
          onPointerDown={(e) => {
            dragging.current = true
            e.currentTarget.setPointerCapture(e.pointerId)
            scrubTo(e.clientX)
          }}
          onPointerMove={(e) => dragging.current && scrubTo(e.clientX)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-strong" />
          {TICKS.map((y) => {
            const left = ((y - MIN) / (MAX - MIN)) * 100
            const major = y % 20 === 0
            return (
              <div key={y} className="absolute top-1/2" style={{ left: `${left}%` }}>
                <div className={`w-px -translate-y-1/2 bg-smoke/70 ${major ? 'h-3' : 'h-1.5'}`} />
                {major && (
                  <div className="font-mono-num mt-1.5 -translate-x-1/2 text-[10px] text-smoke">
                    {y}
                  </div>
                )}
              </div>
            )
          })}
          {/* 视口中心游标 */}
          <div className="absolute top-0 h-full" style={{ left: `${pos}%` }}>
            <div className="h-full w-px bg-paper" />
            <div className="absolute -top-0.5 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-paper" />
          </div>
        </div>

        <div className="hidden w-32 shrink-0 flex-col items-end justify-center md:flex">
          <span className="text-[9px] uppercase tracking-[0.24em] text-smoke">拖动以穿越时间</span>
          <span className="font-mono-num mt-1 text-[10px] text-smoke">1860 — NOW</span>
        </div>
      </div>
    </motion.footer>
  )
}
