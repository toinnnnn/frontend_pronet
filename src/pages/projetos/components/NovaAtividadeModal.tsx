import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Modal from "@/components/ui/Modal";
import { useCriarAtividade, useAtividades } from "@/hooks/useAtividades";
import type { NovaAtividade } from "@/types/projeto";
import { useMemo, useState } from "react";
import { useMarcos } from "@/hooks/useMarcos";

const schema = z.object({
  idMarco: z.coerce.number().min(1, "Marco obrigatório"),

  nome: z.string().min(1, "Nome é obrigatório"),

  data_inicio_planejada: z
    .string()
    .min(1, "Data de início planejada é obrigatória"),

  data_fim_planejada: z
    .string()
    .min(1, "Data de término planejada é obrigatória"),

  progresso: z.coerce.number().min(0).max(100).optional(),

  status: z.enum(["planejada", "em_andamento", "concluida", "suspensa"]),

  data_inicio_real: z.string().optional(),

  data_fim_real: z.string().optional(),

  dependenciaId: z.string().optional().nullable(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
  projetoId: number | string;
}

export default function NovaAtividadeModal({
  open,
  onClose,
  projetoId,
}: Props) {
  const criarAtividade = useCriarAtividade(projetoId);
  const { data: atividades = [] } = useAtividades(projetoId);
  const { data: marcos = [] } = useMarcos(projetoId);
  const [buscaMarco, setBuscaMarco] = useState("");
  const [mostrarSugestoesMarco, setMostrarSugestoesMarco] = useState(false);

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
      idMarco: 0,
      nome: "",
      data_inicio_planejada: "",
      data_fim_planejada: "",
      progresso: 0,
      status: "planejada",
      data_inicio_real: "",
      data_fim_real: "",
      dependenciaId: null,
    },
  });

  const idMarcoSelecionado = watch("idMarco");

  const marcosFiltrados = useMemo(() => {
    const termo = buscaMarco.toLowerCase().trim();

    if (!termo) return marcos.slice(0, 5);

    return marcos
      .filter((marco) => marco.nome.toLowerCase().includes(termo))
      .slice(0, 5);
  }, [marcos, buscaMarco]);

  const onSubmit = async (data: FormData) => {
    const payload: NovaAtividade = {
      idMarco: data.idMarco,
      nome: data.nome,
      data_inicio_planejada: data.data_inicio_planejada,
      data_fim_planejada: data.data_fim_planejada,
      progresso: data.progresso ?? 0,
      status: data.status,
      data_inicio_real: data.data_inicio_real || null,
      data_fim_real: data.data_fim_real || null,

      // Seu backend espera dependencias?: number[]
      dependencias: data.dependenciaId ? [Number(data.dependenciaId)] : [],
    };

    await criarAtividade.mutateAsync(payload);

    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Nova Atividade">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Nome <span className="text-danger">*</span>
          </label>

          <input
            {...register("nome")}
            className="input-field"
            placeholder="Ex: Fundação"
          />

          {errors.nome && (
            <p className="text-danger text-xs mt-1">{errors.nome.message}</p>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-text-primary mb-1">
            Marco <span className="text-danger">*</span>
          </label>

          <input
            type="text"
            value={buscaMarco}
            onChange={(event) => {
              setBuscaMarco(event.target.value);
              setValue("idMarco", 0);
              setMostrarSugestoesMarco(true);
            }}
            onFocus={() => setMostrarSugestoesMarco(true)}
            className="input-field"
            placeholder="Digite o nome do marco"
          />

          <input type="hidden" {...register("idMarco")} />

          {mostrarSugestoesMarco &&
            buscaMarco &&
            marcosFiltrados.length > 0 && (
              <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md max-h-48 overflow-auto">
                {marcosFiltrados.map((marco) => (
                  <button
                    key={marco.id}
                    type="button"
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    onClick={() => {
                      setBuscaMarco(marco.nome);
                      setValue("idMarco", marco.id, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                      setMostrarSugestoesMarco(false);
                    }}
                  >
                    {marco.nome}
                  </button>
                ))}
              </div>
            )}

          {mostrarSugestoesMarco &&
            buscaMarco &&
            marcosFiltrados.length === 0 && (
              <div className="absolute z-50 mt-1 w-full rounded-md border bg-white shadow-md px-3 py-2 text-sm text-text-muted">
                Nenhum marco encontrado.
              </div>
            )}

          {idMarcoSelecionado > 0 && (
            <p className="text-xs text-text-muted mt-1">
              Marco selecionado: {buscaMarco}
            </p>
          )}

          {errors.idMarco && (
            <p className="text-danger text-xs mt-1">{errors.idMarco.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data Início Planejada <span className="text-danger">*</span>
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
              Data Término Planejada <span className="text-danger">*</span>
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Progresso
            </label>

            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              {...register("progresso")}
              className="input-field"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Status
            </label>

            <select {...register("status")} className="input-field">
              <option value="planejada">Planejada</option>
              <option value="em_andamento">Em andamento</option>
              <option value="concluida">Concluída</option>
              <option value="suspensa">Suspensa</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data Início Real
            </label>

            <input
              type="date"
              {...register("data_inicio_real")}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data Término Real
            </label>

            <input
              type="date"
              {...register("data_fim_real")}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Dependência
          </label>

          <select {...register("dependenciaId")} className="input-field">
            <option value="">Nenhuma</option>

            {atividades.map((atividade) => (
              <option key={atividade.id} value={atividade.id}>
                {atividade.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={handleClose} className="btn-secondary">
            Cancelar
          </button>

          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Criando..." : "Criar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
