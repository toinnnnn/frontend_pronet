import api from "./api";

import type { ClienteContrato } from "@/types/cliente";

type ApiListResponse<T> = {
  data: T;
  total: number;
  nPages: number;
};

export const clientesService = {
  listar: async (): Promise<ClienteContrato[]> => {
    const response =
      await api.get<ApiListResponse<ClienteContrato[]>>("/cliente/");
    console.log("Resposta contratos:", response.data);
    console.log("Lista contratos:", response.data.data);
    return response.data.data;
  },

  //   buscarPorId: async (id: number): Promise<ClienteContrato> => {
  //     const { data } = await api.get(`/contrato/${id}`);

  //     return data;
  //   },

  //   criar: async (contrato: ClienteContrato): Promise<ClienteContrato> => {
  //     const { data } = await api.post("/contrato/criarContrato", contrato);

  //     return data;
  //   },
};
