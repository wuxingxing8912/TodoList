import type { TodoStats } from '@/types/todo'

interface TodoStatsProps {
  stats: TodoStats
}

/** 任务统计卡片：全部 / 未完成 / 已完成 */
export function TodoStats({ stats }: TodoStatsProps) {
  const items = [
    { label: '全部', value: stats.total, className: 'text-ink' },
    { label: '未完成', value: stats.active, className: 'text-brand-dark' },
    { label: '已完成', value: stats.completed, className: 'text-emerald-600' },
  ]

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl bg-white px-3 py-4 text-center shadow-card">
          <p className={`text-2xl font-semibold ${item.className}`}>{item.value}</p>
          <p className="mt-0.5 text-xs text-ink-muted">{item.label}</p>
        </div>
      ))}
    </div>
  )
}
