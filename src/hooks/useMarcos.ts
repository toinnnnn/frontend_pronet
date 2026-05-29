import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { marcosService } from "@/services/marcos.service";
import type { NovoMarco } from "@/services/marcos.service";

export function useMarcos() {
  return useQuery({
    queryKey: ["marcos"],
    queryFn: () => marcosService.listar(),
  });
}

export function useCriarMarco() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dados: NovoMarco) => marcosService.criar(dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marcos"] });
    },
  });
}