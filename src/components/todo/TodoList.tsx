import { TodoItem } from './TodoItem'
import { EmptyState } from '@/components/ui/EmptyState'
import type { Todo } from '@/types/todo'

interface TodoListProps {
  todos: Todo[]
  emptyTitle: string
  emptyDescription?: string
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

/** 待办列表 */
export function TodoList({ todos, emptyTitle, emptyDescription, onToggle, onRemove }: TodoListProps) {
  if (todos.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  )
}
