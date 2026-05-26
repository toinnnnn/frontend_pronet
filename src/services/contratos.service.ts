import api from './api'
import type { Contrato, NovoContrato } from '@/types/contrato'

export const contratosService = {
  listar: async (): Promise<Contrato[]> => {
    const { data } = await api.get('/contratos')
    return data
  },

  buscarPorId: async (id: string): Promise<Contrato> => {
    const { data } = await api.get(`/contratos/${id}`)
    return data
  },

  criar: async (contrato: NovoContrato): Promise<Contrato> => {
    const { data } = await api.post('/contratos', contrato)
    return data
  },

  atualizar: async (id: string, contrato: Partial<NovoContrato>): Promise<Contrato> => {
    const { data } = await api.put(`/contratos/${id}`, contrato)
    return data
  },

  excluir: async (id: string): Promise<void> => {
    await api.delete(`/contratos/${id}`)
  },
}