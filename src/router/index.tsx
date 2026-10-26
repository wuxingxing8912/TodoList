import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import TodoPage from '@/pages/TodoPage'
import StatsPage from '@/pages/StatsPage'
import NotFoundPage from '@/pages/NotFoundPage'

/** 应用路由表 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<TodoPage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
