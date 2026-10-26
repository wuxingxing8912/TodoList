import { TodoForm } from '@/components/todo/TodoForm'
import { TodoList } from '@/components/todo/TodoList'
import { TodoStats } from '@/components/todo/TodoStats'
import { TodoToolbar } from '@/components/todo/TodoToolbar'
import { Button } from '@/components/ui/Button'
import { useTodoFilters } from '@/hooks/useTodoFilters'
import { useTodoStore } from '@/store/todoStore'

/** 待办列表页：新增、搜索、完成、删除、统计 */
export default function TodoPage() {
  const addTodo = useTodoStore((state) => state.addTodo)
  const toggleTodo = useTodoStore((state) => state.toggleTodo)
  const removeTodo = useTodoStore((state) => state.removeTodo)
  const clearCompleted = useTodoStore((state) => state.clearCompleted)

  const { keyword, setKeyword, status, setStatus, visibleTodos, stats } = useTodoFilters()

  return (
    <div className="space-y-4">
      <TodoStats stats={stats} />

      <section className="rounded-3xl bg-white p-4 shadow-card">
        <TodoForm onSubmit={addTodo} />
      </section>

      <TodoToolbar
        keyword={keyword}
        onKeywordChange={setKeyword}
        status={status}
        onStatusChange={setStatus}
      />

      <TodoList
        todos={visibleTodos}
        emptyTitle={stats.total === 0 ? '还没有待办事项' : '没有符合条件的任务'}
        emptyDescription={stats.total === 0 ? '在上面输入框添加第一条任务吧' : '试试更换关键词或筛选条件'}
        onToggle={toggleTodo}
        onRemove={removeTodo}
      />

      {stats.completed > 0 && (
        <div className="flex justify-end">
          <Button variant="ghost" onClick={clearCompleted} className="text-xs">
            清除已完成（{stats.completed}）
          </Button>
        </div>
      )}
    </div>
  )
}
