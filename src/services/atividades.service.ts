import api from "./api";
import type { Atividade, NovaAtividade } from "@/types/projeto";

type ApiListResponse<T> = {
  data: T;
  total?: number;
  nPages?: number;
};

type ApiResponse<T> = {
  data: T;
  message?: string;
};

export const atividadesService = {
  listar: async (projetoId: number | string): Promise<Atividade[]> => {
    const response = await api.get<ApiListResponse<Atividade[]>>(
      "/atividades/listarAtividades",
      {
        params: {
          idProjeto: projetoId,
        },
      },
    );

    return response.data.data;
  },

  criar: async (
    projetoId: number | string,
    atividade: NovaAtividade,
  ): Promise<Atividade> => {
    const response = await api.post<ApiResponse<Atividade>>(
      "/atividades/criarAtividade",
      {
        ...atividade,
        idProjeto: Number(projetoId),
      },
    );

    return response.data.data;
  },
};