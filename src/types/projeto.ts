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
  id: number;
  idProjeto: number;
  idMarco: number;
  nome: string;
  data_inicio_planejada: string;
  data_fim_planejada: string;
  progresso: number;
  status: string;
  data_inicio_real?: string | null;
  data_fim_real?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface NovaAtividade {
  idMarco: number;
  nome: string;
  data_inicio_planejada: string;
  data_fim_planejada: string;
  progresso?: number;
  status: string;
  data_inicio_real?: string | null;
  data_fim_real?: string | null;
  dependencias?: number[];
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
