export interface ClienteContrato {
  id: number;
  nome: string;
  descricao?: string;
}

export interface NovoCliente {
  nome: string;
  descricao?: string;
  createdAt?: string;
  updatedAt?: string;
}
