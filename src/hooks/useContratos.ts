import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

import { contratosService } from '@/services/contratos.service'

import type { NovoContrato } from '@/types/contrato'

export function useContratos() {
  return useQuery({
    queryKey: ['contratos'],
    queryFn: contratosService.listar,
  })
}

export function useContrato(id: number) {
  return useQuery({
    queryKey: ['contrato', id],

    queryFn: () =>
      contratosService.buscarPorId(id),

    enabled: !!id,
  })
}

export function useCriarContrato() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (dados: NovoContrato) =>
      contratosService.criar(dados),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['contratos'],
      })
    },
  })
}