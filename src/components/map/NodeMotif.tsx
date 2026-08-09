import { useId } from 'react'
import type { MotifKind } from '../../data/types'

interface NodeMotifProps {
  motif: MotifKind
  accent: string
  size?: number
}

/**
 * 每个流派的生成式视觉母题 —— 通过视觉本身表现流派思想（文档 §5）。
 * 全部为内联 SVG，无需外部资源。
 */
export function NodeMotif({ motif, accent, size = 104 }: NodeMotifProps) {
  const uid = useId().replace(/[:]/g, '')
  const paper = '#f2eee5'

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-hidden
      style={{ display: 'block', overflow: 'visible' }}
    >
      {motif === 'halo' && (
        <>
          <defs>
            <filter id={`${uid}-blur`} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>
          {/* 柔和、扩散、光晕 */}
          <circle cx="36" cy="40" r="26" fill={accent} opacity="0.5" filter={`url(#${uid}-blur)`} />
          <circle cx="62" cy="34" r="18" fill="#e8c9a8" opacity="0.55" filter={`url(#${uid}-blur)`} />
          <circle cx="50" cy="46" r="9" fill="#f4d58d" opacity="0.95" filter={`url(#${uid}-blur)`} />
          <g stroke={paper} strokeWidth="2" strokeLinecap="round" opacity="0.55">
            <line x1="18" y1="72" x2="42" y2="70" />
            <line x1="50" y1="77" x2="82" y2="74" />
            <line x1="28" y1="83" x2="58" y2="82" />
          </g>
        </>
      )}

      {motif === 'swirl' && (
        /* 旋转笔触、情绪与能量 */
        <g fill="none" strokeLinecap="round">
          <path d="M50 50 m-34 0 a34 34 0 1 1 62 14" stroke={accent} strokeWidth="6" strokeDasharray="48 24" />
          <path d="M50 50 m-23 0 a23 23 0 1 0 42 -10" stroke={paper} strokeWidth="5" strokeDasharray="30 20" opacity="0.7" />
          <path d="M50 50 m-13 0 a13 13 0 1 1 24 8" stroke="#c2483a" strokeWidth="5" strokeDasharray="18 12" />
          <circle cx="70" cy="28" r="5" fill="#f4d58d" stroke="none" />
        </g>
      )}

      {motif === 'facets' && (
        /* 色块与结构切面：自然被翻译为圆柱、球体与圆锥 */
        <g>
          <rect x="22" y="52" width="30" height="32" fill="#8a9a6b" transform="rotate(-7 37 68)" />
          <rect x="44" y="42" width="34" height="40" fill="#a3b18a" transform="rotate(6 61 62)" />
          <rect x="62" y="56" width="24" height="28" fill="#5b6b4f" transform="rotate(-5 74 70)" />
          <rect x="40" y="24" width="18" height="20" fill="#c9b458" transform="rotate(9 49 34)" />
          <rect x="28" y="30" width="14" height="16" fill={accent} transform="rotate(-12 35 38)" />
          <line x1="16" y1="88" x2="86" y2="88" stroke={paper} strokeWidth="1.5" opacity="0.4" />
        </g>
      )}

      {motif === 'shatter' && (
        /* 切割、几何碎片：多视角同时展开 */
        <g stroke="#0d0c0a" strokeWidth="1.5">
          <polygon points="20,26 52,18 46,50" fill={accent} />
          <polygon points="52,18 82,30 60,52" fill="#6e5233" />
          <polygon points="20,26 46,50 26,64" fill="#c8b08a" />
          <polygon points="46,50 60,52 48,84 26,64" fill="#3e3a33" />
          <polygon points="60,52 82,30 78,66 48,84" fill="#8c6a45" />
          <polygon points="74,74 90,68 86,86" fill={accent} opacity="0.85" />
        </g>
      )}

      {motif === 'diagonal' && (
        /* 红黑斜向构成：艺术进入社会生产 */
        <g>
          <polygon points="10,90 90,16 90,34 30,90" fill={accent} />
          <rect x="30" y="62" width="44" height="6.5" fill={paper} transform="rotate(-20 52 65)" />
          <rect x="42" y="74" width="34" height="5" fill={paper} opacity="0.75" transform="rotate(-20 59 76)" />
          <circle cx="66" cy="28" r="10" fill="none" stroke={paper} strokeWidth="2" />
          <rect x="18" y="22" width="9" height="9" fill={accent} transform="rotate(-20 22 26)" />
        </g>
      )}

      {motif === 'wild' && (
        /* 脱离现实的高饱和纯色：天空可以是红色，皮肤可以是绿色 */
        <g>
          <path d="M18 66 Q26 34 52 30 Q78 27 84 52 Q88 74 62 82 Q34 88 18 66 Z" fill={accent} opacity="0.92" />
          <path d="M30 30 Q40 14 58 18 Q72 22 68 38 Q64 50 48 48 Q32 46 30 30 Z" fill="#3f8f5f" opacity="0.9" />
          <path d="M60 58 Q74 50 86 58 Q94 66 86 76 Q76 84 64 78 Q54 70 60 58 Z" fill="#2456a6" opacity="0.88" />
          <path d="M24 76 Q34 70 44 74 Q52 79 46 86 Q36 92 27 87 Q19 82 24 76 Z" fill="#d9a03f" opacity="0.9" />
          <circle cx="76" cy="26" r="7" fill="#f2eee5" opacity="0.85" />
        </g>
      )}

      {motif === 'speed' && (
        /* 速度线与连续动作：同一形态在运动中错位重复 */
        <g strokeLinecap="round">
          <g stroke={accent} strokeWidth="3" opacity="0.9">
            <line x1="14" y1="70" x2="62" y2="30" />
            <line x1="20" y1="80" x2="74" y2="36" />
            <line x1="30" y1="88" x2="86" y2="42" />
          </g>
          <g stroke={paper} strokeWidth="2" opacity="0.45">
            <line x1="10" y1="58" x2="42" y2="30" />
            <line x1="46" y1="90" x2="88" y2="56" />
          </g>
          {/* 同一箭头形的连续残影 */}
          <polygon points="52,58 70,46 66,62" fill={accent} opacity="0.35" />
          <polygon points="60,50 78,38 74,54" fill={accent} opacity="0.6" />
          <polygon points="68,42 88,29 83,47" fill={accent} />
        </g>
      )}

      {motif === 'square' && (
        /* 黑方块与漂浮几何：去掉一切现实对象之后的纯粹感受 */
        <g>
          <rect x="30" y="26" width="34" height="34" fill="#12100d" stroke={paper} strokeWidth="1.6" transform="rotate(-4 47 43)" />
          <rect x="58" y="56" width="30" height="9" fill="#c23a22" transform="rotate(-32 73 60)" />
          <rect x="22" y="64" width="13" height="13" fill={paper} opacity="0.9" transform="rotate(18 28 70)" />
          <circle cx="74" cy="26" r="6" fill="none" stroke={paper} strokeWidth="1.6" opacity="0.7" />
          <line x1="18" y1="86" x2="52" y2="80" stroke={accent} strokeWidth="1.4" opacity="0.5" />
        </g>
      )}

      {motif === 'grid' && (
        /* 黑线网格与三原色：世界的普遍视觉秩序 */
        <g>
          {/* 连片的色块区域，黑线只落在色块上 */}
          <rect x="22" y="20" width="28" height="26" fill={paper} />
          <rect x="22" y="46" width="28" height="34" fill="#d9a81c" />
          <rect x="50" y="20" width="32" height="42" fill={paper} />
          <rect x="50" y="62" width="32" height="18" fill="#c23a22" />
          <rect x="66" y="46" width="16" height="16" fill="#2456a6" />
          <g stroke="#12100d" strokeWidth="3.5">
            <line x1="22" y1="46" x2="82" y2="46" />
            <line x1="50" y1="20" x2="50" y2="80" />
            <line x1="22" y1="62" x2="82" y2="62" />
            <line x1="66" y1="46" x2="66" y2="62" />
          </g>
          <rect x="22" y="20" width="60" height="60" fill="none" stroke={paper} strokeWidth="1.4" opacity="0.55" />
        </g>
      )}

      {motif === 'bauhaus' && (
        /* 圆 / 三角 / 方形 + 三原色 */
        <g>
          <line x1="50" y1="44" x2="50" y2="56" stroke={paper} strokeWidth="1.2" opacity="0.5" />
          <circle cx="50" cy="30" r="14" fill="#c23a22" />
          <rect x="24" y="58" width="22" height="22" fill="#2456a6" />
          <polygon points="70,80 94,80 82,56" fill="#d9a81c" />
        </g>
      )}

      {motif === 'orbit' && (
        /* 即兴的色与形：像音乐一样的抽象 */
        <g>
          <circle cx="38" cy="36" r="16" fill={accent} opacity="0.9" />
          <path d="M22 74 Q40 54 66 60 Q84 65 80 82" fill="none" stroke="#c23a22" strokeWidth="4" strokeLinecap="round" />
          <path d="M58 22 L84 34 L64 46 Z" fill="#d9a81c" opacity="0.9" />
          <g stroke={paper} strokeWidth="1.6" opacity="0.6" fill="none">
            <path d="M20 50 Q46 30 82 44" />
            <line x1="30" y1="86" x2="58" y2="80" />
          </g>
          <circle cx="72" cy="70" r="5" fill={paper} opacity="0.85" />
          <circle cx="26" cy="28" r="3.5" fill={paper} opacity="0.6" />
        </g>
      )}

      {motif === 'mask' && (
        /* 原始主义：面具般的正面几何 */
        <g>
          <path d="M50 16 Q74 20 72 50 Q70 80 50 86 Q30 80 28 50 Q26 20 50 16 Z" fill={accent} opacity="0.9" />
          <g fill="#12100d">
            <polygon points="40,40 47,36 47,46" />
            <polygon points="60,40 53,36 53,46" />
          </g>
          <rect x="45" y="52" width="10" height="18" rx="4" fill="#12100d" opacity="0.85" />
          <g stroke={paper} strokeWidth="2" opacity="0.7">
            <line x1="34" y1="26" x2="42" y2="22" />
            <line x1="66" y1="26" x2="58" y2="22" />
          </g>
          <polygon points="50,74 44,80 56,80" fill="#c23a22" />
        </g>
      )}

      {motif === 'minimal' && (
        /* 极简主义：同一几何单元的冷静重复 */
        <g>
          {[0, 1, 2].map((i) => (
            <rect key={i} x="26" y={24 + i * 20} width="48" height="11" fill={accent} opacity={0.55 + i * 0.2} />
          ))}
          <rect x="26" y="24" width="48" height="51" fill="none" stroke={paper} strokeWidth="1.2" opacity="0.4" />
        </g>
      )}

      {motif === 'gesture' && (
        /* 抽象表现主义：滴洒、泼溅、身体行动的痕迹（波洛克式） */
        <g fill="none" strokeLinecap="round">
          <path d="M14 30 Q38 18 52 38 T88 34" stroke={accent} strokeWidth="3.5" />
          <path d="M18 62 Q44 48 60 66 T86 60" stroke="#c23a22" strokeWidth="2.6" opacity="0.9" />
          <path d="M24 80 Q48 70 78 78" stroke="#d9a81c" strokeWidth="2" opacity="0.8" />
          <path d="M30 22 Q50 44 72 26" stroke={paper} strokeWidth="1.6" opacity="0.6" />
          {/* 滴溅的墨点 */}
          <circle cx="40" cy="50" r="3" fill={accent} stroke="none" />
          <circle cx="66" cy="46" r="2.2" fill="#c23a22" stroke="none" />
          <circle cx="54" cy="72" r="2.6" fill={accent} stroke="none" opacity="0.85" />
          <circle cx="78" cy="70" r="1.6" fill={paper} stroke="none" opacity="0.7" />
          <circle cx="26" cy="44" r="1.8" fill={accent} stroke="none" opacity="0.7" />
        </g>
      )}

      {motif === 'pop' && (
        /* 波普艺术：本戴网点 + 高饱和撞色 + 重复符号 */
        <g>
          <defs>
            <pattern id={`${uid}-dots`} width="7" height="7" patternUnits="userSpaceOnUse">
              <circle cx="3.5" cy="3.5" r="1.7" fill={paper} opacity="0.9" />
            </pattern>
          </defs>
          {/* 撞色底 */}
          <rect x="18" y="22" width="64" height="56" fill={accent} />
          <rect x="18" y="22" width="64" height="56" fill={`url(#${uid}-dots)`} opacity="0.5" />
          {/* 重复的圆（汤罐/梦露式复制） */}
          <circle cx="36" cy="42" r="13" fill="#c23a22" />
          <circle cx="36" cy="42" r="13" fill={`url(#${uid}-dots)`} opacity="0.35" />
          <circle cx="62" cy="42" r="13" fill="#d9a81c" />
          <circle cx="62" cy="42" r="13" fill={`url(#${uid}-dots)`} opacity="0.35" />
          <circle cx="49" cy="63" r="13" fill="#2456a6" />
          <circle cx="49" cy="63" r="13" fill={`url(#${uid}-dots)`} opacity="0.35" />
          <rect x="18" y="22" width="64" height="56" fill="none" stroke={paper} strokeWidth="1.6" opacity="0.6" />
        </g>
      )}

      {motif === 'collage' && (
        /* 后现代主义：引用、拼贴、戏仿、风格混搭 */
        <g>
          {/* 撕裂错位的不同时代碎片 */}
          <polygon points="20,24 52,20 48,50 22,54" fill={accent} opacity="0.9" />
          <polygon points="52,20 82,26 76,52 48,50" fill="#d9a81c" opacity="0.85" />
          <rect x="24" y="54" width="26" height="26" fill="#2456a6" opacity="0.85" transform="rotate(-4 37 67)" />
          {/* 古典柱式碎片（历史被调用） */}
          <g fill={paper} opacity="0.9">
            <rect x="60" y="58" width="4" height="22" />
            <rect x="67" y="58" width="4" height="22" />
            <rect x="74" y="58" width="4" height="22" />
            <rect x="58" y="54" width="22" height="3.5" />
            <rect x="58" y="80" width="22" height="3.5" />
          </g>
          {/* 斜向的霓虹一笔（当代符号入侵） */}
          <line x1="18" y1="78" x2="56" y2="30" stroke="#c23a22" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <circle cx="30" cy="34" r="4" fill="#c23a22" opacity="0.9" />
        </g>
      )}


      {motif === 'ghost' && (
        /* 占位节点：尚未点亮的坐标 */
        <g fill="none" stroke={accent} opacity="0.85">
          <circle cx="50" cy="50" r="30" strokeWidth="1.4" strokeDasharray="3 6" />
          <circle cx="50" cy="50" r="3" fill={accent} stroke="none" />
        </g>
      )}
    </svg>
  )
}
