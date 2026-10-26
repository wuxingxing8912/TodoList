import type { Category, Priority, TodoStatusFilter } from '@/types/todo'

/** 分类选项（用于下拉框与筛选） */
export const CATEGORY_OPTIONS: { value: Category; label: string }[] = [
  { value: 'work', label: '工作' },
  { value: 'study', label: '学习' },
  { value: 'life', label: '生活' },
]

/** 优先级选项（用于下拉框） */
export const PRIORITY_OPTIONS: { value: Priority; label: string }[] = [
  { value: 'high', label: '高' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '低' },
]

/** 状态筛选项 */
export const STATUS_OPTIONS: { value: TodoStatusFilter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'active', label: '未完成' },
  { value: 'completed', label: '已完成' },
]

/** 分类标签样式 */
export const CATEGORY_STYLES: Record<Category, string> = {
  work: 'bg-brand-soft text-brand-dark',
  study: 'bg-violet-50 text-violet-600',
  life: 'bg-emerald-50 text-emerald-600',
}

/** 优先级标签样式 */
export const PRIORITY_STYLES: Record<Priority, string> = {
  high: 'bg-red-50 text-red-600',
  medium: 'bg-amber-50 text-amber-600',
  low: 'bg-slate-100 text-slate-500',
}

/** 优先级排序权重（数字越小越靠前） */
export const PRIORITY_WEIGHT: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
}

/** 通过 value 取对应的中文标签 */
export function getOptionLabel<T extends string>(
  options: { value: T; label: string }[],
  value: T,
): string {
  return options.find((option) => option.value === value)?.label ?? value
}
