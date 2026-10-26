import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from '@/router'

/** 应用根组件：挂载路由 */
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
