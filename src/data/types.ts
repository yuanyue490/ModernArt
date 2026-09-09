/**
 * 内容数据结构 —— 全部内容数据驱动，新增流派只需追加数据。
 * 对应需求文档 §16。
 */

export interface Artist {
  id: string
  name: string
  /** 生卒年，如 "1840—1926" */
  years: string
  /** 一句话人物侧写 */
  note: string
}

export type ArtworkImageStatus =
  | 'verified'
  | 'needs-review'
  | 'copyright-restricted'
  | 'pending'
  | 'questionable'

export interface ArtworkImageMeta {
  /** 图片当前可信状态；只有 verified 代表已完成人工身份与许可核验 */
  status: ArtworkImageStatus
  /** 面向维护者与前台的简短说明 */
  note: string
  provider?: string
  providerId?: string
  sourceUrl?: string
  license?: string
  credit?: string
  verifiedOn?: string
  /** 本地正式展示文件的 SHA-256；无图条目不填写 */
  sha256?: string
  /** 因“不删除文件”规则暂时保留、但不得展示的旧资源 */
  retainedAsset?: string
}

export interface ArtworkReference {
  /** 用于确认作品身份、版本、馆藏或现状的资料来源；与图片授权来源分开 */
  provider: string
  url: string
  /** 馆藏编号、档案号或其它稳定标识 */
  objectId?: string
  verifiedOn: string
  note?: string
}

export interface Artwork {
  id: string
  title: string
  titleOriginal?: string

  artist: string
  year: string

  /** 本地图片路径（public/artworks/...）；为空则用生成式图形占位 */
  image?: string
  /** 图片身份、来源、授权与核验状态；所有作品都必须有记录 */
  imageMeta: ArtworkImageMeta

  medium?: string
  museum?: string
  /** 作品身份/馆藏依据；迁移期间允许缺省，缺失项由内容校验继续提示 */
  reference?: ArtworkReference

  description: string
  /** 为什么重要 */
  significance: string
}

/** 节点的生成式视觉母题 */
export type MotifKind =
  | 'halo' // 印象派：柔和、扩散、光晕
  | 'swirl' // 后印象派：旋转笔触、情绪
  | 'facets' // 塞尚：色块与结构切面
  | 'wild' // 野兽派：脱离现实的高饱和纯色块
  | 'shatter' // 立体主义：切割、几何碎片
  | 'speed' // 未来主义：速度线与连续动作
  | 'square' // 至上主义：黑方块与漂浮几何
  | 'diagonal' // 构成主义：红黑斜向构成
  | 'grid' // 风格派：黑线网格与三原色块
  | 'bauhaus' // 包豪斯：圆 / 三角 / 方形原色
  | 'orbit' // 抽象艺术：即兴的色与形（康定斯基）
  | 'mask' // 原始主义：非洲 / 大洋洲面具几何
  | 'minimal' // 极简主义：重复的几何单元
  | 'gesture' // 抽象表现主义：滴洒、泼溅、身体行动的痕迹
  | 'pop' // 波普艺术：本戴网点、高饱和撞色、大众消费符号
  | 'collage' // 后现代主义：引用、拼贴、戏仿、风格混搭
  | 'ghost' // 幽灵占位节点

export interface Movement {
  id: string
  /** 在完整艺术史脉络中的序号（沿用需求文档 §12 的编号） */
  index: string
  name: string
  nameEn: string

  /** 流派/艺术阶段的起点，不得用艺术家出生年代替 */
  startYear: number
  endYear?: number

  /** 核心问题 —— 这个流派在追问什么 */
  question: string
  description: string

  artists: Artist[]

  /** 关系（指向其它 Movement.id） */
  influencedBy: string[]
  influenced: string[]

  /** 空间图信息 */
  map: {
    /** 世界坐标（x 由年代换算，y 为思想分支巷道） */
    x: number
    y: number
  }

  /** 幽灵节点：尚未上线，仅占位展示 */
  ghost?: boolean

  visualStyle: {
    motif: MotifKind
    /** 节点主色 */
    accent: string
  }
}

export type RelationType =
  | 'inherit' // 继承
  | 'branch' // 分支
  | 'influence' // 影响
  | 'rebel' // 反叛
  | 'fuse' // 融合

export interface Relation {
  from: string
  to: string
  type: RelationType
}

export const RELATION_LABEL: Record<RelationType, string> = {
  inherit: '继承',
  branch: '分支',
  influence: '影响',
  rebel: '反叛',
  fuse: '融合',
}
