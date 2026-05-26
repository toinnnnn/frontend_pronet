import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { custosService } from '@/services/custos.service'
import type { NovoItemMaterial, NovoRecursoHH } from '@/types/custo'

export function useItens(projetoId: string, atividadeId: string) {
  return useQuery({
    queryKey: ['itens', projetoId, atividadeId],
    queryFn: () => custosService.listarItens(projetoId, atividadeId),
    enabled: !!projetoId && !!atividadeId,
  })
}

export function useCriarItem(projetoId: string, atividadeId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dados: NovoItemMaterial) =>
      custosService.criarItem(projetoId, atividadeId, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itens', projetoId, atividadeId] })
    },
  })
}

export function useExcluirItem(projetoId: string, atividadeId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (itemId: string) =>
      custosService.excluirItem(projetoId, atividadeId, itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['itens', projetoId, atividadeId] })
    },
  })
}

export function useRecursos(projetoId: string, atividadeId: string) {
  return useQuery({
    queryKey: ['recursos', projetoId, atividadeId],
    enabled: !!projetoId && !!atividadeId,
    queryFn: () => custosService.listarRecursos(projetoId, atividadeId),
  })
}

export function useCriarRecurso(projetoId: string, atividadeId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (dados: NovoRecursoHH) =>
      custosService.criarRecurso(projetoId, atividadeId, dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recursos', projetoId, atividadeId] })
    },
  })
}

export function useExcluirRecurso(projetoId: string, atividadeId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (recursoId: string) =>
      custosService.excluirRecurso(projetoId, atividadeId, recursoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recursos', projetoId, atividadeId] })
    },
  })
}