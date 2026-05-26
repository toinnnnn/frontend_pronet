import api from './api'
import type { ItemMaterial, NovoItemMaterial, RecursoHH, NovoRecursoHH } from '@/types/custo'

export const custosService = {
  // Itens de Material
  listarItens: async (projetoId: string, atividadeId: string): Promise<ItemMaterial[]> => {
    const { data } = await api.get(`/projetos/${projetoId}/atividades/${atividadeId}/itens`)
    return data
  },

  criarItem: async (
    projetoId: string,
    atividadeId: string,
    item: NovoItemMaterial
  ): Promise<ItemMaterial> => {
    const { data } = await api.post(
      `/projetos/${projetoId}/atividades/${atividadeId}/itens`,
      item
    )
    return data
  },

  excluirItem: async (
    projetoId: string,
    atividadeId: string,
    itemId: string
  ): Promise<void> => {
    await api.delete(`/projetos/${projetoId}/atividades/${atividadeId}/itens/${itemId}`)
  },

  // Recursos Humanos (HH)
  listarRecursos: async (projetoId: string, atividadeId: string): Promise<RecursoHH[]> => {
    const { data } = await api.get(`/projetos/${projetoId}/atividades/${atividadeId}/recursos`)
    return data
  },

  criarRecurso: async (
    projetoId: string,
    atividadeId: string,
    recurso: NovoRecursoHH
  ): Promise<RecursoHH> => {
    const { data } = await api.post(
      `/projetos/${projetoId}/atividades/${atividadeId}/recursos`,
      recurso
    )
    return data
  },

  excluirRecurso: async (
    projetoId: string,
    atividadeId: string,
    recursoId: string
  ): Promise<void> => {
    await api.delete(
      `/projetos/${projetoId}/atividades/${atividadeId}/recursos/${recursoId}`
    )
  },
}