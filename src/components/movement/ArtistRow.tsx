import type { Artist } from '../../data/types'
import { Reveal } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'

/**
 * 详情页第二层级：代表艺术家（文档 §7.2）。
 * 编辑式名册 —— 人物页将在下一阶段上线。
 */
export function ArtistRow({ artists }: { artists: Artist[] }) {
  return (
    <section className="px-6 py-20 md:px-12">
      <Reveal>
        <SectionHead no="02" zh="代表艺术家" en="Artists" />
      </Reveal>

      <div className="mt-4">
        {artists.map((a, i) => (
          <Reveal key={a.id} delay={i * 0.07}>
            <div className="group grid cursor-default grid-cols-[auto_1fr_auto] items-baseline gap-4 border-b border-line-dark py-6 transition-colors duration-300 hover:bg-ink/[0.035] md:grid-cols-[3rem_1fr_auto_22rem] md:gap-8 md:px-4">
              <span className="font-mono-num text-xs text-smoke">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-wide text-xl font-bold uppercase tracking-[0.04em] text-ink transition-transform duration-300 group-hover:translate-x-2 md:text-2xl">
                {a.name}
              </span>
              <span className="font-mono-num text-xs text-smoke">{a.years}</span>
              <span className="hidden text-right text-[13px] leading-relaxed text-smoke md:block">
                {a.note}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
