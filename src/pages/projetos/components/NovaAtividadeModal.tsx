import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Modal from '@/components/ui/Modal'
import { useCriarAtividade, useAtividades } from '@/hooks/useProjetos'
import type { NovaAtividade } from '@/types/projeto'

const schema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  responsavel: z.string().optional(),
  hhPlanejado: z.coerce.number().min(0),
  dataInicio: z.string().min(1, 'Data de início é obrigatória'),
  dataTermino: z.string().min(1, 'Data de término é obrigatória'),
  hhReal: z.coerce.number().min(0),
  dependenciaId: z.string().optional().nullable(),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onClose: () => void
  projetoId: string
}

export default function NovaAtividadeModal({ open, onClose, projetoId }: Props) {
  const criarAtividade = useCriarAtividade(projetoId)
  const { data: atividades = [] } = useAtividades(projetoId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { hhPlanejado: 0, hhReal: 0, dependenciaId: null },
  })

  const onSubmit = async (data: FormData) => {
    await criarAtividade.mutateAsync(data as NovaAtividade)
    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Nova Atividade">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Nome <span className="text-danger">*</span>
          </label>
          <input {...register('nome')} className="input-field" placeholder="Ex: Criar tela de login" />
          {errors.nome && <p className="text-danger text-xs mt-1">{errors.nome.message}</p>}
        </div>

        {/* Responsável + HH Planejado */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Responsável</label>
            <input {...register('responsavel')} className="input-field" placeholder="Nome" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">HH Planejado</label>
            <input type="number" min="0" {...register('hhPlanejado')} className="input-field" placeholder="0" />
          </div>
        </div>

        {/* Datas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data Início <span className="text-danger">*</span>
            </label>
            <input type="date" {...register('dataInicio')} className="input-field" />
            {errors.dataInicio && <p className="text-danger text-xs mt-1">{errors.dataInicio.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Data Término <span className="text-danger">*</span>
            </label>
            <input type="date" {...register('dataTermino')} className="input-field" />
            {errors.dataTermino && <p className="text-danger text-xs mt-1">{errors.dataTermino.message}</p>}
          </div>
        </div>

        {/* HH Real + Dependência */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">HH Real</label>
            <input type="number" min="0" {...register('hhReal')} className="input-field" placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Dependência (atividade)</label>
            <select {...register('dependenciaId')} className="input-field">
              <option value="">Nenhuma</option>
              {atividades.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={handleClose} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? 'Criando...' : 'Criar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}
