import { useEffect, useMemo, useRef } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getMovement, liveMovements } from '../data/movements'
import { artworksOf } from '../data/artworks'
import { MovementHero } from '../components/movement/MovementHero'
import { ArtistRow } from '../components/movement/ArtistRow'
import { ArtworkGallery } from '../components/movement/ArtworkGallery'
import { RelationFooter } from '../components/movement/RelationFooter'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * 流派详情页（文档 §7）—— "展览空间"式布局，
 * 米白展厅，与深色星图形成明暗对比。
 */
export default function MovementPage() {
  const { id = '' } = useParams()
  const movement = getMovement(id)
  const mobileNavRef = useRef<HTMLElement>(null)
  const chronologicalMovements = useMemo(
    () => [...liveMovements].sort((a, b) => a.startYear - b.startYear || Number(a.index) - Number(b.index)),
    [],
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  useEffect(() => {
    const nav = mobileNavRef.current
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]')
    if (!nav || !active) return
    nav.scrollTo({ left: active.offsetLeft - (nav.clientWidth - active.clientWidth) / 2 })
  }, [id])

  if (!movement || movement.ghost) return <Navigate to="/" replace />

  const artworks = artworksOf(movement.id)

  return (
    <motion.main
      initial={{ clipPath: 'inset(0 0 100% 0)' }}
      animate={{ clipPath: 'inset(0 0 0% 0)' }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      transition={{ duration: 0.75, ease: EASE }}
      className="min-h-screen bg-paper text-ink"
    >
      {/* 顶部导航 */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-ink/10 bg-paper/85 px-6 py-4 backdrop-blur-md md:px-12">
        <Link
          to="/"
          className="font-wide text-[12px] font-bold uppercase tracking-[0.22em] transition-colors hover:text-smoke"
        >
          ← 返回星图
        </Link>

        {/* 桌面流派快速跳转 */}
        <nav className="hidden items-center gap-4 lg:flex" aria-label="流派快速导航">
          {chronologicalMovements.map((m) => (
            <Link
              key={m.id}
              to={`/movement/${m.id}`}
              title={`${m.name} ${m.nameEn}`}
              className="group flex items-center gap-1.5"
            >
              <span
                className="inline-block h-1.5 w-1.5 rotate-45 transition-colors"
                style={{
                  background: m.id === movement.id ? m.visualStyle.accent : 'transparent',
                  border: `1px solid ${m.id === movement.id ? m.visualStyle.accent : '#8b857a'}`,
                }}
              />
            </Link>
          ))}
        </nav>

        <span className="font-mono-num text-[10px] uppercase tracking-[0.24em] text-smoke">
          Modern Art 150
        </span>

        <nav
          ref={mobileNavRef}
          className="hide-scrollbar absolute inset-x-0 top-full flex gap-2 overflow-x-auto border-b border-ink/10 bg-paper/92 px-4 py-2.5 backdrop-blur-md lg:hidden"
          aria-label="流派快速导航"
        >
          {chronologicalMovements.map((m) => (
            <Link
              key={m.id}
              to={`/movement/${m.id}`}
              aria-current={m.id === movement.id ? 'page' : undefined}
              className="shrink-0 border px-3 py-1.5 text-[13px] outline-none focus-visible:border-ink"
              style={{
                borderColor: m.id === movement.id ? m.visualStyle.accent : 'rgba(23, 21, 15, 0.16)',
                color: m.id === movement.id ? '#17150f' : '#5c574e',
                background: m.id === movement.id ? `${m.visualStyle.accent}26` : 'transparent',
              }}
            >
              {m.name}
            </Link>
          ))}
        </nav>
      </header>

      <MovementHero movement={movement} />
      <ArtistRow artists={movement.artists} />
      <ArtworkGallery artworks={artworks} movement={movement} />
      <RelationFooter movement={movement} />

      <footer className="flex items-center justify-between border-t border-line-dark px-6 py-8 text-[10px] uppercase tracking-[0.24em] text-smoke md:px-12">
        <span>Modern Art 150 — An Evolution Map</span>
        <span>How Ideas Evolve</span>
      </footer>
    </motion.main>
  )
}
