import api from "./api";
import type {
  Projeto,
  NovoProjeto,
  Atividade,
  NovaAtividade,
} from "@/types/projeto";

// ─── Projetos ────────────────────────────────────────────────────────────────

type ApiListResponse<T> = {
  data: T;
  total: number;
  nPages: number;
};

export const projetosService = {
  listar: async (): Promise<Projeto[]> => {
    const response = await api.get<ApiListResponse<Projeto[]>>(
      "/projetos/listarProjetos",
    );

    return response.data.data;
  },

  buscarPorId: async (id: string): Promise<Projeto> => {
    const response = await api.get(`/projetos/${id}`);
    return response.data.data;
  },

  criar: async (projeto: NovoProjeto): Promise<Projeto> => {
    const { data } = await api.post("/projetos/criarProjetos", projeto);
    return data;
  },

  atualizar: async (
    id: string,
    projeto: Partial<NovoProjeto>,
  ): Promise<Projeto> => {
    const { data } = await api.put(`/projetos/${id}`, projeto);
    return data;
  },

  excluir: async (id: string): Promise<void> => {
    await api.delete(`/projetos/${id}`);
  },
};

