import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, FileText, DollarSign, Users } from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/projetos', label: 'Projetos', icon: FolderKanban },
  { to: '/contratos', label: 'Contratos', icon: FileText },
  { to: '/custos', label: 'Custos', icon: DollarSign },
  { to: '/cadastro', label: 'Cadastro', icon: Users },
]

export default function Sidebar() {
  return (
    <aside className="w-[160px] min-h-screen bg-sidebar flex flex-col justify-between py-5 px-3 fixed left-0 top-0">
      {/* Logo */}
      <div>
        <div className="flex items-center justify-center px-2 mb-8">
          <img
            src="/pronet.png"
            alt="Pronet"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary text-white font-medium'
                    : 'text-gray-400 hover:bg-sidebar-hover hover:text-white'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User */}
      <div className="flex items-center gap-2.5 px-2">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden flex-shrink-0">
          <span className="text-primary text-xs font-semibold">BS</span>
        </div>
        <div className="min-w-0">
          <p className="text-white text-xs font-medium truncate">Bruno Silva</p>
          <p className="text-gray-500 text-[10px] truncate">EngProject v1.0</p>
        </div>
      </div>
    </aside>
  )
}