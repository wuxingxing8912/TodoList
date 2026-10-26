import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Todo, TodoDraft } from '@/types/todo'
import { createId } from '@/utils/id'

interface TodoState {
  /** 全部任务 */
  todos: Todo[]
  /** 新增任务 */
  addTodo: (draft: TodoDraft) => void
  /** 切换完成状态 */
  toggleTodo: (id: string) => void
  /** 编辑任务 */
  updateTodo: (id: string, patch: Partial<TodoDraft>) => void
  /** 删除任务 */
  removeTodo: (id: string) => void
  /** 清除已完成任务 */
  clearCompleted: () => void
}

/** 当前时间戳 */
const now = () => new Date().toISOString()

/**
 * 待办事项全局状态
 * 通过 zustand persist 中间件自动同步到 LocalStorage，刷新不丢失
 */
export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],

      addTodo: (draft) =>
        set((state) => ({
          todos: [
            { id: createId(), completed: false, createdAt: now(), updatedAt: now(), ...draft },
            ...state.todos,
          ],
        })),

      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed, updatedAt: now() } : todo,
          ),
        })),

      updateTodo: (id, patch) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, ...patch, updatedAt: now() } : todo,
          ),
        })),

      removeTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),

      clearCompleted: () => set((state) => ({ todos: state.todos.filter((todo) => !todo.completed) })),
    }),
    {
      name: 'todo-app-storage', // LocalStorage key
      version: 1,
      partialize: (state) => ({ todos: state.todos }),
    },
  ),
)
