import { useMemo } from 'react'
import { format } from 'date-fns'
import {
  filterVisibleTodos,
  selectCategoryStats,
  selectStats,
  selectTodayTodos,
  useTodoStore,
} from '@/store/todoStore'

/**
 * 基于全局 store 的任务筛选与统计
 * 用一个个独立订阅读取原始值，再用 useMemo 做派生计算，避免产生新引用导致的重复渲染
 */
export function useTodoFilters() {
  const todos = useTodoStore((state) => state.todos)
  const keyword = useTodoStore((state) => state.keyword)
  const status = useTodoStore((state) => state.status)
  const category = useTodoStore((state) => state.category)
  const scope = useTodoStore((state) => state.scope)

  /** 当前数据范围内的任务 */
  const visibleTodos = useMemo(
    () => filterVisibleTodos({ todos, keyword, status, category }),
    [todos, keyword, status, category],
  )

  const todayTodos = useMemo(() => selectTodayTodos(visibleTodos), [visibleTodos])
  const stats = useMemo(() => selectStats(todos), [todos])
  const categoryStats = useMemo(() => selectCategoryStats(todos), [todos])
  const todayLabel = useMemo(() => format(new Date(), 'M月d日'), [])

  return {
    todos,
    keyword,
    status,
    category,
    scope,
    visibleTodos,
    todayTodos,
    stats,
    categoryStats,
    todayLabel,
  }
}
