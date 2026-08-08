import type { Relation } from './types'

/**
 * 流派之间的主关系 —— 完整收录需求文档 §13 的 30 条。
 * 含幽灵节点的连线以暗色占位展示，节点上线后自动点亮。
 */
export const relations: Relation[] = [
  // 前段主干
  { from: 'realism', to: 'impressionism', type: 'inherit' },
  { from: 'impressionism', to: 'post-impressionism', type: 'inherit' },
  { from: 'post-impressionism', to: 'cezanne', type: 'branch' },
  { from: 'cezanne', to: 'cubism', type: 'inherit' },
  { from: 'post-impressionism', to: 'fauvism', type: 'branch' },

  // 原始主义注入
  { from: 'primitivism', to: 'fauvism', type: 'influence' },
  { from: 'primitivism', to: 'cubism', type: 'influence' },

  // 立体主义的分叉
  { from: 'cubism', to: 'futurism', type: 'influence' },
  { from: 'cubism', to: 'constructivism', type: 'influence' },
  { from: 'cubism', to: 'suprematism', type: 'influence' },

  // 抽象 → 至上 → 构成 → 风格派/包豪斯
  { from: 'abstraction', to: 'suprematism', type: 'inherit' },
  { from: 'suprematism', to: 'constructivism', type: 'influence' },
  { from: 'constructivism', to: 'de-stijl', type: 'influence' },
  { from: 'constructivism', to: 'bauhaus', type: 'influence' },
  { from: 'de-stijl', to: 'bauhaus', type: 'influence' },

  // 达达的分叉（观念与大众的种子）
  { from: 'dada', to: 'surrealism', type: 'inherit' },
  { from: 'dada', to: 'conceptual-art', type: 'influence' },
  { from: 'dada', to: 'pop-art', type: 'influence' },

  // 超现实 → 抽象表现 → 波普
  { from: 'surrealism', to: 'abstract-expressionism', type: 'influence' },
  { from: 'abstract-expressionism', to: 'pop-art', type: 'branch' },

  // 极简 → 观念
  { from: 'minimalism', to: 'conceptual-art', type: 'influence' },

  // 现代主义的回响：包豪斯 → 后现代（"现代主义"以包豪斯为代表节点）
  { from: 'bauhaus', to: 'postmodernism', type: 'rebel' },
  { from: 'pop-art', to: 'postmodernism', type: 'influence' },

  // 汇入当代
  { from: 'conceptual-art', to: 'contemporary', type: 'inherit' },
  { from: 'postmodernism', to: 'contemporary', type: 'inherit' },
]
