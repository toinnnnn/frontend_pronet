import api from './api'

import type {
  Contrato,
  NovoContrato,
} from '@/types/contrato'

export const contratosService = {
  listar: async (): Promise<Contrato[]> => {
    const { data } = await api.get(
      '/contrato/listarContratos'
    )

    return data
  },

  buscarPorId: async (
    id: number
  ): Promise<Contrato> => {
    const { data } = await api.get(
      `/contrato/${id}`
    )

    return data
  },

  criar: async (
    contrato: NovoContrato
  ): Promise<Contrato> => {
    const { data } = await api.post(
      '/contrato/criarContrato',
      contrato
    )

    return data
  },
}