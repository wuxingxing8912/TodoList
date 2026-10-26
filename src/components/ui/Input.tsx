import type { InputHTMLAttributes } from 'react'

const BASE =
  'w-full rounded-full border border-black/10 bg-white px-4 text-sm text-ink placeholder:text-ink-muted/60 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20'

/** 通用输入框组件 */
export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${BASE} h-11 ${className}`} {...props} />
}
