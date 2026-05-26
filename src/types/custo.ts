export interface ItemMaterial {
  id: string
  atividadeId: string
  item: string
  unidade: string
  qtdPlanejada: number
  custoUnitPlan: number
  custoPlanTotal: number   // qtdPlanejada * custoUnitPlan
  custoReal: number
  variacao: number         // custoReal - custoPlanTotal
  createdAt?: string
}

export interface NovoItemMaterial {
  item: string
  unidade: string
  qtdPlanejada: number
  custoUnitPlan: number
  custoReal: number
}

export interface RecursoHH {
  id: string
  atividadeId: string
  funcao: string
  hhPlanejado: number
  custoPlanHH: number      // custo unitário planejado por HH
  hhReal: number
  custoRealHH: number      // custo unitário real por HH
  custoPlanTotal: number   // hhPlanejado * custoPlanHH
  custoRealTotal: number   // hhReal * custoRealHH
  variacao: number
  createdAt?: string
}

export interface NovoRecursoHH {
  funcao: string
  hhPlanejado: number
  custoPlanHH: number
  hhReal: number
  custoRealHH: number
}

export interface ResumoAtividadeCusto {
  atividadeId: string
  atividadeNome: string
  projetoNome: string
  matPlan: number
  matReal: number
  hhPlanValor: number
  hhRealValor: number
  totalPlan: number
  totalReal: number
  variacao: number
  variacaoPerc: number
  itens: ItemMaterial[]
  recursos: RecursoHH[]
}