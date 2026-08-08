/** 远景尘埃层：确定性伪随机分布的细小坐标点，提供空间纵深 */
const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1) * 43758.5453
  return x - Math.floor(x)
}

const DOTS = Array.from({ length: 90 }, (_, i) => ({
  x: -500 + rand(i * 3 + 1) * 3100,
  y: -420 + rand(i * 3 + 2) * 1280,
  s: rand(i * 3 + 3),
}))

export function DustLayer() {
  return (
    <div className="pointer-events-none select-none" aria-hidden>
      {DOTS.map((d, i) =>
        d.s > 0.5 ? (
          <div
            key={i}
            className="absolute text-smoke"
            style={{ left: d.x, top: d.y, opacity: 0.35, fontSize: 10 }}
          >
            +
          </div>
        ) : (
          <div
            key={i}
            className="absolute h-px w-px rounded-full bg-smoke"
            style={{ left: d.x, top: d.y, opacity: 0.5 }}
          />
        ),
      )}
    </div>
  )
}
