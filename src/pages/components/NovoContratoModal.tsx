import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Modal from "@/components/ui/Modal";
import { useCriarContrato } from "@/hooks/useContratos";
import type { NovoContrato } from "@/types/contrato";
import { useClientes } from "@/hooks/useClientes";
import { useMemo, useState } from "react";

const schema = z.object({
  idCliente: z.coerce.number().min(1, "Cliente obrigatório"),

  escopo_contratual: z.string().min(1, "Escopo obrigatório"),

  valor_total: z.coerce.number(),

  data_inicio: z.string(),

  data_fim: z.string(),

  status_contratual: z.enum([
    "ativo",
    "encerrado",
    "suspenso",
    "em_negociacao",
  ]),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NovoContratoModal({ open, onClose }: Props) {
  const criarContrato = useCriarContrato();
  const { data: clientes = [] } = useClientes();
  const [clienteBusca, setClienteBusca] = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      idCliente: 0,
      escopo_contratual: "",
      valor_total: 0,
      data_inicio: "",
      data_fim: "",
      status_contratual: "ativo",
    },
  });

  const idClienteSelecionado = watch("idCliente");

  const clientesFiltrados = useMemo(() => {
    const termo = clienteBusca.toLowerCase().trim();

    if (!termo) return clientes.slice(0, 5);

    return clientes
      .filter((cliente) => cliente.nome.toLowerCase().includes(termo))
      .slice(0, 5);
  }, [clientes, clienteBusca]);

  const onSubmit = async (data: FormData) => {
    await criarContrato.mutateAsync(data as NovoContrato);

    reset();

    onClose();
  };

  const handleClose = () => {
    reset();

    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Novo Contrato">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <label>Cliente</label>

          <input
            type="text"
            value={clienteBusca}
            onChange={(event) => {
              setClienteBusca(event.target.value);
              setValue("idCliente", 0);
              setMostrarSugestoes(true);
            }}
            onFocus={() => setMostrarSugestoes(true)}
            className="input-field"
            placeholder="Digite o nome do cliente"
          />

          <input type="hidden" {...register("idCliente")} />

          {mostrarSugestoes && clienteBusca && clientesFiltrados.length > 0 && (
            <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md max-h-48 overflow-auto">
              {clientesFiltrados.map((cliente) => (
                <button
                  key={cliente.id}
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    setClienteBusca(cliente.nome);
                    setValue("idCliente", cliente.id, {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    setMostrarSugestoes(false);
                  }}
                >
                  {cliente.nome}
                </button>
              ))}
            </div>
          )}

          {mostrarSugestoes &&
            clienteBusca &&
            clientesFiltrados.length === 0 && (
              <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md px-3 py-2 text-sm text-text-muted">
                Nenhum cliente encontrado.
              </div>
            )}

          {idClienteSelecionado > 0 && (
            <p className="text-xs text-text-muted mt-1">
              Cliente selecionado: {clienteBusca}
            </p>
          )}

          {errors.idCliente && (
            <p className="text-danger text-xs mt-1">
              {errors.idCliente.message}
            </p>
          )}
        </div>

        <div>
          <label>Escopo Contratual</label>

          <textarea
            {...register("escopo_contratual")}
            className="input-field"
          />

          {errors.escopo_contratual && (
            <p className="text-danger text-xs">
              {errors.escopo_contratual.message}
            </p>
          )}
        </div>

        <div>
          <label>Valor Total</label>

          <input
            type="number"
            step="0.01"
            {...register("valor_total")}
            className="input-field"
          />

          {errors.valor_total && (
            <p className="text-danger text-xs">{errors.valor_total.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Data Início</label>

            <input
              type="date"
              {...register("data_inicio")}
              className="input-field"
            />
          </div>

          <div>
            <label>Data Fim</label>

            <input
              type="date"
              {...register("data_fim")}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label>Status</label>

          <select {...register("status_contratual")} className="input-field">
            <option value="ativo">Ativo</option>

            <option value="encerrado">Encerrado</option>

            <option value="suspenso">Suspenso</option>

            <option value="em_negociacao">Em negociação</option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button type="button" onClick={handleClose} className="btn-secondary">
            Cancelar
          </button>

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Criando..." : "Criar Contrato"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
