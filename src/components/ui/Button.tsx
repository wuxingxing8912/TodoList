import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const BASE =
  'inline-flex items-center justify-center gap-1.5 rounded-full text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark',
  secondary: 'bg-slate-100 text-ink-muted hover:bg-slate-200',
  ghost: 'text-ink-muted hover:bg-slate-100',
}

/** 通用按钮组件 */
export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return <button className={`${BASE} ${VARIANTS[variant]} h-10 px-4 ${className}`} {...props} />
}
