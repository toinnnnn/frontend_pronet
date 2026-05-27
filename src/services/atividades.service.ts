import api from "./api";

import type { NovaAtividade, Atividade } from "@/types/projeto";

export const atividadesService = {
  listar: async (): Promise<Atividade[]> => {
    const { data } = await api.get("/contrato/listarContratos");

    return data;
  },

  buscarPorId: async (id: number): Promise<Atividade> => {
    const { data } = await api.get(`/contrato/${id}`);

    return data;
  },

  criar: async (novaAtividade: NovaAtividade): Promise<Atividade> => {
    const { data } = await api.post("/contrato/criarContrato", novaAtividade);

    return data;
  },
};
