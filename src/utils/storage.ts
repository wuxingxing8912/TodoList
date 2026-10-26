import type { Todo } from '@/types/todo'

/** LocalStorage 键名集中管理，避免各处硬编码 */
export const STORAGE_KEYS = {
  /** 任务列表（zustand persist 持久化的数据） */
  todos: 'todo-app-storage',
} as const

/** 合法的分类取值 */
const CATEGORIES: string[] = ['work', 'study', 'life']

/** 合法的优先级取值 */
const PRIORITIES: string[] = ['high', 'medium', 'low']

/**
 * 获取可用的 localStorage
 * 服务端渲染、隐私模式或被浏览器禁用时返回 null
 */
function getStorage(): Storage | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null
    return window.localStorage
  } catch {
    // 部分浏览器在禁用 Cookie 后访问 localStorage 会直接抛错
    return null
  }
}

/** 读取并反序列化 JSON 数据，失败时返回兜底值 */
export function readStorage<T>(key: string, fallback: T): T {
  const storage = getStorage()
  if (!storage) return fallback

  try {
    const raw = storage.getItem(key)
    if (raw === null) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/** 序列化并写入数据，返回是否写入成功（超出配额或不可用时为 false） */
export function writeStorage<T>(key: string, value: T): boolean {
  const storage = getStorage()
  if (!storage) return false

  try {
    storage.setItem(key, JSON.stringify(value))
    return true
  } catch {
    return false
  }
}

/** 删除指定键 */
export function removeStorage(key: string): void {
  const storage = getStorage()
  if (!storage) return

  try {
    storage.removeItem(key)
  } catch {
    // 忽略：删除失败不影响主流程
  }
}

/** 校验单条任务数据是否合法（用于过滤本地存储的脏数据） */
export function isValidTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false

  const todo = value as Record<string, unknown>
  return (
    typeof todo.id === 'string' &&
    todo.id.length > 0 &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean' &&
    typeof todo.category === 'string' &&
    CATEGORIES.includes(todo.category) &&
    typeof todo.priority === 'string' &&
    PRIORITIES.includes(todo.priority)
  )
}

/**
 * 读取本地保存的任务列表
 * 数据缺失或格式错误时返回空数组，单条脏数据会被过滤掉
 */
export function loadTodos(): Todo[] {
  const data = readStorage<unknown>(STORAGE_KEYS.todos, null)
  if (!data || typeof data !== 'object') return []

  // persist 中间件保存的结构为 { state: { todos: [] }, version: number }
  const raw = (data as { state?: unknown }).state ?? data
  if (typeof raw !== 'object' || raw === null) return []

  const todos = (raw as { todos?: unknown }).todos
  if (!Array.isArray(todos)) return []

  return todos.filter(isValidTodo).map((todo) => ({
    ...todo,
    description: todo.description ?? '',
    dueDate: todo.dueDate ?? null,
  })) as Todo[]
}

/** 保存任务列表到本地，返回是否写入成功 */
export function saveTodos(todos: Todo[]): boolean {
  return writeStorage(STORAGE_KEYS.todos, { state: { todos }, version: 1 })
}
