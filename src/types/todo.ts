/** 任务优先级：高、中、低 */
export type Priority = 'high' | 'medium' | 'low'

/** 任务分类：工作、学习、生活 */
export type Category = 'work' | 'study' | 'life'

/** 列表筛选状态 */
export type TodoStatusFilter = 'all' | 'active' | 'completed'

/** 待办事项数据模型 */
export interface Todo {
  /** 唯一标识 */
  id: string
  /** 标题 */
  title: string
  /** 描述 */
  description: string
  /** 分类 */
  category: Category
  /** 优先级 */
  priority: Priority
  /** 截止日期（ISO 字符串，可为空） */
  dueDate: string | null
  /** 是否完成 */
  completed: boolean
  /** 创建时间（ISO 字符串） */
  createdAt: string
  /** 更新时间（ISO 字符串） */
  updatedAt: string
}

/** 新建任务时提交的数据 */
export type TodoDraft = Pick<Todo, 'title' | 'description' | 'category' | 'priority' | 'dueDate'>

/** 任务统计信息 */
export interface TodoStats {
  total: number
  completed: number
  active: number
}
