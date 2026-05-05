import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Modal from '@/components/ui/Modal'
import { useCriarProjeto } from '@/hooks/useProjetos'
import type { NovoProjeto } from '@/types/projeto'

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  cliente: z.string().min(1, 'Cliente é obrigatório'),
  descricao: z.string().optional(),
  responsavel: z.string().optional(),
  status: z.enum(['planejado', 'em_execucao', 'concluido', 'suspenso']),
  dataInicio: z.string().min(1, 'Data de início é obrigatória'),
  dataTermino: z.string().min(1, 'Data de término é obrigatória'),
  custoPlanejado: z.coerce.number().min(0),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onClose: () => void
}

export default function NovoProjetoModal({ open, onClose }: Props) {
  const criarProjeto = useCriarProjeto()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'planejado', custoPlanejado: 0 },
  })

  const onSubmit = async (data: FormData) => {
    await criarProjeto.mutateAsync(data as NovoProjeto)
    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Novo Projeto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nome + Cliente */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Nome do Projeto <span className="text-danger">*</span>
            </label>
            <input {...register('nome')} className="input-field" placeholder="Ex: Obra Civil" />
            {errors.nome && <p className="text-danger text-xs mt-1">{errors.nome.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Cliente <span className="text-danger">*</span>
            </label>
            <input {...register('cliente')} className="input-field" placeholder="Ex: Pronet" />
            {errors.cliente && <p className="text-danger text-xs mt-1">{errors.cliente.message}</p>}
          </div>
        </div>

        {/* Descrição */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Descrição</label>
          <textarea
            {...register('descricao')}
            rows={3}
            className="input-field resize-none"
            placeholder="Descrição resumida do projeto..."
          />
        </div>

        {/* Responsável + Status */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Responsável</label>
            <input {...register('responsavel')} className="input-field" placeholder="Nome do responsável" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
            <select {...register('status')} className="input-field">
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
              Data de Início <span className="text-danger">*</span>
            </label>
            <input type="date" {...register('dataInicio')} className="input-field" />
            {errors.dataInicio && <p className="text-danger text-xs mt-1">{errors.dataInicio.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data de Término <span className="text-danger">*</span>
            </label>
            <input type="date" {...register('dataTermino')} className="input-field" />
            {errors.dataTermino && <p className="text-danger text-xs mt-1">{errors.dataTermino.message}</p>}
          </div>
        </div>

        {/* Custo */}
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
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={handleClose} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? 'Criando...' : 'Criar Projeto'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
