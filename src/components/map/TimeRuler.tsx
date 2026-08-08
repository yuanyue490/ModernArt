import { OY, yearToX } from '../../lib/world'

const TICKS: number[] = []
for (let y = 1840; y <= 2020; y += 10) TICKS.push(y)

const GIANT_YEARS = [1870, 1900, 1930, 1960, 1990]

/**
 * 世界内的时间标尺：顶部刻度 + 背景巨型年份数字（空间纵深的一部分）。
 */
export function TimeRuler() {
  return (
    <div className="pointer-events-none absolute inset-0 select-none" aria-hidden>
      {/* 顶部标尺横线 */}
      <div
        className="absolute h-px bg-line"
        style={{ left: yearToX(1820), width: yearToX(2030) - yearToX(1820), top: OY - 560 }}
      />
      {TICKS.map((y) => {
        const major = y % 20 === 0
        return (
          <div key={y} className="absolute" style={{ left: yearToX(y), top: OY - 560 }}>
            <div className={`w-px bg-line-strong ${major ? 'h-4' : 'h-2'}`} />
            {major && (
              <div className="font-mono-num mt-2 -translate-x-1/2 text-[11px] tracking-[0.2em] text-smoke">
                {y}
              </div>
            )}
          </div>
        )
      })}

      {/* 巨型背景年份 —— 像博物馆墙面上的时代铭文 */}
      {GIANT_YEARS.map((y, i) => (
        <div
          key={y}
          className="text-hollow absolute font-wide font-black"
          style={{
            left: yearToX(y),
            top: OY - 150 + (i % 2) * 140,
            transform: 'translate(-50%,-50%)',
            fontSize: 300,
            lineHeight: 1,
            opacity: 0.5,
          }}
        >
          {y}
        </div>
      ))}
    </div>
  )
}
