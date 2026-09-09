import { motion, type MotionValue } from 'framer-motion'

interface HeroProps {
  onEnter: () => void
  textX: MotionValue<number>
  textY: MotionValue<number>
}

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * 首屏（文档 §4）：MODERN ART / 1840—NOW，
 * 背景即关系网络本身，滚轮开始后镜头进入时间线。
 */
export function Hero({ onEnter, textX, textY }: HeroProps) {
  return (
    <motion.section
      exit={{ opacity: 0, y: -70, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } }}
      className="absolute inset-0 z-20 flex flex-col justify-between px-5 py-5 sm:px-6 sm:py-7 md:px-10"
    >
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.34em] text-smoke">
        <span className="max-w-[13rem] leading-4 sm:max-w-none">An Evolution Map of Modern Art</span>
        <span className="hidden font-mono-num sm:inline">21 Movements · 1840—NOW</span>
      </div>

      <motion.div style={{ x: textX, y: textY }} className="text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="mb-7 text-[11px] tracking-[0.55em] text-smoke"
        >
          现代艺术进化地图
        </motion.p>

        <h1 className="font-wide font-black leading-[0.86] tracking-tight text-paper">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '112%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
              className="block text-[15vw] sm:text-[16vw] md:text-[14vw]"
            >
              MODERN
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '112%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.34 }}
              className="block text-[15vw] sm:text-[16vw] md:text-[14vw]"
            >
              ART
            </motion.span>
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.8, ease: EASE }}
          className="mt-9 flex items-center justify-center gap-5"
        >
          <span className="h-px w-14 bg-line-strong md:w-24" />
          <span className="font-mono-num text-sm tracking-[0.34em]">1840—NOW</span>
          <span className="h-px w-14 bg-line-strong md:w-24" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.9 }}
          className="mt-5 text-sm tracking-[0.12em] text-paper/80 md:text-base"
        >
          150 Years of Ideas, Rebellion and Reinvention
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.15, duration: 0.8 }}
        className="flex flex-col items-center gap-4"
      >
        <button
          type="button"
          onClick={onEnter}
          className="group relative cursor-pointer border border-line-strong px-8 py-3.5 text-[11px] tracking-[0.3em] text-paper outline-none transition-colors duration-300 hover:border-paper hover:bg-paper hover:text-ink focus-visible:border-paper focus-visible:bg-paper focus-visible:text-ink sm:px-10 sm:tracking-[0.34em]"
        >
          进入时间线
        </button>
        <span className="text-center text-[9px] tracking-[0.22em] text-smoke sm:text-[10px] sm:tracking-[0.3em]">
          滚动或点击进入 · SCROLL OR CLICK TO EXPLORE
        </span>
      </motion.div>
    </motion.section>
  )
}
