import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { CATEGORY_OPTIONS, PRIORITY_OPTIONS } from '@/constants/todo'
import { toIsoDate } from '@/utils/date'
import type { Category, Priority, TodoDraft } from '@/types/todo'

interface TodoFormProps {
  onSubmit: (draft: TodoDraft) => void
}

const EMPTY_FORM = {
  title: '',
  description: '',
  category: 'work' as Category,
  priority: 'medium' as Priority,
  dueDate: '',
}

/** 新增任务表单 */
export function TodoForm({ onSubmit }: TodoFormProps) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [showMore, setShowMore] = useState(false)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const title = form.title.trim()
    if (!title) return

    onSubmit({
      title,
      description: form.description.trim(),
      category: form.category,
      priority: form.priority,
      dueDate: toIsoDate(form.dueDate),
    })
    setForm({ ...EMPTY_FORM, category: form.category, priority: form.priority })
    setShowMore(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          value={form.title}
          onChange={(event) => setForm({ ...form, title: event.target.value })}
          placeholder="今天要做什么？"
          aria-label="任务标题"
          maxLength={80}
        />
        <Button type="submit" className="shrink-0">
          添加
        </Button>
      </div>

      <button
        type="button"
        onClick={() => setShowMore(!showMore)}
        className="text-xs text-ink-muted underline-offset-2 hover:text-brand hover:underline"
      >
        {showMore ? '收起选项' : '更多选项（描述 / 分类 / 优先级 / 截止日期）'}
      </button>

      {showMore && (
        <div className="grid gap-3 rounded-2xl bg-app/60 p-3 sm:grid-cols-2">
          <Textarea
            value={form.description}
            onChange={(event) => setForm({ ...form, description: event.target.value })}
            placeholder="任务描述（可选）"
            rows={3}
            className="sm:col-span-2"
            maxLength={300}
          />
          <label className="space-y-1 text-xs text-ink-muted">
            分类
            <Select
              value={form.category}
              options={CATEGORY_OPTIONS}
              onChange={(category) => setForm({ ...form, category })}
            />
          </label>
          <label className="space-y-1 text-xs text-ink-muted">
            优先级
            <Select
              value={form.priority}
              options={PRIORITY_OPTIONS}
              onChange={(priority) => setForm({ ...form, priority })}
            />
          </label>
          <label className="space-y-1 text-xs text-ink-muted sm:col-span-2">
            截止日期
            <Input
              type="date"
              value={form.dueDate}
              onChange={(event) => setForm({ ...form, dueDate: event.target.value })}
            />
          </label>
        </div>
      )}
    </form>
  )
}
