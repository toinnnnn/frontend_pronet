export type ContratoStatus = 'ativo' | 'encerrado' | 'suspenso' | 'em_negociacao'
export type ContratoTipo = 'obra' | 'servico' | 'fornecimento' | 'consultoria'

export interface Contrato {
  id: string
  numero: string
  cliente: string
  objeto: string
  tipo: ContratoTipo
  status: ContratoStatus
  dataInicio: string
  dataTermino: string
  valorTotal: number
  descricaoEscopo?: string
  createdAt?: string
  updatedAt?: string
}

export interface NovoContrato {
  numero: string
  cliente: string
  objeto: string
  tipo: ContratoTipo
  status: ContratoStatus
  dataInicio: string
  dataTermino: string
  valorTotal: number
  descricaoEscopo?: string
}