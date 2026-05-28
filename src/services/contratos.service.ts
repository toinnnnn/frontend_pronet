import api from "./api";

import type { Contrato, NovoContrato } from "@/types/contrato";

type ApiListResponse<T> = {
  data: T;
  total: number;
  nPages: number;
};

export const contratosService = {
  listar: async (): Promise<Contrato[]> => {
    const response = await api.get<ApiListResponse<Contrato[]>>(
      "/contrato/listarContratos",
    );
    console.log("Resposta contratos:", response.data);
    console.log("Lista contratos:", response.data.data);
    return response.data.data;
  },

  buscarPorId: async (id: number): Promise<Contrato> => {
    const { data } = await api.get(`/contrato/${id}`);

    return data;
  },

  criar: async (contrato: NovoContrato): Promise<Contrato> => {
    const { data } = await api.post("/contrato/criarContrato", contrato);

    return data;
  },
};
