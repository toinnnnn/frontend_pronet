import api from './api'
import type { CustosAtividade, CustosProjeto, NovoMateriaisPlanejado, NovoPerfilPlanejado } from '@/types/custo'

type ApiResponse<T> = { data: T }

export const custosService = {
  buscarPorAtividade: async (idAtividade: number | string): Promise<CustosAtividade> => {
    const { data } = await api.get<ApiResponse<CustosAtividade>>(`/custos/atividade/${idAtividade}`)
    return data.data
  },

  buscarPorProjeto: async (idProjeto: number | string): Promise<CustosProjeto> => {
    const { data } = await api.get<ApiResponse<CustosProjeto>>(`/custos/projeto/${idProjeto}`)
    return data.data
  },

  adicionarMaterialPlanejado: async (idAtividade: number | string, dados: NovoMateriaisPlanejado): Promise<void> => {
    await api.post(`/atividades/${idAtividade}/materiaisPlanejado`, dados)
  },

  adicionarPerfilPlanejado: async (idAtividade: number | string, dados: NovoPerfilPlanejado): Promise<void> => {
    await api.post(`/atividades/${idAtividade}/perfisPlanejado`, dados)
  },
}