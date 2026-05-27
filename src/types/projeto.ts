// ─── Projeto ────────────────────────────────────────────────────────────────

export type ProjetoStatus =
  | "planejado"
  | "em_execucao"
  | "concluido"
  | "suspenso";

// Dados que saem do formulário
export interface NovoProjeto {
  nome: string;
  data_inicio_planejada: string;
  data_fim_planejada: string;
  status: ProjetoStatus;
  numero_pedido: string;
  ART: string;
  data_inicio_real?: string;
  data_fim_real?: string;
}

export interface Projeto {
  id: number;
  nome: string;
  data_inicio_planejada: string;
  data_fim_planejada: string;
  numero_pedido: string;
  ART: string;
  status: ProjetoStatus;

  data_inicio_real: string;
  data_fim_real: string;

  createdAt?: string;
  updatedAt?: string;
}

// ─── Atividade ───────────────────────────────────────────────────────────────

export interface Atividade {
  id: string;
  projetoId: string;
  nome: string;
  responsavel?: string;
  dataInicio: string;
  dataTermino: string;
  hhPlanejado: number;
  hhReal: number;
  progresso: number; // 0-100
  dependenciaId?: string | null;
  materialPlanejado?: number;
  materialReal?: number;
  createdAt?: string;
}

export interface NovaAtividade {
  nome: string;
  responsavel?: string;
  dataInicio: string;
  dataTermino: string;
  hhPlanejado: number;
  hhReal: number;
  dependenciaId?: string | null;
}

// ─── Custos ──────────────────────────────────────────────────────────────────

export interface CustoAtividade {
  atividadeId: string;
  atividadeNome: string;
  materialPlanejado: number;
  materialReal: number;
  hhPlanejado: number;
  hhReal: number;
  desvio: number; // percentual
}
