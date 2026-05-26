import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Modal from '@/components/ui/Modal'
import { useCriarItem } from '@/hooks/useCustos'

const schema = z.object({
  item: z.string().min(1, 'Item é obrigatório'),
  unidade: z.string().min(1, 'Unidade é obrigatória'),
  qtdPlanejada: z.coerce.number().min(0),
  custoUnitPlan: z.coerce.number().min(0),
  custoReal: z.coerce.number().min(0),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onClose: () => void
  projetoId: string
  atividadeId: string
}

export default function AdicionarItemModal({ open, onClose, projetoId, atividadeId }: Props) {
  const criarItem = useCriarItem(projetoId, atividadeId)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { qtdPlanejada: 0, custoUnitPlan: 0, custoReal: 0 },
  })

  const onSubmit = async (data: FormData) => {
    await criarItem.mutateAsync(data)
    reset()
    onClose()
  }

  const handleClose = () => { reset(); onClose() }

  return (
    <Modal open={open} onClose={handleClose} title="Adicionar Item de Material">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Item <span className="text-danger">*</span>
            </label>
            <input {...register('item')} className="input-field" placeholder="Ex: Cabo 6mm" />
            {errors.item && <p className="text-danger text-xs mt-1">{errors.item.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Unidade</label>
            <input {...register('unidade')} className="input-field" placeholder="m², kg..." />
            {errors.unidade && <p className="text-danger text-xs mt-1">{errors.unidade.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Qtd. Planejada</label>
            <input type="number" step="0.01" min="0" {...register('qtdPlanejada')} className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Custo Unit. Plan. (R$)</label>
            <input type="number" step="0.01" min="0" {...register('custoUnitPlan')} className="input-field" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Custo Real (R$)</label>
          <input type="number" step="0.01" min="0" {...register('custoReal')} className="input-field" />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={handleClose} className="btn-secondary">Cancelar</button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  )
}