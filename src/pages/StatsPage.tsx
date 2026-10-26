import { TodoStats } from '@/components/todo/TodoStats'
import { EmptyState } from '@/components/ui/EmptyState'
import { CATEGORY_OPTIONS } from '@/constants/todo'
import { useTodoFilters } from '@/hooks/useTodoFilters'
import type { Category } from '@/types/todo'

/** 统计页：整体完成情况 + 各分类分布 */
export default function StatsPage() {
  const { stats, categoryStats } = useTodoFilters()
  const progress = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100)

  if (stats.total === 0) {
    return <EmptyState title="暂无统计数据" description="添加任务后即可查看完成情况" />
  }

  return (
    <div className="space-y-4">
      <TodoStats stats={stats} />

      <section className="space-y-3 rounded-3xl bg-white p-4 shadow-card">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink">完成进度</span>
          <span className="text-ink-muted">{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${progress}%` }} />
        </div>

        <ul className="space-y-3 pt-2">
          {CATEGORY_OPTIONS.map((option) => {
            const item = categoryStats[option.value as Category]
            const percent = item.total === 0 ? 0 : Math.round((item.completed / item.total) * 100)
            return (
              <li key={option.value} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-ink-muted">
                  <span>{option.label}</span>
                  <span>
                    {item.completed}/{item.total}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-brand/70" style={{ width: `${percent}%` }} />
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
