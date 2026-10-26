import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isSameDay, parseISO, startOfToday } from 'date-fns'
import { PRIORITY_WEIGHT } from '@/constants/todo'
import type {
  CategoryFilter,
  Todo,
  TodoDraft,
  TodoScope,
  TodoStats,
  TodoStatusFilter,
} from '@/types/todo'
import { createId } from '@/utils/id'
import { STORAGE_KEYS } from '@/utils/storage'

/** 列表相关数据（供派生 selector 复用） */
type TodoListState = Pick<TodoState, 'todos' | 'keyword' | 'status' | 'category'>

interface TodoState {
  /** 全部任务 */
  todos: Todo[]
  /** 搜索关键词 */
  keyword: string
  /** 完成状态筛选 */
  status: TodoStatusFilter
  /** 分类筛选 */
  category: CategoryFilter
  /** 列表数据范围：今日 / 全部 */
  scope: TodoScope
  /** 新增任务 */
  addTodo: (draft: TodoDraft) => void
  /** 编辑任务 */
  updateTodo: (id: string, patch: Partial<TodoDraft>) => void
  /** 删除任务 */
  removeTodo: (id: string) => void
  /** 切换完成状态 */
  toggleTodo: (id: string) => void
  /** 清除已完成任务 */
  clearCompleted: () => void
  /** 设置搜索关键词 */
  setKeyword: (keyword: string) => void
  /** 设置完成状态筛选 */
  setStatus: (status: TodoStatusFilter) => void
  /** 设置分类筛选，再次点击已选分类则取消 */
  setCategory: (category: CategoryFilter) => void
  /** 设置列表数据范围 */
  setScope: (scope: TodoScope) => void
  /** 重置全部筛选条件 */
  resetFilters: () => void
}

/** 当前时间戳 */
const now = () => new Date().toISOString()

/** 初始筛选条件 */
const DEFAULT_FILTERS = {
  keyword: '',
  status: 'all' as TodoStatusFilter,
  category: 'all' as CategoryFilter,
  scope: 'today' as TodoScope,
}

/** 按关键词、状态、分类筛选并排序：未完成优先，其次优先级，最后创建时间倒序 */
export function filterVisibleTodos({ todos, keyword, status, category }: TodoListState): Todo[] {
  const query = keyword.trim().toLowerCase()

  return todos
    .filter((todo) => {
      if (status === 'active' && todo.completed) return false
      if (status === 'completed' && !todo.completed) return false
      if (category !== 'all' && todo.category !== category) return false
      if (!query) return true
      return (
        todo.title.toLowerCase().includes(query) || todo.description.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      if (a.priority !== b.priority) return PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority]
      return b.createdAt.localeCompare(a.createdAt)
    })
}

/** 今日任务：截止日期为今天，无截止日期时以创建日期为今天为准 */
export function selectTodayTodos(todos: Todo[]): Todo[] {
  const today = startOfToday()
  return todos.filter((todo) => {
    const target = todo.dueDate ? parseISO(todo.dueDate) : parseISO(todo.createdAt)
    return isSameDay(target, today)
  })
}

/** 任务完成情况统计 */
export function selectStats(todos: Todo[]): TodoStats {
  return {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    active: todos.filter((todo) => !todo.completed).length,
  }
}

/** 各分类任务数量统计 */
export function selectCategoryStats(todos: Todo[]): Record<string, { total: number; completed: number }> {
  const result: Record<string, { total: number; completed: number }> = {
    work: { total: 0, completed: 0 },
    study: { total: 0, completed: 0 },
    life: { total: 0, completed: 0 },
  }
  todos.forEach((todo) => {
    result[todo.category].total += 1
    if (todo.completed) result[todo.category].completed += 1
  })
  return result
}

/**
 * 待办事项全局状态：任务数据 + 筛选条件
 * 通过 zustand persist 中间件自动同步到 LocalStorage，刷新不丢失
 */
export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      ...DEFAULT_FILTERS,

      addTodo: (draft) =>
        set((state) => ({
          todos: [
            { id: createId(), completed: false, createdAt: now(), updatedAt: now(), ...draft },
            ...state.todos,
          ],
        })),

      updateTodo: (id, patch) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...patch, updatedAt: now() } : todo,
          ),
        })),

      removeTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: now() } : todo,
          ),
        })),

      clearCompleted: () => set((state) => ({ todos: state.todos.filter((todo) => !todo.completed) })),

      setKeyword: (keyword) => set({ keyword }),

      setStatus: (status) => set({ status }),

      setCategory: (category) =>
        set((state) => ({ category: state.category === category ? 'all' : category })),

      setScope: (scope) => set({ scope }),

      resetFilters: () => set({ ...DEFAULT_FILTERS }),
    }),
    {
      name: STORAGE_KEYS.todos,
      version: 1,
      // 只持久化任务数据，筛选条件每次进入页面回到默认值
      partialize: (state) => ({ todos: state.todos }),
    },
  ),
)
