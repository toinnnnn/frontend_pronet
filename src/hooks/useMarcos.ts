// hooks/useMarcos.ts
import { useQuery } from "@tanstack/react-query";
import { marcosService } from "@/services/marcos.service";

export function useMarcos(projetoId: number | string) {
  return useQuery({
    queryKey: ["marcos", projetoId],
    queryFn: () => marcosService.listar(projetoId),
    enabled: !!projetoId,
  });
}