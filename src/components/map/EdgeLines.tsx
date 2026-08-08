import { getMovement } from '../../data/movements'
import { relations } from '../../data/relations'
import { OY, WORLD_H, WORLD_W } from '../../lib/world'

interface EdgeLinesProps {
  hoveredId: string | null
}

interface Pt {
  x: number
  y: number
}

/** 计算一条从左向右流动的三次贝塞尔连线（含箭头方向） */
function edgeGeometry(a: Pt, b: Pt) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const dist = Math.hypot(dx, dy) || 1
  const ux = dx / dist
  const uy = dy / dist

  // 在节点边缘起止，避免线条穿过文字
  const r1 = 98
  const r2 = 108
  const sx = a.x + ux * r1
  const sy = a.y + uy * r1
  const ex = b.x - ux * r2
  const ey = b.y - uy * r2

  const bend = Math.max(56, Math.abs(ex - sx) * 0.42)
  const dir = ux >= -0.2 ? 1 : -0.6
  const c1x = sx + bend * dir
  const c1y = sy
  const c2x = ex - bend * dir
  const c2y = ey

  // 终点切线方向 → 箭头
  const tx = ex - c2x
  const ty = ey - c2y
  const tl = Math.hypot(tx, ty) || 1
  const nx = tx / tl
  const ny = ty / tl
  const px = -ny
  const py = nx
  const arrow = `${ex},${ey} ${ex - nx * 10 + px * 4.5},${ey - ny * 10 + py * 4.5} ${
    ex - nx * 10 - px * 4.5
  },${ey - ny * 10 - py * 4.5}`

  return {
    d: `M ${sx} ${sy} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${ex} ${ey}`,
    arrow,
  }
}

/**
 * 流派关系连线层（SVG，与节点同处一个世界坐标系）。
 * Hover 某节点时，与其相连的线被"点亮"（文档 §6 / §15）。
 */
export function EdgeLines({ hoveredId }: EdgeLinesProps) {
  return (
    <svg
      width={WORLD_W}
      height={WORLD_H}
      viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
      className="absolute left-0 top-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden
    >
      {relations.map((rel) => {
        const from = getMovement(rel.from)
        const to = getMovement(rel.to)
        if (!from || !to) return null

        const { d, arrow } = edgeGeometry(
          { x: from.map.x, y: OY + from.map.y },
          { x: to.map.x, y: OY + to.map.y },
        )

        const isGhost = Boolean(from.ghost || to.ghost)
        const lit =
          hoveredId !== null && (rel.from === hoveredId || rel.to === hoveredId)
        const dimmed = hoveredId !== null && !lit
        const accent = hoveredId ? getMovement(hoveredId)?.visualStyle.accent : undefined

        return (
          <g key={`${rel.from}-${rel.to}`}>
            <path
              d={d}
              className={`edge-base ${isGhost ? 'edge-ghost' : ''} ${lit ? 'edge-lit' : ''}`}
              style={{
                stroke: lit ? accent : undefined,
                opacity: dimmed ? 0.08 : isGhost ? 0.45 : lit ? 1 : 0.8,
              }}
            />
            <polygon
              points={arrow}
              style={{
                fill: lit ? accent : 'rgba(242,238,229,0.35)',
                opacity: dimmed ? 0.08 : isGhost ? 0.25 : 0.9,
                transition: 'opacity .35s ease',
              }}
            />
          </g>
        )
      })}
    </svg>
  )
}
