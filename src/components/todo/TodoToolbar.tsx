import { Input } from '@/components/ui/Input'
import { STATUS_OPTIONS } from '@/constants/todo'
import type { TodoStatusFilter } from '@/types/todo'

interface TodoToolbarProps {
  keyword: string
  onKeywordChange: (value: string) => void
  status: TodoStatusFilter
  onStatusChange: (value: TodoStatusFilter) => void
}

/** 搜索框 + 状态筛选 */
export function TodoToolbar({ keyword, onKeywordChange, status, onStatusChange }: TodoToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Input
        type="search"
        value={keyword}
        onChange={(event) => onKeywordChange(event.target.value)}
        placeholder="搜索标题或内容"
        aria-label="搜索任务"
      />
      <div className="flex shrink-0 gap-1 rounded-full bg-white p-1 shadow-card">
        {STATUS_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onStatusChange(option.value)}
            className={`h-8 flex-1 rounded-full px-3 text-xs transition-colors sm:flex-none ${
              status === option.value ? 'bg-brand text-white' : 'text-ink-muted hover:bg-slate-100'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
