import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Modal from "@/components/ui/Modal";
import { useCriarAtividade, useAtividades } from "@/hooks/useAtividades";
import type { NovaAtividade } from "@/types/projeto";
import { useState } from "react";
import { useMarcos, useCriarMarco } from "@/hooks/useMarcos";

const schema = z.object({
  idMarco: z.coerce.number().min(1, "Marco obrigatório"),
  nome: z.string().min(1, "Nome é obrigatório"),
  data_inicio_planejada: z.string().min(1, "Data de início planejada é obrigatória"),
  data_fim_planejada: z.string().min(1, "Data de término planejada é obrigatória"),
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

export default function NovaAtividadeModal({ open, onClose, projetoId }: Props) {
  const criarAtividade = useCriarAtividade(projetoId);
  const criarMarco = useCriarMarco();
  const { data: atividades = [] } = useAtividades(projetoId);
  const { data: marcos = [], isLoading: carregandoMarcos } = useMarcos();

  // Estado do mini-formulário de criar marco
  const [mostrarCriarMarco, setMostrarCriarMarco] = useState(false);
  const [novoMarco, setNovoMarco] = useState({
    descricao: "",
    data_prevista: "",
    data_real: "",
  });
  const [criandoMarco, setCriandoMarco] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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

  const handleCriarMarco = async () => {
    if (!novoMarco.descricao || !novoMarco.data_prevista || !novoMarco.data_real) {
      alert("Preencha todos os campos do marco.");
      return;
    }
    setCriandoMarco(true);
    try {
      const criado = await criarMarco.mutateAsync(novoMarco);
      setValue("idMarco", criado.id, { shouldValidate: true });
      setNovoMarco({ descricao: "", data_prevista: "", data_real: "" });
      setMostrarCriarMarco(false);
    } catch (e) {
      alert("Erro ao criar marco.");
    } finally {
      setCriandoMarco(false);
    }
  };

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
      dependencias: data.dependenciaId ? [Number(data.dependenciaId)] : [],
    };
    await criarAtividade.mutateAsync(payload);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    setMostrarCriarMarco(false);
    setNovoMarco({ descricao: "", data_prevista: "", data_real: "" });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Nova Atividade">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Nome <span className="text-danger">*</span>
          </label>
          <input {...register("nome")} className="input-field" placeholder="Ex: Fundação" />
          {errors.nome && <p className="text-danger text-xs mt-1">{errors.nome.message}</p>}
        </div>

        {/* Marco */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-text-primary">
              Marco <span className="text-danger">*</span>
            </label>
          
          </div>

          {/* Select de marcos existentes */}
          {!mostrarCriarMarco && (
            <select {...register("idMarco")} className="input-field">
              <option value={0}>
                {carregandoMarcos ? "Carregando..." : "Selecione um marco"}
              </option>
              {marcos.map((marco) => (
                <option key={marco.id} value={marco.id}>
                  {marco.descricao || `Marco #${marco.id}`} — {new Date(marco.data_prevista).toLocaleDateString("pt-BR")}
                </option>
              ))}
            </select>
          )}

          {/* Mini-form criar marco */}
          {mostrarCriarMarco && (
            <div className="border border-border rounded-md p-3 space-y-3 bg-gray-50">
              <div>
                <label className="block text-xs font-medium text-text-primary mb-1">Descrição</label>
                <input
                  type="text"
                  value={novoMarco.descricao}
                  onChange={(e) => setNovoMarco((p) => ({ ...p, descricao: e.target.value }))}
                  className="input-field"
                  placeholder="Ex: Marco de fundação"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-text-primary mb-1">Data Prevista</label>
                  <input
                    type="date"
                    value={novoMarco.data_prevista}
                    onChange={(e) => setNovoMarco((p) => ({ ...p, data_prevista: e.target.value }))}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-primary mb-1">Data Real</label>
                  <input
                    type="date"
                    value={novoMarco.data_real}
                    onChange={(e) => setNovoMarco((p) => ({ ...p, data_real: e.target.value }))}
                    className="input-field"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleCriarMarco}
                disabled={criandoMarco}
                className="btn-primary text-sm w-full"
              >
                {criandoMarco ? "Criando marco..." : "Salvar Marco"}
              </button>
            </div>
          )}

          {errors.idMarco && (
            <p className="text-danger text-xs mt-1">{errors.idMarco.message}</p>
          )}
        </div>

        {/* Datas planejadas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data Início Planejada <span className="text-danger">*</span>
            </label>
            <input type="date" {...register("data_inicio_planejada")} className="input-field" />
            {errors.data_inicio_planejada && (
              <p className="text-danger text-xs mt-1">{errors.data_inicio_planejada.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data Término Planejada <span className="text-danger">*</span>
            </label>
            <input type="date" {...register("data_fim_planejada")} className="input-field" />
            {errors.data_fim_planejada && (
              <p className="text-danger text-xs mt-1">{errors.data_fim_planejada.message}</p>
            )}
          </div>
        </div>

        {/* Progresso e Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Progresso</label>
            <input type="number" min="0" max="100" step="0.01" {...register("progresso")} className="input-field" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
            <select {...register("status")} className="input-field">
              <option value="planejada">Planejada</option>
              <option value="em_andamento">Em andamento</option>
              <option value="concluida">Concluída</option>
              <option value="suspensa">Suspensa</option>
            </select>
          </div>
        </div>

        {/* Datas reais */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Data Início Real</label>
            <input type="date" {...register("data_inicio_real")} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Data Término Real</label>
            <input type="date" {...register("data_fim_real")} className="input-field" />
          </div>
        </div>

        {/* Dependência */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Dependência</label>
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
          <button type="button" onClick={handleClose} className="btn-secondary">Cancelar</button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? "Criando..." : "Criar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}