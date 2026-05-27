import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Modal from "@/components/ui/Modal";
import { useCriarProjeto } from "@/hooks/useProjetos";
import type { NovoProjeto, Projeto } from "@/types/projeto";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  data_inicio_planejada: z.string().min(1, "Data de início é obrigatória"),
  data_fim_planejada: z.string().min(1, "Data de término é obrigatória"),
  status: z.enum(["planejado", "em_execucao", "concluido", "suspenso"]),
  numero_pedido: z.string().min(1, "O número do pedido é obrigatório"),
  ART: z.string().length(13, "A ART precisa ter 13 caracteres"),
  data_inicio_real: z.string().min(1, "Data de início é obrigatória"),
  data_fim_real: z.string().min(1, "Data de término é obrigatória"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NovoProjetoModal({ open, onClose }: Props) {
  const criarProjeto = useCriarProjeto();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
   
  });

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
