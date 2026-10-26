import { Link } from 'react-router-dom'
import { EmptyState } from '@/components/ui/EmptyState'

/** 404 页面 */
export default function NotFoundPage() {
  return (
    <EmptyState
      title="页面不存在"
      description="你访问的地址没有对应的页面"
      action={
        <Link to="/" className="mt-2 text-sm text-brand hover:underline">
          返回待办列表
        </Link>
      }
    />
  )
}
