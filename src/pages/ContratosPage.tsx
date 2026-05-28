import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { useContratos } from "@/hooks/useContratos";
import ContratoStatusBadge from "@/components/ui/ContratoStatusBadge";
import NovoContratoModal from "./components/NovoContratoModal";
import { formatCurrency, formatDateRange } from "@/utils/formatters";

const tipoLabels: Record<string, string> = {
  obra: "Obra",
  servico: "Serviço",
  fornecimento: "Fornecimento",
  consultoria: "Consultoria",
};

export default function ContratosPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const { data: contratos = [], isLoading, error } = useContratos();

  const contratosFiltrados = contratos.filter((contrato) => {
    const termo = busca.toLowerCase();

    const escopo = contrato.escopo_contratual?.toLowerCase() ?? "";
    const cliente = contrato.cliente?.nome?.toLowerCase() ?? "";
    const status = contrato.status_contratual?.toLowerCase() ?? "";
    const numero = String(contrato.id ?? "");

    return (
      escopo.includes(termo) ||
      cliente.includes(termo) ||
      status.includes(termo) ||
      numero.includes(termo)
    );
  });

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Contratos</h1>
          <p className="text-text-secondary text-sm mt-0.5">
            Gestão de contratos e vigências
          </p>
        </div>
        <button onClick={() => setModalOpen(true)} className="btn-primary">
          <Plus size={16} />
          Novo Contrato
        </button>
      </div>

      <div className="relative mb-4 w-72">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar contratos..."
          className="input-field pl-9"
        />
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-gray-50/50">
              <th className="text-left px-5 py-3 table-header">Cliente</th>
              <th className="text-left px-5 py-3 table-header">Tipo</th>
              <th className="text-left px-5 py-3 table-header">Vigência</th>
              <th className="text-left px-5 py-3 table-header">Valor</th>
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
                  Carregando contratos...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-danger text-sm"
                >
                  Erro ao carregar contratos. Verifique a conexão com o
                  servidor.
                </td>
              </tr>
            ) : contratosFiltrados.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-10 text-text-muted text-sm"
                >
                  {busca
                    ? "Nenhum contrato encontrado."
                    : "Nenhum contrato cadastrado ainda."}
                </td>
              </tr>
            ) : (
              contratosFiltrados.map((contrato) => (
                <tr key={contrato.id} className="table-row">
                  <td className="px-5 py-3.5 text-sm text-text-secondary">
                    {contrato.cliente?.nome}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-text-secondary">
                    {[contrato.escopo_contratual]}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-text-secondary">
                    {formatDateRange(contrato.data_inicio, contrato.data_fim)}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-text-secondary font-mono">
                    {contrato.valor_total}
                  </td>
                  <td className="px-5 py-3.5">
                    <ContratoStatusBadge status={contrato.status_contratual} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <NovoContratoModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
