import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil } from "lucide-react";
import { useProjeto, useProjetoFind } from "@/hooks/useProjetos";
import StatusBadge from "@/components/ui/StatusBadge";
import AbaAtividades from "./components/AbaAtividades";
import AbaGantt from "./components/AbaGantt";
import AbaCustos from "./components/AbaCustos";
import { formatDateRange } from "@/utils/formatters";

type Tab = "atividades" | "gantt" | "custos";

const tabs: { key: Tab; label: string }[] = [
  { key: "atividades", label: "Atividades" },
  { key: "gantt", label: "Gantt" },
  { key: "custos", label: "Custos" },
];

export default function ProjetoDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState<Tab>("atividades");
  const { data: projeto, isLoading, error } = useProjetoFind(id!);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-text-muted text-sm">Carregando projeto...</p>
      </div>
    );
  }

  if (error || !projeto) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <p className="text-danger text-sm">Projeto não encontrado.</p>
        <button onClick={() => navigate("/projetos")} className="btn-secondary">
          Voltar para Projetos
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-3">
          <button
            onClick={() => navigate("/projetos")}
            className="mt-0.5 text-text-muted hover:text-text-primary transition-colors p-1 rounded-md hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-text-primary">
                {projeto.nome}
              </h1>
              <StatusBadge status={projeto.status} />
            </div>
            <p className="text-text-secondary text-xs mt-1 flex gap-3">
              <span>
                Data Planejada:{" "}
                {formatDateRange(
                  projeto.data_inicio_planejada,
                  projeto.data_fim_planejada,
                )}
              </span>
              <span>
                Data Real:{" "}
                {formatDateRange(
                  projeto.data_inicio_real,
                  projeto.data_fim_real,
                )}
              </span>
              <span>
                Número do pedido:{" "}
                <strong className="text-text-primary">
                  {projeto.numero_pedido}
                </strong>
              </span>
              {projeto.ART && (
                <span>
                  ART:{" "}
                  <strong className="text-text-primary">{projeto.ART}</strong>
                </span>
              )}
            </p>
          </div>
        </div>

        <button className="text-text-muted hover:text-primary transition-colors p-2 rounded-md hover:bg-gray-100">
          <Pencil size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border mb-6">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setAbaAtiva(key)}
            className={`pb-2.5 text-sm transition-colors ${
              abaAtiva === key ? "tab-active" : "tab-inactive"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {abaAtiva === "atividades" && <AbaAtividades projetoId={projeto.id} />}
      {abaAtiva === "gantt" && <AbaGantt projeto={projeto} />}
      {abaAtiva === "custos" && <AbaCustos projeto={projeto} />}
    </div>
  );
}
