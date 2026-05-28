import { ClienteContrato } from "./cliente";

export type ContratoStatus =
  | "ativo"
  | "encerrado"
  | "suspenso"
  | "em_negociacao";

export interface Contrato {
  id: number;
  idCliente: number;
  escopo_contratual: string;
  valor_total: string;
  data_inicio: string;
  data_fim: string;
  status_contratual: string;
  cliente?: ClienteContrato;
  projetosContratos?: unknown[];
  createdAt?: string;
  updatedAt?: string;
}

export interface NovoContrato {
  idCliente: number;
  escopo_contratual: string;
  valor_total: number;
  data_inicio: string;
  data_fim: string;
  status_contratual: ContratoStatus;
}
