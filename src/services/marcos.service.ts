// services/marcos.service.ts
import api from "./api";

export interface Marco {
  id: number;
  idProjeto: number;
  nome: string;
  descricao?: string;
  createdAt?: string;
  updatedAt?: string;
}

type ApiListResponse<T> = {
  data: T;
  total?: number;
  nPages?: number;
};

export const marcosService = {
  listar: async (projetoId: number | string): Promise<Marco[]> => {
    const response = await api.get<ApiListResponse<Marco[]>>(
      "/marcos/listarMarcos",
      {
        params: {
          idProjeto: projetoId,
        },
      },
    );

    return response.data.data;
  },
};
