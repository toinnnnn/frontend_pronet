import { useQuery } from "@tanstack/react-query";
import { clientesService } from "@/services/clientes.service";

export function useClientes() {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: clientesService.listar,
  });
}
