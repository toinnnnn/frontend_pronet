import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import { useProjeto } from "@/hooks/useProjetos";
import StatusBadge from "@/components/ui/StatusBadge";
import NovoProjetoModal from "./components/NovoProjetoModal";
import { formatDateRange } from "@/utils/formatters";

export default function ProjetosPage() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const { data: projetos = [], isLoading, error } = useProjeto();

  const projetosFiltrados = useMemo(() => {
    const q = busca.toLowerCase();
    return projetos.filter(
      (p) =>
        p.nome.toLowerCase().includes(q) 
    );
  }, [projetos, busca]);

  return (
    <div>
      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Projetos</h1>
          <p className="text-text-secondary text-sm mt-0.5">
            Gestão completa dos projetos de engenharia
          </p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary">
          <Plus size={16} />
          Novo Projeto
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 w-72">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar projetos..."
          className="input-field pl-9"
        />
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              <th className="text-left px-5 py-3 table-header">Projeto</th>
              <th className="text-left px-5 py-3 table-header">Data planejada</th>
              <th className="text-left px-5 py-3 table-header">Data Real</th>
              <th className="text-left px-5 py-3 table-header">Número do pedido.</th>
              <th className="text-left px-5 py-3 table-header">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-text-muted text-sm"
                >
                  Carregando projetos...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-danger text-sm"
                >
                  Erro ao carregar projetos. Verifique a conexão com o servidor.
                </td>
              </tr>
            ) : projetosFiltrados.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-text-muted text-sm"
                >
                  {busca
                    ? "Nenhum projeto encontrado."
                    : "Nenhum projeto cadastrado ainda."}
                </td>
              </tr>
            ) : (
              projetosFiltrados.map((projeto) => (
                <tr
                  key={projeto.id}
                  className="table-row cursor-pointer"
                  onClick={() => navigate(`/projetos/${projeto.id}`)}
                >
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-text-primary hover:text-primary transition-colors">
                      {projeto.nome}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-text-secondary">
                    {formatDateRange(
                      projeto.data_inicio_planejada,
                      projeto.data_fim_planejada,
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-text-secondary">
                    {formatDateRange(
                      projeto.data_inicio_real,
                      projeto.data_fim_real,
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-text-secondary font-mono">
                    {projeto.numero_pedido}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={projeto.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <NovoProjetoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
