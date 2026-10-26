import { useMemo, useState } from 'react'
import { useTodoStore } from '@/store/todoStore'
import { PRIORITY_WEIGHT } from '@/constants/todo'
import type { Todo, TodoStats, TodoStatusFilter } from '@/types/todo'

/**
 * 任务列表的搜索、筛选与统计
 * 未完成任务排前，其次按优先级，再按创建时间倒序
 */
export function useTodoFilters() {
  const todos = useTodoStore((state) => state.todos)
  const [keyword, setKeyword] = useState('')
  const [status, setStatus] = useState<TodoStatusFilter>('all')

  const visibleTodos = useMemo(() => {
    const query = keyword.trim().toLowerCase()

    return todos
      .filter((todo) => {
        if (status === 'active' && todo.completed) return false
        if (status === 'completed' && !todo.completed) return false
        if (!query) return true
        return (
          todo.title.toLowerCase().includes(query) ||
          todo.description.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => {
        if (a.completed !== b.completed) return a.completed ? 1 : -1
        if (a.priority !== b.priority) return PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
        return b.createdAt.localeCompare(a.createdAt)
      })
  }, [todos, keyword, status])

  const stats = useMemo<TodoStats>(
    () => ({
      total: todos.length,
      completed: todos.filter((todo) => todo.completed).length,
      active: todos.filter((todo) => !todo.completed).length,
    }),
    [todos],
  )

  /** 按分类统计任务数量 */
  const categoryStats = useMemo(() => {
    const result: Record<string, { total: number; completed: number }> = {
      work: { total: 0, completed: 0 },
      study: { total: 0, completed: 0 },
      life: { total: 0, completed: 0 },
    }
    todos.forEach((todo: Todo) => {
      result[todo.category].total += 1
      if (todo.completed) result[todo.category].completed += 1
    })
    return result
  }, [todos])

  return { keyword, setKeyword, status, setStatus, visibleTodos, stats, categoryStats }
}
