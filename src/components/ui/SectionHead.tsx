interface SectionHeadProps {
  no: string
  zh: string
  en: string
}

/** 详情页章节标题：编号 + 中文 + 英文 */
export function SectionHead({ no, zh, en }: SectionHeadProps) {
  return (
    <div className="flex items-baseline gap-5 border-t border-line-dark pt-5">
      <span className="font-mono-num text-xs text-smoke">{no}</span>
      <h2 className="font-wide text-2xl font-extrabold uppercase tracking-[0.08em] text-ink md:text-3xl">
        {en}
      </h2>
      <span className="text-sm text-smoke">{zh}</span>
      <span className="ml-auto hidden h-px flex-1 bg-line-dark md:block" />
    </div>
  )
}
