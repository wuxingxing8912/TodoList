import type { SelectHTMLAttributes } from 'react'

interface Option<T extends string> {
  value: T
  label: string
}

interface SelectProps<T extends string> extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
}

/** 通用下拉选择组件 */
export function Select<T extends string>({ value, options, onChange, className = '', ...props }: SelectProps<T>) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as T)}
      className={`h-10 w-full rounded-full border border-black/10 bg-white px-3 text-sm text-ink transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
