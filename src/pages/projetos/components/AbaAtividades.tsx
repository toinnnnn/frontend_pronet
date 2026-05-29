import { useState } from "react";
import { Plus, Flag } from "lucide-react";
import { useAtividades } from "@/hooks/useAtividades";
import NovaAtividadeModal from "./NovaAtividadeModal";
import NovoMarcoModal from "./NovoMarcoModal";
import { formatDate } from "@/utils/formatters";

interface Props {
  projetoId: number | string;
}

export default function AbaAtividades({ projetoId }: Props) {
  const [modalAtividadeOpen, setModalAtividadeOpen] = useState(false);
  const [modalMarcoOpen, setModalMarcoOpen] = useState(false);

  const { data: atividades = [], isLoading, error } = useAtividades(projetoId);

  return (
    <div>
      {/* Botões no topo */}
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={() => setModalMarcoOpen(true)} className="btn-secondary flex items-center gap-1.5">
          <Flag size={16} />
          Marco
        </button>
        <button onClick={() => setModalAtividadeOpen(true)} className="btn-primary flex items-center gap-1.5">
          <Plus size={16} />
          Atividade
        </button>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              <th className="text-left px-4 py-3 table-header">Atividade</th>
              <th className="text-left px-4 py-3 table-header">Início Planejado</th>
              <th className="text-left px-4 py-3 table-header">Término Planejado</th>
              <th className="text-left px-4 py-3 table-header">Status</th>
              <th className="text-left px-4 py-3 table-header w-40">Progresso</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-text-muted text-sm">
                  Carregando atividades...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-danger text-sm">
                  Erro ao carregar atividades.
                </td>
              </tr>
            ) : atividades.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-text-muted text-sm">
                  Nenhuma atividade cadastrada. Clique em "+ Atividade" para começar.
                </td>
              </tr>
            ) : (
              atividades.map((atividade) => (
                <tr key={atividade.id} className="table-row">
                  <td className="px-4 py-3 text-sm font-medium text-text-primary">
                    {atividade.nome}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {formatDate(atividade.data_inicio_planejada)}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {formatDate(atividade.data_fim_planejada)}
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {atividade.status}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                        <div
                          className="bg-primary h-1.5 rounded-full transition-all"
                          style={{ width: `${Number(atividade.progresso ?? 0)}%` }}
                        />
                      </div>
                      <span className="text-xs text-text-secondary w-10">
                        {Number(atividade.progresso ?? 0)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <NovaAtividadeModal
        open={modalAtividadeOpen}
        onClose={() => setModalAtividadeOpen(false)}
        projetoId={String(projetoId)}
      />

      <NovoMarcoModal
        open={modalMarcoOpen}
        onClose={() => setModalMarcoOpen(false)}
      />
    </div>
  );
}