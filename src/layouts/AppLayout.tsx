import { NavLink, Outlet } from 'react-router-dom'

/** 全局布局：顶部导航 + 内容区 + 页脚 */
export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-app">
      <header className="sticky top-0 z-10 border-b border-black/5 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
          <span className="text-base font-semibold text-ink">待办事项</span>
          <nav className="flex gap-1 text-sm">
            <NavItem to="/" label="待办" />
            <NavItem to="/stats" label="统计" />
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-5">
        <Outlet />
      </main>

      <footer className="py-6 text-center text-xs text-ink-muted/70">
        数据保存在浏览器本地，刷新不会丢失
      </footer>
    </div>
  )
}

/** 导航项 */
function NavItem({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `rounded-full px-3 py-1.5 transition-colors ${
          isActive ? 'bg-brand-soft text-brand-dark' : 'text-ink-muted hover:bg-slate-100'
        }`
      }
    >
      {label}
    </NavLink>
  )
}
