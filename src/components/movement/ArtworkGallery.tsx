import type { Artwork, MotifKind, Movement } from '../../data/types'
import { NodeMotif } from '../map/NodeMotif'
import { Reveal } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'

/** 自由错落布局：不同宽度与错位（文档 §7.3，不做普通网格图库） */
const LAYOUTS = [
  'md:w-[54%] md:ml-0',
  'md:w-[42%] md:ml-auto md:mr-[4%] md:-mt-12',
  'md:w-[38%] md:ml-[10%] md:mt-20',
  'md:w-[46%] md:ml-auto md:mr-[10%] md:mt-20',
]

interface FigureProps {
  artwork: Artwork
  motif: MotifKind
  accent: string
  layout: string
}

function ArtworkFigure({ artwork: w, motif, accent, layout }: FigureProps) {
  return (
    <figure className={`group ${layout}`}>
      <div className="relative overflow-hidden bg-ink/[0.04]">
        {w.image ? (
          <img
            src={w.image}
            alt={`${w.title} · ${w.artist}`}
            loading="lazy"
            draggable={false}
            className="block h-auto w-full select-none transition-transform duration-700 ease-out group-hover:scale-[1.035]"
          />
        ) : (
          /* 版权原因暂缺原图：以流派母题生成图形占位 */
          <div className="relative flex aspect-[4/3] items-center justify-center bg-ink text-paper">
            <NodeMotif motif={motif} accent={accent} size={150} />
            <span className="absolute bottom-3 right-4 text-[9px] uppercase tracking-[0.22em] text-paper/40">
              原作图像暂缺 · 生成图形示意
            </span>
          </div>
        )}

        {/* Hover：显示作品信息（文档 §7.3） */}
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/10 to-transparent p-5 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
          <div className="translate-y-2 transition-transform duration-400 group-hover:translate-y-0">
            <div className="font-serifcn text-lg font-semibold text-paper">《{w.title}》</div>
            <div className="font-mono-num mt-1 text-[11px] tracking-[0.14em] text-paper/75">
              {w.artist} · {w.year}
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 max-w-lg">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-sm font-medium text-ink">
            {w.titleOriginal ? <em className="text-smoke">{w.titleOriginal}</em> : null}
          </span>
          <span className="shrink-0 text-right text-[11px] text-smoke">
            {[w.medium, w.museum].filter(Boolean).join(' · ')}
          </span>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-ink/65">{w.description}</p>
        <p
          className="mt-2 border-l-2 pl-3 text-[13px] leading-relaxed text-ink/80"
          style={{ borderColor: accent }}
        >
          {w.significance}
        </p>
      </figcaption>
    </figure>
  )
}

export function ArtworkGallery({
  artworks,
  movement,
}: {
  artworks: Artwork[]
  movement: Movement
}) {
  return (
    <section className="px-6 py-20 md:px-12">
      <Reveal>
        <SectionHead no="03" zh="代表作品" en="Works" />
      </Reveal>

      <div className="mt-16 flex flex-col gap-16 md:gap-0">
        {artworks.map((w, i) => (
          <Reveal key={w.id} className={LAYOUTS[i % LAYOUTS.length]}>
            <ArtworkFigure
              artwork={w}
              motif={movement.visualStyle.motif}
              accent={movement.visualStyle.accent}
              layout=""
            />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
