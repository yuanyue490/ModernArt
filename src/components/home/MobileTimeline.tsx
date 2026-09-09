import { motion } from 'framer-motion'
import { getMovement, liveMovements } from '../../data/movements'
import type { Movement } from '../../data/types'

interface MobileTimelineProps {
  onSelect: (movement: Movement) => void
  reducedMotion: boolean
}

const orderedMovements = [...liveMovements].sort(
  (a, b) => a.startYear - b.startYear || Number(a.index) - Number(b.index),
)

function relationNames(ids: string[]) {
  return ids
    .map((id) => getMovement(id)?.name)
    .filter((name): name is string => Boolean(name))
    .slice(0, 3)
}

/**
 * 小屏幕的等价浏览路径：把二维星图翻译成一条可滚动、可点击的年代轨道。
 * 这里保留关系信息，不把移动端退化成普通卡片列表。
 */
export function MobileTimeline({ onSelect, reducedMotion }: MobileTimelineProps) {
  return (
    <motion.section
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 bottom-0 top-[61px] z-20 overflow-y-auto overscroll-contain bg-coal lg:hidden"
      aria-label="现代艺术线性时间浏览"
    >
      <div className="border-b border-line px-5 pb-10 pt-9">
        <div className="flex items-center justify-between font-mono-num text-[9px] uppercase tracking-[0.26em] text-smoke">
          <span>Linear chronology</span>
          <span>{orderedMovements.length} movements</span>
        </div>
        <h2 className="mt-5 max-w-[9em] font-wide text-[clamp(2.3rem,12vw,3.5rem)] font-black uppercase leading-[0.88] text-paper">
          Follow the rupture
        </h2>
        <p className="mt-5 max-w-sm font-serifcn text-[15px] leading-7 text-paper/70">
          沿年代向下阅读。每一次继承、分支与反叛，都把艺术推向下一种观看方式。
        </p>
      </div>

      <ol className="relative px-5 pb-24 pt-3">
        <div
          className="absolute bottom-24 left-[4.55rem] top-3 w-px bg-gradient-to-b from-paper/40 via-paper/15 to-transparent"
          aria-hidden
        />
        {orderedMovements.map((movement, index) => {
          const sources = relationNames(movement.influencedBy)
          const outcomes = relationNames(movement.influenced)
          const years = `${movement.startYear}${movement.endYear ? `—${movement.endYear}` : ''}`
          const compactTitle = movement.nameEn.length > 12

          return (
            <motion.li
              key={movement.id}
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-32px' }}
              transition={{ duration: reducedMotion ? 0 : 0.42, delay: Math.min(index, 4) * 0.035 }}
              className="relative grid grid-cols-[3.9rem_minmax(0,1fr)] gap-5"
            >
              <div className="relative border-r border-transparent py-7 text-right">
                <span className="font-mono-num text-[11px] font-bold text-paper/80">
                  {movement.startYear}
                </span>
                <span
                  className="absolute right-[-1.08rem] top-[2.05rem] h-2.5 w-2.5 rotate-45 border-2 border-coal"
                  style={{ backgroundColor: movement.visualStyle.accent }}
                  aria-hidden
                />
              </div>

              <button
                type="button"
                onClick={() => onSelect(movement)}
                className="group min-w-0 border-b border-line py-7 text-left outline-none focus-visible:border-paper focus-visible:bg-paper/[0.04]"
                aria-label={`进入${movement.name}，${years}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="font-mono-num text-[9px] uppercase tracking-[0.24em] text-smoke">
                      Nº {movement.index} · {years}
                    </div>
                    <h3
                      className={`mt-2 text-balance font-wide font-extrabold uppercase leading-[0.95] text-paper transition-transform duration-300 group-active:translate-x-1 ${
                        compactTitle ? 'text-[1.2rem]' : 'text-[1.65rem]'
                      }`}
                    >
                      {movement.nameEn}
                    </h3>
                    <p className="mt-2.5 text-[16px] font-medium leading-snug text-paper">
                      {movement.name}
                    </p>
                  </div>
                  <span className="mt-5 text-lg text-paper/45 transition-transform duration-300 group-active:translate-x-1" aria-hidden>
                    →
                  </span>
                </div>

                <p className="mt-5 font-serifcn text-[15px] font-semibold leading-6 text-paper/88">
                  {movement.question}
                </p>

                {(sources.length > 0 || outcomes.length > 0) && (
                  <div className="mt-5 space-y-1.5 text-[14px] leading-6 text-paper/80">
                    {sources.length > 0 && <p>源自 · {sources.join(' / ')}</p>}
                    {outcomes.length > 0 && <p>流向 · {outcomes.join(' / ')}</p>}
                  </div>
                )}
              </button>
            </motion.li>
          )
        })}
      </ol>
    </motion.section>
  )
}
