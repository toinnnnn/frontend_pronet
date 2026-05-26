import { useState } from 'react'
import { Plus, Shield, Briefcase, Wrench, Eye, UserCog } from 'lucide-react'
import { useUsuarios } from '@/hooks/useUsuarios'
import NovoUsuarioModal from '@/pages/components/NovoUsuarioModal'
import type { UsuarioPerfil } from '@/types/usuario'

const hierarquia = [
  { perfil: 'administrador' as UsuarioPerfil, label: 'Administrador', numero: 1, icon: <Shield size={12} />, className: 'bg-red-100 text-red-700 border border-red-200' },
  { perfil: 'gerente'       as UsuarioPerfil, label: 'Gerente',       numero: 2, icon: <UserCog size={12} />, className: 'bg-blue-100 text-blue-700 border border-blue-200' },
  { perfil: 'engenheiro'    as UsuarioPerfil, label: 'Engenheiro',    numero: 3, icon: <Briefcase size={12} />, className: 'bg-indigo-100 text-indigo-700 border border-indigo-200' },
  { perfil: 'tecnico'       as UsuarioPerfil, label: 'Técnico',       numero: 4, icon: <Wrench size={12} />, className: 'bg-green-100 text-green-700 border border-green-200' },
  { perfil: 'visitante'     as UsuarioPerfil, label: 'Visitante',     numero: 5, icon: <Eye size={12} />, className: 'bg-gray-100 text-gray-600 border border-gray-200' },
]

const perfilConfig: Record<UsuarioPerfil, { label: string; className: string }> = {
  administrador: { label: 'Administrador', className: 'bg-red-100 text-red-700 border border-red-200' },
  gerente:       { label: 'Gerente',       className: 'bg-blue-100 text-blue-700 border border-blue-200' },
  engenheiro:    { label: 'Engenheiro',    className: 'bg-indigo-100 text-indigo-700 border border-indigo-200' },
  tecnico:       { label: 'Técnico',       className: 'bg-green-100 text-green-700 border border-green-200' },
  visitante:     { label: 'Visitante',     className: 'bg-gray-100 text-gray-600 border border-gray-200' },
}

export default function CadastroPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const { data: usuarios = [], isLoading } = useUsuarios()

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Cadastro de Usuários</h1>
          <p className="text-text-secondary text-sm mt-0.5">Gerencie usuários, perfis e hierarquia de acesso</p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary">
          <Plus size={16} />
          Novo Usuário
        </button>
      </div>

      <div className="card p-4 mb-4">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-3">Hierarquia de Acesso</p>
        <div className="flex items-center gap-2 flex-wrap">
          {hierarquia.map((h) => (
            <div key={h.perfil} className="flex items-center gap-1.5">
              <span className="text-xs text-text-muted">#{h.numero}</span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${h.className}`}>
                {h.icon}
                {h.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              <th className="text-left px-5 py-3 table-header">Nome</th>
              <th className="text-left px-5 py-3 table-header">E-mail</th>
              <th className="text-left px-5 py-3 table-header">Perfil</th>
              <th className="text-left px-5 py-3 table-header">Função</th>
              <th className="text-left px-5 py-3 table-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-text-muted text-sm">Carregando...</td>
              </tr>
            ) : usuarios.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-text-muted text-sm">
                  Nenhum usuário cadastrado. Clique em "Novo Usuário" para começar.
                </td>
              </tr>
            ) : (
              usuarios.map((u) => (
                <tr key={u.id} className="table-row">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary text-xs font-semibold">
                          {u.nomeCompleto.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-text-primary">{u.nomeCompleto}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-text-secondary">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${perfilConfig[u.perfil].className}`}>
                      {perfilConfig[u.perfil].label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-text-secondary">{u.funcao}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      u.status === 'ativo'
                        ? 'bg-green-50 text-green-700 border border-green-200'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}>
                      {u.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <NovoUsuarioModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}