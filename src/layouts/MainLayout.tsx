import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import {
  LayoutDashboard,
  ShoppingBag,
  BookOpen,
  Package,
  Wallet,
  Users,
  Settings,
  Search,
  Bell,
  LogOut,
  ChevronDown,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/vendas', label: 'Vendas / PDV', icon: ShoppingBag },
  { to: '/catalogo', label: 'Catálogo', icon: BookOpen },
  { to: '/estoque', label: 'Estoque', icon: Package },
  { to: '/financeiro', label: 'Financeiro', icon: Wallet },
  { to: '/funcionarios', label: 'Funcionários', icon: Users },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
]

export default function MainLayout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="flex items-center h-[56px] px-5 gap-3">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 mr-4 shrink-0">
            <div className="w-8 h-8 rounded-md bg-navy flex items-center justify-center">
              <img
                src="/logo.jpeg"
                alt="Fouet Gestta"
                className="w-6 h-6 rounded-sm object-cover"
              />
            </div>
            <span className="text-[15px] font-bold text-navy tracking-tight hidden sm:block">
              Fouet Gestta
            </span>
          </NavLink>

          {/* Nav Links */}
          <nav className="flex items-center gap-0.5 flex-1 overflow-x-auto no-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'text-primary-dark bg-primary-light'
                      : 'text-text-secondary hover:text-text hover:bg-gray-50'
                  }`
                }
              >
                <item.icon size={15} />
                <span className="hidden lg:inline">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 ml-auto shrink-0">
            {/* Search */}
            <div className="relative hidden md:block">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
              />
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field !py-1.5 !pl-9 !pr-3 !text-[13px] w-[180px] focus:w-[240px] transition-all duration-300"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-md hover:bg-gray-50 transition-colors">
              <Bell size={18} className="text-text-secondary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-xs font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <ChevronDown size={14} className="text-text-secondary hidden sm:block" />
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-md shadow-elevated border border-border z-50 fade-in">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-semibold text-text">
                        {user?.name}
                      </p>
                      <p className="text-xs text-text-secondary mt-0.5">
                        {user?.role}
                      </p>
                    </div>
                    <div className="p-1">
                      <button
                        onClick={() => {
                          setShowUserMenu(false)
                          navigate('/configuracoes')
                        }}
                        className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <Settings size={14} />
                        Configurações
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm rounded-sm hover:bg-red-50 text-danger flex items-center gap-2 transition-colors"
                      >
                        <LogOut size={14} />
                        Sair
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-5 lg:p-8 max-w-[1440px] w-full mx-auto fade-in">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-4 px-5">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs text-text-secondary">
          <span>© 2024 Fouet Gestta. Todos os direitos reservados.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">Suporte</a>
            <a href="#" className="hover:text-primary transition-colors">Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Configurações</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
