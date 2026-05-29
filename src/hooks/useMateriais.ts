import { useQuery } from '@tanstack/react-query'
import { materiaisService } from '@/services/materiais.service'

export function useMateriais() {
  return useQuery({
    queryKey: ['materiais'],
    queryFn: materiaisService.listar,
  })
}