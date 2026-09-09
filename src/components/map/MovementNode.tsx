import { AnimatePresence, motion, useTransform, type MotionValue } from 'framer-motion'
import type { Movement } from '../../data/types'
import { OY } from '../../lib/world'
import { NodeMotif } from './NodeMotif'

export type NodeVisualState = 'normal' | 'active' | 'related' | 'dim'

interface MovementNodeProps {
  movement: Movement
  visualState: NodeVisualState
  index: number
  zoom: MotionValue<number>
  onHover: (id: string | null) => void
  onSelect: (movement: Movement) => void
  reducedMotion: boolean
}

/** 全景缩得太小时，标签按接近 0.62 倍缩放来补偿，避免中文名糊成灰点。 */
function labelCompensation(z: number) {
  return Math.min(Math.max(0.62 / z, 1), 1.85)
}

const OPACITY: Record<NodeVisualState, number> = {
  normal: 1,
  active: 1,
  related: 1,
  dim: 0.16,
}

/**
 * 空间图中的一个流派节点：
 * 生成式母题 + 名称/年代，Hover 浮现核心问题（文档 §6）。
 */
export function MovementNode({
  movement: m,
  visualState,
  index,
  zoom,
  onHover,
  onSelect,
  reducedMotion,
}: MovementNodeProps) {
  const ghost = Boolean(m.ghost)
  const active = visualState === 'active'
  const years = `${m.startYear}${m.endYear ? `—${m.endYear}` : ''}`
  const compactTitle = m.nameEn.length > 12
  const labelScale = useTransform(zoom, labelCompensation)

  return (
    <div
      className="absolute"
      style={{
        left: m.map.x,
        top: OY + m.map.y,
        transform: 'translate(-50%,-50%)',
        zIndex: active ? 30 : 10,
      }}
      data-node
    >
      <motion.div
        animate={{
          opacity: ghost
            ? visualState === 'dim'
              ? 0.08
              : 0.55
            : OPACITY[visualState],
          scale: active ? 1.07 : 1,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div
          className={reducedMotion ? undefined : 'node-float'}
          style={{ animationDuration: `${7 + (index % 5)}s`, animationDelay: `${index * -1.3}s` }}
        >
          <button
            type="button"
            aria-label={`${m.name} ${m.nameEn}`}
            aria-disabled={ghost}
            onMouseEnter={() => onHover(m.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => !ghost && onHover(m.id)}
            onBlur={() => onHover(null)}
            onClick={() => !ghost && onSelect(m)}
            tabIndex={ghost ? -1 : 0}
            className={`group flex w-64 flex-col items-center gap-3 bg-transparent p-2 text-center outline-none ${
              ghost ? 'cursor-default' : 'cursor-pointer'
            }`}
          >
            <NodeMotif
              motif={m.visualStyle.motif}
              accent={m.visualStyle.accent}
              size={ghost ? 64 : 104}
            />
            <motion.div
              style={{ scale: labelScale }}
              className="origin-top"
            >
              <div
                className={`font-wide font-extrabold uppercase tracking-[0.08em] ${
                  ghost
                    ? 'text-[13px] text-paper/50'
                    : compactTitle
                      ? 'text-[16px] text-paper'
                      : 'text-[17px] text-paper'
                }`}
                style={{ textShadow: '0 1px 10px rgba(13,12,10,0.9)' }}
              >
                {m.nameEn}
              </div>
              <div
                className={`mt-1.5 leading-snug ${
                  ghost ? 'text-[13px] text-paper/45' : 'text-[16px] font-medium text-paper'
                }`}
                style={{ textShadow: '0 1px 10px rgba(13,12,10,0.9)' }}
              >
                {m.name}
                <span className={`font-mono-num ${ghost ? 'text-paper/35' : 'text-paper/55'}`}>
                  {' '}
                  · {years}
                </span>
              </div>
            </motion.div>
          </button>

          {/* Hover 信息卡：名称 / 英文名 / 时间 / 一句话核心思想 */}
          <AnimatePresence>
            {active && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-4 w-72 -translate-x-1/2"
              >
                <div
                  className="border border-line bg-coal-2/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-sm"
                  style={{ borderTopColor: m.visualStyle.accent, borderTopWidth: 2 }}
                >
                  <div className="font-mono-num text-[10px] uppercase tracking-[0.22em] text-smoke">
                    {ghost ? '即将上线' : `Nº ${m.index} — ${years}`}
                  </div>
                  <div className="mt-2 font-serifcn text-[15px] font-semibold leading-relaxed text-paper">
                    “{m.question}”
                  </div>
                  {!ghost && (
                    <div className="mt-3 flex items-center gap-2 text-[11px] tracking-[0.18em] text-smoke">
                      <span
                        className="inline-block h-1.5 w-1.5"
                        style={{ background: m.visualStyle.accent }}
                      />
                      点击进入流派空间
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
