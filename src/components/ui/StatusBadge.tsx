import type { ProjetoStatus } from '@/types/projeto'

const config: Record<ProjetoStatus, { label: string; className: string }> = {
  planejado: {
    label: 'Planejado',
    className: 'bg-blue-50 text-blue-700 border border-blue-200',
  },
  em_execucao: {
    label: 'Em Execução',
    className: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
  concluido: {
    label: 'Concluído',
    className: 'bg-green-50 text-green-700 border border-green-200',
  },
  suspenso: {
    label: 'Suspenso',
    className: 'bg-gray-100 text-gray-600 border border-gray-200',
  },
}

interface StatusBadgeProps {
  status: ProjetoStatus
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { label, className } = config[status] ?? config.planejado
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}
