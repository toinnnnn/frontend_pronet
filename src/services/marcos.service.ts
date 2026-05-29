import api from "./api";

export interface Marco {
  id: number;
  data_prevista: string;
  data_real: string;
  descricao?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NovoMarco {
  data_prevista: string;
  data_real: string;
  descricao: string;
}

type ApiListResponse<T> = {
  data: T;
  total?: number;
  nPages?: number;
};

type ApiResponse<T> = {
  data: T;
  message?: string;
};

export const marcosService = {
  listar: async (): Promise<Marco[]> => {
    const response = await api.get<ApiListResponse<Marco[]>>(
      "/marco/listarMarco"
    );
    return response.data.data;
  },

  criar: async (marco: NovoMarco): Promise<Marco> => {
    const response = await api.post<ApiResponse<Marco>>(
      "/marco/criarMarco",
      marco
    );
    return response.data.data;
  },
};