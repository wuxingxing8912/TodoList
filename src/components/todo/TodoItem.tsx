import { CATEGORY_STYLES, CATEGORY_OPTIONS, PRIORITY_STYLES, PRIORITY_OPTIONS, getOptionLabel } from '@/constants/todo'
import { formatDueDate, isOverdue } from '@/utils/date'
import type { Todo } from '@/types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

/** 单条待办事项 */
export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  const overdue = todo.dueDate && !todo.completed ? isOverdue(todo.dueDate) : false

  return (
    <li className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`标记「${todo.title}」为${todo.completed ? '未完成' : '已完成'}`}
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-black/20 text-brand accent-brand focus-visible:ring-2 focus-visible:ring-brand/40"
      />

      <div className="min-w-0 flex-1">
        <p
          className={`break-words text-sm font-medium ${
            todo.completed ? 'text-ink-muted/60 line-through' : 'text-ink'
          }`}
        >
          {todo.title}
        </p>

        {todo.description && (
          <p className="mt-1 whitespace-pre-wrap break-words text-xs text-ink-muted">
            {todo.description}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px]">
          <span className={`rounded-full px-2 py-0.5 ${CATEGORY_STYLES[todo.category]}`}>
            {getOptionLabel(CATEGORY_OPTIONS, todo.category)}
          </span>
          <span className={`rounded-full px-2 py-0.5 ${PRIORITY_STYLES[todo.priority]}`}>
            {getOptionLabel(PRIORITY_OPTIONS, todo.priority)}优先级
          </span>
          {todo.dueDate && (
            <span className={overdue ? 'text-red-500' : 'text-ink-muted'}>
              {overdue ? '已过期 · ' : '截止 '}
              {formatDueDate(todo.dueDate)}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onRemove(todo.id)}
        aria-label={`删除「${todo.title}」`}
        className="shrink-0 rounded-full p-1.5 text-ink-muted/70 transition-colors hover:bg-red-50 hover:text-red-500"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </li>
  )
}
