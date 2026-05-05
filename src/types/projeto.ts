// ─── Projeto ────────────────────────────────────────────────────────────────

export type ProjetoStatus = 'planejado' | 'em_execucao' | 'concluido' | 'suspenso'

export interface Projeto {
  id: string
  nome: string
  cliente: string
  descricao?: string
  responsavel?: string
  status: ProjetoStatus
  dataInicio: string   // ISO date string
  dataTermino: string  // ISO date string
  custoPlanejado: number
  progresso: number    // 0-100
  atividades?: Atividade[]
  createdAt?: string
  updatedAt?: string
}

export interface NovoProjeto {
  nome: string
  cliente: string
  descricao?: string
  responsavel?: string
  status: ProjetoStatus
  dataInicio: string
  dataTermino: string
  custoPlanejado: number
}

// ─── Atividade ───────────────────────────────────────────────────────────────

export interface Atividade {
  id: string
  projetoId: string
  nome: string
  responsavel?: string
  dataInicio: string
  dataTermino: string
  hhPlanejado: number
  hhReal: number
  progresso: number   // 0-100
  dependenciaId?: string | null
  materialPlanejado?: number
  materialReal?: number
  createdAt?: string
}

export interface NovaAtividade {
  nome: string
  responsavel?: string
  dataInicio: string
  dataTermino: string
  hhPlanejado: number
  hhReal: number
  dependenciaId?: string | null
}

// ─── Custos ──────────────────────────────────────────────────────────────────

export interface CustoAtividade {
  atividadeId: string
  atividadeNome: string
  materialPlanejado: number
  materialReal: number
  hhPlanejado: number
  hhReal: number
  desvio: number // percentual
}
