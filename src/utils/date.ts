import { format, isPast, isToday, isTomorrow, parseISO } from 'date-fns'
import { zhCN } from 'date-fns/locale'

/** 格式化截止日期：今天 / 明天 / M月d日 */
export function formatDueDate(isoDate: string): string {
  const date = parseISO(isoDate)
  if (isToday(date)) return '今天'
  if (isTomorrow(date)) return '明天'
  return format(date, 'M月d日', { locale: zhCN })
}

/** 是否已过期（不含今天） */
export function isOverdue(isoDate: string): boolean {
  const date = parseISO(isoDate)
  return !isToday(date) && isPast(date)
}

/** 格式化创建时间：yyyy-MM-dd HH:mm */
export function formatDateTime(isoDate: string): string {
  return format(parseISO(isoDate), 'yyyy-MM-dd HH:mm', { locale: zhCN })
}

/** 把 <input type="date"> 的值转成 ISO 字符串 */
export function toIsoDate(dateValue: string): string | null {
  if (!dateValue) return null
  const date = parseISO(dateValue)
  if (Number.isNaN(date.getTime())) return null
  return date.toISOString()
}

/** 把 ISO 字符串转成 <input type="date"> 需要的值 */
export function toDateInputValue(isoDate: string | null): string {
  if (!isoDate) return ''
  return format(parseISO(isoDate), 'yyyy-MM-dd')
}
