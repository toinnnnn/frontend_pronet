import { useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useAtividades, useExcluirAtividade, useAtualizarAtividade } from '@/hooks/useProjetos'
import NovaAtividadeModal from './NovaAtividadeModal'
import type { Atividade } from '@/types/projeto'
import { formatDate } from '@/utils/formatters'

interface Props {
  projetoId: string
}

export default function AbaAtividades({ projetoId }: Props) {
  const [modalOpen, setModalOpen] = useState(false)
  const { data: atividades = [], isLoading } = useAtividades(projetoId)
  const excluirAtividade = useExcluirAtividade(projetoId)
  const atualizarAtividade = useAtualizarAtividade(projetoId)

  const handleProgresso = (atividade: Atividade, progresso: number) => {
    atualizarAtividade.mutate({ atividadeId: atividade.id, dados: { progresso } })
  }

  const handleExcluir = (id: string) => {
    if (confirm('Deseja excluir esta atividade?')) {
      excluirAtividade.mutate(id)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-end mb-4">
        <button onClick={() => setModalOpen(true)} className="btn-primary">
          <Plus size={16} />
          Atividade
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              <th className="text-left px-4 py-3 table-header">Atividade</th>
              <th className="text-left px-4 py-3 table-header">Responsável</th>
              <th className="text-left px-4 py-3 table-header">Início</th>
              <th className="text-left px-4 py-3 table-header">Término</th>
              <th className="text-left px-4 py-3 table-header">HH Plan.</th>
              <th className="text-left px-4 py-3 table-header w-40">Progresso</th>
              <th className="px-4 py-3 table-header w-20"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-text-muted text-sm">
                  Carregando atividades...
                </td>
              </tr>
            ) : atividades.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-text-muted text-sm">
                  Nenhuma atividade cadastrada. Clique em "+ Atividade" para começar.
                </td>
              </tr>
            ) : (
              atividades.map((atividade) => (
                <tr key={atividade.id} className="table-row">
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">{atividade.nome}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{atividade.responsavel || '—'}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{formatDate(atividade.dataInicio)}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{formatDate(atividade.dataTermino)}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{atividade.hhPlanejado}h</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={atividade.progresso}
                        onChange={(e) => handleProgresso(atividade, Number(e.target.value))}
                        className="w-24"
                      />
                      <span className="text-xs text-text-secondary w-8">{atividade.progresso}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-text-muted hover:text-primary transition-colors p-1 rounded">
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleExcluir(atividade.id)}
                        className="text-text-muted hover:text-danger transition-colors p-1 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <NovaAtividadeModal open={modalOpen} onClose={() => setModalOpen(false)} projetoId={projetoId} />
    </div>
  )
}
