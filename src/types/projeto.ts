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
  idProjeto: number;
  nome: string;
  descricao: string;
  status: ProjetoStatus;
  data_inicio: string;
  data_fim: string;
}

export interface NovaAtividade {
  idProjeto: number;
  nome: string;
  descricao: string;
  status: ProjetoStatus;
  data_inicio: string;
  data_fim: string;
}

// // ─── Custos ──────────────────────────────────────────────────────────────────

// export interface CustoAtividade {
//   atividadeId: string;
//   atividadeNome: string;
//   materialPlanejado: number;
//   materialReal: number;
//   hhPlanejado: number;
//   hhReal: number;
//   desvio: number; // percentual
// }
