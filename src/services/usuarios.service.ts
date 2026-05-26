import api from './api'
import type { Usuario, NovoUsuario } from '@/types/usuario'

export const usuariosService = {
  listar: async (): Promise<Usuario[]> => {
    const { data } = await api.get('/usuarios')
    return data
  },

  buscarPorId: async (id: string): Promise<Usuario> => {
    const { data } = await api.get(`/usuarios/${id}`)
    return data
  },

  criar: async (usuario: NovoUsuario): Promise<Usuario> => {
    const { data } = await api.post('/usuarios', usuario)
    return data
  },

  atualizar: async (id: string, usuario: Partial<NovoUsuario>): Promise<Usuario> => {
    const { data } = await api.put(`/usuarios/${id}`, usuario)
    return data
  },

  excluir: async (id: string): Promise<void> => {
    await api.delete(`/usuarios/${id}`)
  },
}