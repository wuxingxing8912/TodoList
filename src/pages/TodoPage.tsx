import { useState } from 'react'
import { TodoForm } from '@/components/todo/TodoForm'
import { TodoList } from '@/components/todo/TodoList'
import { TodoStats } from '@/components/todo/TodoStats'
import { TodoToolbar } from '@/components/todo/TodoToolbar'
import { CategoryFilter } from '@/components/todo/CategoryFilter'
import { BentoCard } from '@/components/ui/BentoCard'
import { useTodoFilters } from '@/hooks/useTodoFilters'
import { useTodoStore } from '@/store/todoStore'

/** 右下角任务区的数据范围 */
type ListScope = 'today' | 'all'

/** 待办主页：Bento Grid 布局（统计 / 添加 / 分类 / 任务列表） */
export default function TodoPage() {
  const addTodo = useTodoStore((state) => state.addTodo)
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const clearCompleted = useTodoStore((state) => state.clearCompleted)

  const {
    keyword,
    setKeyword,
    status,
    setStatus,
    category,
    setCategory,
    visibleTodos,
    todayTodos,
    todayLabel,
    stats,
    categoryStats,
  } = useTodoFilters()

  const [scope, setScope] = useState<ListScope>('today')
  const isTodayScope = scope === 'today'
  const todos = isTodayScope ? todayTodos : visibleTodos
  const doneCount = todos.filter((todo) => todo.completed).length

  /** 列表为空时的提示文案 */
  const getEmptyText = () => {
    if (stats.total === 0) return { title: '还没有待办事项', description: '在右上方的「添加任务」写下第一条吧' }
    if (isTodayScope) return { title: '今天没有任务安排', description: '切换到「全部」查看其它任务' }
    return { title: '没有符合条件的任务', description: '试试更换关键词或筛选条件' }
  }
  const emptyText = getEmptyText()

  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {/* 左上：统计数据 */}
      <BentoCard title="总览" description={`今天是 ${todayLabel}`} className="lg:col-span-4">
        <TodoStats stats={stats} variant="plain" />
      </BentoCard>

      {/* 右上：添加任务 */}
      <BentoCard title="添加任务" description="写下要做的事，回车即可加入列表" className="lg:col-span-8">
        <TodoForm onSubmit={addTodo} />
      </BentoCard>

      {/* 左下：分类筛选 */}
      <BentoCard title="分类筛选" description="点击分类查看对应任务" className="lg:col-span-4">
        <CategoryFilter value={category} onChange={setCategory} counts={categoryStats} total={stats.total} />
      </BentoCard>

      {/* 右下：核心区域，默认展示今日任务 */}
      <BentoCard
        title={isTodayScope ? '今日任务' : '全部任务'}
        description={`${todos.length} 项 · 已完成 ${doneCount} 项`}
        className="lg:col-span-8"
        actions={
          <div className="flex gap-1 rounded-full bg-app/60 p-1">
            {(
              [
                { value: 'today', label: '今日' },
                { value: 'all', label: '全部' },
              ] as { value: ListScope; label: string }[]
            ).map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setScope(option.value)}
                aria-pressed={scope === option.value}
                className={`h-7 rounded-full px-3 text-xs transition-colors ${
                  scope === option.value ? 'bg-white text-ink shadow-card' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        }
      >
        <div className="flex h-full flex-col gap-3">
          <TodoToolbar
            keyword={keyword}
            onKeywordChange={setKeyword}
            status={status}
            onStatusChange={setStatus}
          />

          <div className="min-h-0 flex-1 lg:max-h-[52vh] lg:overflow-y-auto lg:pr-1">
            <TodoList
              todos={todos}
              emptyTitle={emptyText.title}
              emptyDescription={emptyText.description}
              onToggle={toggleTodo}
              onRemove={removeTodo}
            />
          </div>

          {stats.completed > 0 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={clearCompleted}
                className="rounded-full px-3 py-1 text-xs text-ink-muted transition-colors hover:bg-slate-100 hover:text-ink"
              >
                清除已完成（{stats.completed}）
              </button>
            </div>
          )}
        </div>
      </BentoCard>
    </div>
  )
}
