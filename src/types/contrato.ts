export type ContratoStatus =
  | 'ativo'
  | 'encerrado'
  | 'suspenso'
  | 'em_negociacao'

export interface Contrato {
  id: number
  idCliente: number
  escopo_contratual: string
  valor_total: number
  data_inicio: string
  data_fim: string
  status_contratual: ContratoStatus
  createdAt?: string
  updatedAt?: string
}

export interface NovoContrato {
  idCliente: number
  escopo_contratual: string
  valor_total: number
  data_inicio: string
  data_fim: string
  status_contratual: ContratoStatus
}