import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Modal from "@/components/ui/Modal";
import { useCriarProjeto } from "@/hooks/useProjetos";
import { useMemo, useState } from "react";
import { useContratos } from "@/hooks/useContratos";
const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  data_inicio_planejada: z.string().min(1, "Data de início é obrigatória"),
  data_fim_planejada: z.string().min(1, "Data de término é obrigatória"),
  status: z.enum(["planejado", "em_execucao", "concluido", "suspenso"]),
  numero_pedido: z.string().min(1, "O número do pedido é obrigatório"),
  ART: z.string().length(13, "A ART precisa ter 13 caracteres"),
  data_inicio_real: z
    .string()
    .min(1, "Data de início é obrigatória")
    .optional(),
  data_fim_real: z.string().min(1, "Data de término é obrigatória").optional(),
  contratos: z.array(z.number()).optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NovoProjetoModal({ open, onClose }: Props) {
  const criarProjeto = useCriarProjeto();
  const { data: contratosDisponiveis = [] } = useContratos();
  const [buscaContrato, setBuscaContrato] = useState("");
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
      status: "planejado",
      contratos: [],
    },
  });

  const contratosSelecionados = watch("contratos") ?? [];

  const contratosFiltrados = useMemo(() => {
    const termo = buscaContrato.toLowerCase().trim();

    return contratosDisponiveis
      .filter((contrato) => {
        const escopo = contrato.escopo_contratual?.toLowerCase() ?? "";
        const cliente = contrato.cliente?.nome?.toLowerCase() ?? "";
        const id = String(contrato.id);

        return (
          escopo.includes(termo) ||
          cliente.includes(termo) ||
          id.includes(termo)
        );
      })
      .filter((contrato) => !contratosSelecionados.includes(contrato.id))
      .slice(0, 5);
  }, [contratosDisponiveis, buscaContrato, contratosSelecionados]);

  const onSubmit = async (data: FormData) => {
    await criarProjeto.mutateAsync(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Novo Projeto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nome + Cliente */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Nome do Projeto <span className="text-danger">*</span>
            </label>
            <input
              {...register("nome")}
              className="input-field"
              placeholder="Ex: Obra Civil"
            />
            {errors.nome && (
              <p className="text-danger text-xs mt-1">{errors.nome.message}</p>
            )}
          </div>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            ART
          </label>
          <input
            {...register("ART")}
            minLength={13}
            maxLength={13}
            className="input-field resize-none"
            placeholder="Descrição resumida do projeto..."
          />
        </div>

        {/* Responsável + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Número do pedido
            </label>
            <input
              {...register("numero_pedido")}
              className="input-field"
              placeholder="Número do pedido"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Status
            </label>
            <select {...register("status")} className="input-field">
              <option value="planejado">Planejado</option>
              <option value="em_execucao">Em Execução</option>
              <option value="concluido">Concluído</option>
              <option value="suspenso">Suspenso</option>
            </select>
          </div>
        </div>

        {/* Datas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data de Início Planejada <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              {...register("data_inicio_planejada")}
              className="input-field"
            />
            {errors.data_inicio_planejada && (
              <p className="text-danger text-xs mt-1">
                {errors.data_inicio_planejada.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data de Término Planejada <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              {...register("data_fim_planejada")}
              className="input-field"
            />
            {errors.data_fim_planejada && (
              <p className="text-danger text-xs mt-1">
                {errors.data_fim_planejada.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data de Início Real <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              {...register("data_inicio_real")}
              className="input-field"
            />
            {errors.data_inicio_real && (
              <p className="text-danger text-xs mt-1">
                {errors.data_inicio_real.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data de Término Real <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              {...register("data_fim_real")}
              className="input-field"
            />
            {errors.data_fim_real && (
              <p className="text-danger text-xs mt-1">
                {errors.data_fim_real.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Contratos vinculados
            </label>

            <input
              type="text"
              value={buscaContrato}
              onChange={(event) => setBuscaContrato(event.target.value)}
              className="input-field"
              placeholder="Busque pelo escopo, cliente ou ID do contrato"
            />

            {buscaContrato && contratosFiltrados.length > 0 && (
              <div className="mt-2 rounded-md border bg-white shadow-sm max-h-48 overflow-auto">
                {contratosFiltrados.map((contrato) => (
                  <button
                    key={contrato.id}
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setValue(
                        "contratos",
                        [...contratosSelecionados, contrato.id],
                        {
                          shouldValidate: true,
                          shouldDirty: true,
                        },
                      );
                      setBuscaContrato("");
                    }}
                  >
                    <strong>#{contrato.id}</strong> —{" "}
                    {contrato.escopo_contratual}
                    {contrato.cliente?.nome && (
                      <span className="text-text-muted">
                        {" "}
                        / {contrato.cliente.nome}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {contratosSelecionados.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {contratosSelecionados.map((idContrato) => {
                  const contrato = contratosDisponiveis.find(
                    (item) => item.id === idContrato,
                  );

                  return (
                    <div
                      key={idContrato}
                      className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs"
                    >
                      <span>
                        #{idContrato}
                        {contrato?.escopo_contratual
                          ? ` - ${contrato.escopo_contratual}`
                          : ""}
                      </span>

                      <button
                        type="button"
                        className="text-danger"
                        onClick={() => {
                          setValue(
                            "contratos",
                            contratosSelecionados.filter(
                              (id) => id !== idContrato,
                            ),
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                            },
                          );
                        }}
                      >
                        remover
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/*        
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Custo Planejado (R$)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register('custoPlanejado')}
            className="input-field"
            placeholder="0,00"
          />
        </div> */}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={handleClose} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Criando..." : "Criar Projeto"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
