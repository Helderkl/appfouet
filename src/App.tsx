import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import MainLayout from './layouts/MainLayout'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import SalesPage from './pages/SalesPage'
import CatalogPage from './pages/CatalogPage'
import InventoryPage from './pages/InventoryPage'
import FinancePage from './pages/FinancePage'
import EmployeesPage from './pages/EmployeesPage'
import SettingsPage from './pages/SettingsPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="vendas" element={<SalesPage />} />
        <Route path="catalogo" element={<CatalogPage />} />
        <Route path="estoque" element={<InventoryPage />} />
        <Route path="financeiro" element={<FinancePage />} />
        <Route path="funcionarios" element={<EmployeesPage />} />
        <Route path="configuracoes" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
