import { CATEGORY_OPTIONS } from '@/constants/todo'
import type { CategoryFilter } from '@/types/todo'

interface CategoryFilterProps {
  /** 当前选中的分类 */
  value: CategoryFilter
  onChange: (value: CategoryFilter) => void
  /** 各分类的任务数量统计 */
  counts: Record<string, { total: number; completed: number }>
  /** 全部任务数量 */
  total: number
}

/** 按分类筛选任务，附带各分类数量 */
export function CategoryFilter({ value, onChange, counts, total }: CategoryFilterProps) {
  const options: { value: CategoryFilter; label: string; done: number; sum: number }[] = [
    { value: 'all', label: '全部', done: 0, sum: total },
    ...CATEGORY_OPTIONS.map((option) => ({
      value: option.value as CategoryFilter,
      label: option.label,
      done: counts[option.value]?.completed ?? 0,
      sum: counts[option.value]?.total ?? 0,
    })),
  ]

  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => {
        const active = value === option.value
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            aria-pressed={active}
            className={`flex flex-col items-start gap-0.5 rounded-2xl px-3 py-3 text-left transition-colors ${
              active ? 'bg-brand text-white' : 'bg-app/60 hover:bg-app'
            }`}
          >
            <span className={`text-sm font-medium ${active ? 'text-white' : 'text-ink'}`}>
              {option.label}
            </span>
            <span className={`text-xs ${active ? 'text-white/80' : 'text-ink-muted'}`}>
              {option.done}/{option.sum} 已完成
            </span>
          </button>
        )
      })}
    </div>
  )
}
