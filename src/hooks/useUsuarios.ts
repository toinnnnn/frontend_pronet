import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usuariosService } from '@/services/usuarios.service'
import type { NovoUsuario } from '@/types/usuario'

export function useUsuarios() {
  return useQuery({
    queryKey: ['usuarios'],
    queryFn: usuariosService.listar,
  })
}

export function useCriarUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dados: NovoUsuario) => usuariosService.criar(dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}

export function useAtualizarUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dados }: { id: string; dados: Partial<NovoUsuario> }) =>
      usuariosService.atualizar(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}

export function useExcluirUsuario() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => usuariosService.excluir(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] })
    },
  })
}