import api from './api'
import type { Projeto, NovoProjeto, Atividade, NovaAtividade } from '@/types/projeto'

// ─── Projetos ────────────────────────────────────────────────────────────────

export const projetosService = {
  listar: async (): Promise<Projeto[]> => {
    const { data } = await api.get('/projetos')
    return data
  },

  buscarPorId: async (id: string): Promise<Projeto> => {
    const { data } = await api.get(`/projetos/${id}`)
    return data
  },

  criar: async (projeto: NovoProjeto): Promise<Projeto> => {
    const { data } = await api.post('/projetos/criarProjetos', projeto)
    return data
  },

  atualizar: async (id: string, projeto: Partial<NovoProjeto>): Promise<Projeto> => {
    const { data } = await api.put(`/projetos/${id}`, projeto)
    return data
  },

  excluir: async (id: string): Promise<void> => {
    await api.delete(`/projetos/${id}`)
  },
}

// ─── Atividades ──────────────────────────────────────────────────────────────

export const atividadesService = {
  listar: async (projetoId: string): Promise<Atividade[]> => {
    const { data } = await api.get(`/projetos/${projetoId}/atividades`)
    return data
  },

  criar: async (projetoId: string, atividade: NovaAtividade): Promise<Atividade> => {
    const { data } = await api.post(`/projetos/${projetoId}/atividades`, atividade)
    return data
  },

  atualizar: async (
    projetoId: string,
    atividadeId: string,
    atividade: Partial<NovaAtividade & { progresso: number }>
  ): Promise<Atividade> => {
    const { data } = await api.put(
      `/projetos/${projetoId}/atividades/${atividadeId}`,
      atividade
    )
    return data
  },

  excluir: async (projetoId: string, atividadeId: string): Promise<void> => {
    await api.delete(`/projetos/${projetoId}/atividades/${atividadeId}`)
  },
}
