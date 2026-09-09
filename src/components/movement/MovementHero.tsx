import { motion } from 'framer-motion'
import type { Movement } from '../../data/types'
import { NodeMotif } from '../map/NodeMotif'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * 详情页第一层级：流派概念（文档 §7.1）。
 * 巨大标题 + 年代 + 核心问题 + 简述。
 */
export function MovementHero({ movement: m }: { movement: Movement }) {
  const years = `${m.startYear}${m.endYear ? `—${m.endYear}` : ''}`
  const longName = m.nameEn.length > 12

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-44 md:px-12 md:pt-40">
      {/* 背景母题（大而淡） */}
      <motion.div
        initial={{ opacity: 0, rotate: -4 }}
        animate={{ opacity: 0.9, rotate: 0 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
        className="pointer-events-none absolute -right-10 top-16 select-none md:right-8 md:top-24"
        aria-hidden
      >
        <NodeMotif motif={m.visualStyle.motif} accent={m.visualStyle.accent} size={300} />
      </motion.div>

      <div className="relative max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
          className="flex items-center gap-4"
        >
          <span className="font-mono-num text-xs tracking-[0.3em] text-smoke">Nº {m.index}</span>
          <span className="h-px w-16 bg-ink/30" />
          <span className="font-mono-num text-xs tracking-[0.3em] text-smoke">{years}</span>
        </motion.div>

        <h1 className="mt-6 font-wide font-black uppercase leading-[0.9] tracking-tight text-ink">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '108%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
              className={`block ${longName ? 'text-[11vw] md:text-[7.6vw]' : 'text-[16vw] md:text-[10.5vw]'}`}
            >
              {m.nameEn}
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.75 }}
          className="mt-10 grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        >
          <div>
            <div className="text-[15px] font-medium text-ink/75">{m.name} · 核心问题</div>
            <p className="mt-4 font-serifcn text-2xl font-semibold leading-snug text-ink md:text-[2rem]">
              {m.question}
            </p>
          </div>
          <p className="max-w-xl text-[15px] leading-[1.9] text-ink/70 md:pt-9">
            {m.description}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.95 }}
        className="mt-16 h-px origin-left bg-ink/25"
      />
    </section>
  )
}
