import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import ProjetosPage from '@/pages/projetos/ProjetosPage'
import ProjetoDetalhe from '@/pages/projetos/ProjetoDetalhe'
import DashboardPage from '@/pages/DashboardPage'
import ContratosPage from '@/pages/ContratosPage'
import CustosPage from '@/pages/CustosPage'
import CadastroPage from '@/pages/CadastroPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projetos" element={<ProjetosPage />} />
          <Route path="/projetos/:id" element={<ProjetoDetalhe />} />
          <Route path="/contratos" element={<ContratosPage />} />
          <Route path="/custos" element={<CustosPage />} />
          <Route path="/cadastro" element={<CadastroPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
