import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Modal from '@/components/ui/Modal'
import { useCriarContrato } from '@/hooks/useContratos'
import type { NovoContrato } from '@/types/contrato'

const schema = z.object({
  numero: z.string().min(1, 'Número é obrigatório'),
  cliente: z.string().min(1, 'Cliente é obrigatório'),
  objeto: z.string().min(1, 'Objeto é obrigatório'),
  tipo: z.enum(['obra', 'servico', 'fornecimento', 'consultoria']),
  status: z.enum(['ativo', 'encerrado', 'suspenso', 'em_negociacao']),
  dataInicio: z.string().min(1, 'Data de início é obrigatória'),
  dataTermino: z.string().min(1, 'Data de término é obrigatória'),
  valorTotal: z.coerce.number().min(0),
  descricaoEscopo: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onClose: () => void
}

export default function NovoContratoModal({ open, onClose }: Props) {
  const criarContrato = useCriarContrato()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'ativo', tipo: 'obra', valorTotal: 0 },
  })

  const onSubmit = async (data: FormData) => {
    await criarContrato.mutateAsync(data as NovoContrato)
    reset()
    onClose()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Modal open={open} onClose={handleClose} title="Novo Contrato">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Número do Contrato <span className="text-danger">*</span>
            </label>
            <input {...register('numero')} className="input-field" placeholder="Ex: 001/2026" />
            {errors.numero && <p className="text-danger text-xs mt-1">{errors.numero.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Cliente <span className="text-danger">*</span>
            </label>
            <input {...register('cliente')} className="input-field" placeholder="Ex: Pronet" />
            {errors.cliente && <p className="text-danger text-xs mt-1">{errors.cliente.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Objeto do Contrato <span className="text-danger">*</span>
          </label>
          <textarea
            {...register('objeto')}
            rows={2}
            className="input-field resize-none"
            placeholder="Descreva o objeto do contrato..."
          />
          {errors.objeto && <p className="text-danger text-xs mt-1">{errors.objeto.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Tipo <span className="text-danger">*</span>
            </label>
            <select {...register('tipo')} className="input-field">
              <option value="obra">Obra</option>
              <option value="servico">Serviço</option>
              <option value="fornecimento">Fornecimento</option>
              <option value="consultoria">Consultoria</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Status</label>
            <select {...register('status')} className="input-field">
              <option value="ativo">Ativo</option>
              <option value="em_negociacao">Em Negociação</option>
              <option value="suspenso">Suspenso</option>
              <option value="encerrado">Encerrado</option>
            </select>
          </div>
        </div>

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

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Valor Total (R$) <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register('valorTotal')}
            className="input-field"
            placeholder="0,00"
          />
          {errors.valorTotal && <p className="text-danger text-xs mt-1">{errors.valorTotal.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">
            Descrição do Escopo
          </label>
          <textarea
            {...register('descricaoEscopo')}
            rows={3}
            className="input-field resize-none"
            placeholder="Detalhamento do escopo contratual..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={handleClose} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" disabled={isSubmitting} className="btn-primary">
            {isSubmitting ? 'Criando...' : 'Criar Contrato'}
          </button>
        </div>
      </form>
    </Modal>
  )
}