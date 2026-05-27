import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'

import Modal from '@/components/ui/Modal'

import { useCriarContrato } from '@/hooks/useContratos'

import type { NovoContrato } from '@/types/contrato'

const schema = z.object({
  idCliente: z.coerce
    .number()
    .min(1, 'Cliente obrigatório'),

  escopo_contratual: z
    .string()
    .min(1, 'Escopo obrigatório'),

  valor_total: z.coerce.number(),

  data_inicio: z.string(),

  data_fim: z.string(),

  status_contratual: z.enum([
    'ativo',
    'encerrado',
    'suspenso',
    'em_negociacao',
  ]),
})

type FormData = z.infer<typeof schema>

interface Props {
  open: boolean
  onClose: () => void
}

export default function NovoContratoModal({
  open,
  onClose,
}: Props) {
  const criarContrato = useCriarContrato()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),

    defaultValues: {
      idCliente: 0,
      escopo_contratual: '',
      valor_total: 0,
      data_inicio: '',
      data_fim: '',
      status_contratual: 'ativo',
    },
  })

  const onSubmit = async (data: FormData) => {
    await criarContrato.mutateAsync(
      data as NovoContrato
    )

    reset()

    onClose()
  }

  const handleClose = () => {
    reset()

    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Novo Contrato"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <label>ID Cliente</label>

          <input
            type="number"
            {...register('idCliente')}
            className="input-field"
          />

          {errors.idCliente && (
            <p className="text-danger text-xs">
              {errors.idCliente.message}
            </p>
          )}
        </div>

        <div>
          <label>Escopo Contratual</label>

          <textarea
            {...register('escopo_contratual')}
            className="input-field"
          />

          {errors.escopo_contratual && (
            <p className="text-danger text-xs">
              {
                errors.escopo_contratual
                  .message
              }
            </p>
          )}
        </div>

        <div>
          <label>Valor Total</label>

          <input
            type="number"
            step="0.01"
            {...register('valor_total')}
            className="input-field"
          />

          {errors.valor_total && (
            <p className="text-danger text-xs">
              {errors.valor_total.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Data Início</label>

            <input
              type="date"
              {...register('data_inicio')}
              className="input-field"
            />
          </div>

          <div>
            <label>Data Fim</label>

            <input
              type="date"
              {...register('data_fim')}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label>Status</label>

          <select
            {...register('status_contratual')}
            className="input-field"
          >
            <option value="ativo">
              Ativo
            </option>

            <option value="encerrado">
              Encerrado
            </option>

            <option value="suspenso">
              Suspenso
            </option>

            <option value="em_negociacao">
              Em negociação
            </option>
          </select>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="btn-secondary"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary"
          >
            {isSubmitting
              ? 'Criando...'
              : 'Criar Contrato'}
          </button>
        </div>
      </form>
    </Modal>
  )
}