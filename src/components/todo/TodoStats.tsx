import type { TodoStats } from '@/types/todo'

interface TodoStatsProps {
  stats: TodoStats
  /** card：每项为独立白卡；plain：内容模式，由外部容器提供背景 */
  variant?: 'card' | 'plain'
}

/** 任务统计：全部 / 未完成 / 已完成 */
export function TodoStats({ stats, variant = 'card' }: TodoStatsProps) {
  const progress = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)

  const items = [
    { label: '全部', value: stats.total, className: 'text-ink' },
    { label: '未完成', value: stats.active, className: 'text-brand-dark' },
    { label: '已完成', value: stats.completed, className: 'text-emerald-600' },
  ]

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={`rounded-2xl px-3 py-4 text-center ${
              variant === 'card' ? 'bg-white shadow-card' : 'bg-app/60'
            }`}
          >
            <p className={`text-2xl font-semibold ${item.className}`}>{item.value}</p>
            <p className="mt-0.5 text-xs text-ink-muted">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-ink-muted">
          <span>完成进度</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-app">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  )
}
