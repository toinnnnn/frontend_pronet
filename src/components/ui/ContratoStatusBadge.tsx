import type { ContratoStatus } from '@/types/contrato'

const config: Record<ContratoStatus, { label: string; className: string }> = {
  ativo: {
    label: 'Ativo',
    className: 'bg-green-50 text-green-700 border border-green-200',
  },
  encerrado: {
    label: 'Encerrado',
    className: 'bg-gray-100 text-gray-600 border border-gray-200',
  },
  suspenso: {
    label: 'Suspenso',
    className: 'bg-red-50 text-red-600 border border-red-200',
  },
  em_negociacao: {
    label: 'Em Negociação',
    className: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
}

interface Props {
  status: ContratoStatus
}

export default function ContratoStatusBadge({ status }: Props) {
  const { label, className } = config[status] ?? config.ativo
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}