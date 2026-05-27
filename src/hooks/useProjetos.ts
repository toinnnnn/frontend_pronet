import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  NovoProjeto,
  NovaAtividade,
  Projeto,
  Atividade,
} from "@/types/projeto";
import { mockProjetos, mockAtividades } from "@/mocks/data";
import { projetosService } from "@/services/projetos.service";

// ─── Estado em memória ───────────────────────────────────────────────────────
let projetos: Projeto[] = structuredClone(mockProjetos);
let atividades: Atividade[] = structuredClone(mockAtividades);

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));
const gerarId = () => Math.random().toString(36).slice(2, 9);

// ─── Projetos ────────────────────────────────────────────────────────────────

export function useProjeto() {
  return useQuery({
    queryKey: ["projetos"],
    queryFn: async () => {
      await delay();
      return [...projetos];
    },
  });
}

export function useCriarProjeto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dados: NovoProjeto) => projetosService.criar(dados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projetos"] });
    },
  });
}

// export function useProjeto() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (dados: NovoProjeto) => {
//       await delay();
//       const novo: Projeto = { ...dados, id: gerarId(), progresso: 0 };
//       projetos = [...projetos, novo];
//       return novo;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["projetos"] });
//     },
//   });
// }

// export function useExcluirProjeto() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (id: string) => {
//       await delay();
//       projetos = projetos.filter((p) => p.id !== id);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["projetos"] });
//     },
//   });
// }

// ─── Atividades ──────────────────────────────────────────────────────────────

export function useAtividades(projetoId: string) {
  return useQuery({
    queryKey: ["atividades", projetoId],
    queryFn: async () => {
      await delay();
      return atividades.filter((a) => a.projetoId === projetoId);
    },
    enabled: !!projetoId,
  });
}

export function useCriarAtividade(projetoId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (dados: NovaAtividade) => {
      await delay();
      const nova: Atividade = {
        ...dados,
        id: gerarId(),
        projetoId,
        progresso: 0,
        materialPlanejado: 0,
        materialReal: 0,
      };
      atividades = [...atividades, nova];
      return nova;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades", projetoId] });
      queryClient.invalidateQueries({ queryKey: ["projetos", projetoId] });
    },
  });
}

export function useAtualizarAtividade(projetoId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      atividadeId,
      dados,
    }: {
      atividadeId: string;
      dados: Partial<NovaAtividade & { progresso: number }>;
    }) => {
      await delay();
      atividades = atividades.map((a) =>
        a.id === atividadeId ? { ...a, ...dados } : a,
      );
      return atividades.find((a) => a.id === atividadeId)!;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades", projetoId] });
      queryClient.invalidateQueries({ queryKey: ["projetos", projetoId] });
    },
  });
}

export function useExcluirAtividade(projetoId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (atividadeId: string) => {
      await delay();
      atividades = atividades.filter((a) => a.id !== atividadeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["atividades", projetoId] });
    },
  });
}
