import type { TextareaHTMLAttributes } from 'react'

/** 通用多行输入组件 */
export function Textarea({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`w-full resize-none rounded-2xl border border-black/10 bg-white p-3 text-sm text-ink placeholder:text-ink-muted/60 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 ${className}`}
      {...props}
    />
  )
}
