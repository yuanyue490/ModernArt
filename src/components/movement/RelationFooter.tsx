import { Link } from 'react-router-dom'
import { getMovement, liveMovements } from '../../data/movements'
import type { Movement } from '../../data/types'
import { Reveal } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'

function RelationChip({ id, accent }: { id: string; accent?: string }) {
  const target = getMovement(id)
  if (!target) return null
  const inner = (
    <>
      <span className="font-wide text-sm font-bold uppercase tracking-[0.1em]">{target.nameEn}</span>
      <span className="mt-1 text-[13px] font-medium text-ink/75">
        {target.name} · {target.startYear}
        {target.endYear ? `—${target.endYear}` : ''}
      </span>
    </>
  )
  if (target.ghost) {
    return (
      <span className="flex cursor-default flex-col border border-line-dark border-dashed px-5 py-3 opacity-45">
        {inner}
        <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-smoke">即将上线</span>
      </span>
    )
  }
  return (
    <Link
      to={`/movement/${target.id}`}
      className="group flex flex-col border border-line-dark px-5 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-current"
      style={{ color: 'inherit' }}
    >
      <span
        className="mb-2 h-0.5 w-6 transition-all duration-300 group-hover:w-10"
        style={{ background: accent ?? '#17150f' }}
      />
      {inner}
    </Link>
  )
}

/**
 * 详情页第四层级：与其它流派的关系（文档 §7.4）。
 * FROM ↓ 当前流派 ↓ INFLUENCED —— 它从哪里来，又影响了谁。
 */
export function RelationFooter({ movement: m }: { movement: Movement }) {
  const idx = liveMovements.findIndex((x) => x.id === m.id)
  const prev = liveMovements[idx - 1]
  const next = liveMovements[idx + 1]

  return (
    <section className="px-6 py-20 md:px-12">
      <Reveal>
        <SectionHead no="04" zh="思想谱系" en="Lineage" />
      </Reveal>

      <div className="mt-14 flex flex-col items-center gap-10 text-center">
        {/* FROM */}
        <Reveal className="w-full">
          <div className="text-[10px] uppercase tracking-[0.3em] text-smoke">From · 从哪里来</div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {m.influencedBy.length > 0 ? (
              m.influencedBy.map((id) => (
                <RelationChip key={id} id={id} accent={getMovement(id)?.visualStyle.accent} />
              ))
            ) : (
              <span className="text-sm text-smoke">—— 起点 ——</span>
            )}
          </div>
        </Reveal>

        <Reveal>
          <div className="text-2xl text-smoke">↓</div>
        </Reveal>

        {/* 当前流派 */}
        <Reveal>
          <div
            className="border px-8 py-5"
            style={{ borderColor: m.visualStyle.accent, background: `${m.visualStyle.accent}14` }}
          >
            <div className="font-wide text-2xl font-extrabold uppercase tracking-[0.06em] text-ink">
              {m.nameEn}
            </div>
            <div className="mt-1.5 text-[15px] font-medium text-ink/80">{m.name}</div>
          </div>
        </Reveal>

        <Reveal>
          <div className="text-2xl text-smoke">↓</div>
        </Reveal>

        {/* INFLUENCED */}
        <Reveal className="w-full">
          <div className="text-[10px] uppercase tracking-[0.3em] text-smoke">Influenced · 影响了谁</div>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {m.influenced.length > 0 ? (
              m.influenced.map((id) => (
                <RelationChip key={id} id={id} accent={getMovement(id)?.visualStyle.accent} />
              ))
            ) : (
              <span className="text-sm text-smoke">—— 余波仍在继续 ——</span>
            )}
          </div>
        </Reveal>
      </div>

      {/* 上一站 / 下一站 */}
      <div className="mt-24 grid border-t border-line-dark md:grid-cols-2">
        {prev ? (
          <Link
            to={`/movement/${prev.id}`}
            className="group border-b border-line-dark py-8 pr-4 md:border-b-0 md:border-r"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-smoke">← Prev 上一站</div>
            <div className="font-wide mt-3 text-xl font-extrabold uppercase text-ink transition-transform duration-300 group-hover:translate-x-2 md:text-2xl">
              {prev.nameEn}
            </div>
            <div className="mt-1.5 text-[15px] font-medium text-ink/80">{prev.name}</div>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            to={`/movement/${next.id}`}
            className="group py-8 pl-4 text-left md:text-right"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-smoke">Next 下一站 →</div>
            <div className="font-wide mt-3 text-xl font-extrabold uppercase text-ink transition-transform duration-300 group-hover:-translate-x-2 md:text-2xl">
              {next.nameEn}
            </div>
            <div className="mt-1.5 text-[15px] font-medium text-ink/80">{next.name}</div>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </section>
  )
}
