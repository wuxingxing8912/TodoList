import type { ReactNode } from 'react'

interface BentoCardProps {
  /** 卡片标题 */
  title?: string
  /** 标题下方的补充说明 */
  description?: string
  /** 标题右侧操作区 */
  actions?: ReactNode
  /** 外层容器附加样式（控制网格跨度） */
  className?: string
  /** 内容区附加样式 */
  bodyClassName?: string
  children: ReactNode
}

/** Bento 布局中的通用卡片：统一圆角、留白与标题区，内容区可滚动 */
export function BentoCard({
  title,
  description,
  actions,
  className = '',
  bodyClassName = '',
  children,
}: BentoCardProps) {
  return (
    <section className={`flex flex-col rounded-3xl bg-white p-4 shadow-card sm:p-5 ${className}`}>
      {(title || actions) && (
        <header className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {title && <h2 className="text-sm font-semibold text-ink">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-ink-muted">{description}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </header>
      )}

      <div className={`min-h-0 flex-1 ${bodyClassName}`}>{children}</div>
    </section>
  )
}
