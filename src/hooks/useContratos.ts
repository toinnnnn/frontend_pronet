import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { contratosService } from '@/services/contratos.service'
import type { NovoContrato } from '@/types/contrato'

export function useContratos() {
  return useQuery({
    queryKey: ['contratos'],
    queryFn: contratosService.listar,
  })
}

export function useContrato(id: string) {
  return useQuery({
    queryKey: ['contratos', id],
    queryFn: () => contratosService.buscarPorId(id),
    enabled: !!id,
  })
}

export function useCriarContrato() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dados: NovoContrato) => contratosService.criar(dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contratos'] })
    },
  })
}

export function useAtualizarContrato() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, dados }: { id: string; dados: Partial<NovoContrato> }) =>
      contratosService.atualizar(id, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contratos'] })
    },
  })
}

export function useExcluirContrato() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => contratosService.excluir(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contratos'] })
    },
  })
}