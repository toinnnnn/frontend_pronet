// Resposta de GET /custos/atividade/:idAtividade
export interface CustosAtividade {
  idAtividade: number
  idProjeto: number
  nomeAtividade: string
  custoPlanejado: {
    materiais: number
    maoDeObra: number
    total: number
  }
  custoReal: {
    materiais: number
    maoDeObra: number
    total: number
  }
  desvio: {
    valor: number
    percentual: number
  }
}

// Resposta de GET /custos/projeto/:idProjeto
export interface CustosProjeto {
  idProjeto: number
  custoPlanejado: {
    materiais: number
    maoDeObra: number
    total: number
  }
  custoReal: {
    materiais: number
    maoDeObra: number
    total: number
  }
  desvio: {
    valor: number
    percentual: number
  }
}

// Para adicionar material planejado
export interface NovoMateriaisPlanejado {
  idMaterial: number
  quantidade_planejada: number
}

// Para adicionar perfil planejado (HH)
export interface NovoPerfilPlanejado {
  idPerfilColaborador: number
  hh_planejada: number
}