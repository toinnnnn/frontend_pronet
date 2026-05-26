import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { FolderOpen, FileText, DollarSign, TrendingUp } from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { useProjetos } from '@/hooks/useProjetos'
import StatusBadge from '@/components/ui/StatusBadge'
import { formatCurrency } from '@/utils/formatters'

// ─── Dados fictícios para os gráficos ───────────────────────────────────────

const dadosGrafico1 = [
  { dia: 'Dom',      planejado: 120, realizado: 100 },
  { dia: 'Seg/Ter',  planejado: 200, realizado: 150 },
  { dia: 'Ter/Qua',  planejado: 280, realizado: 240 },
  { dia: 'Qua/Qui',  planejado: 320, realizado: 290 },
  { dia: 'Qui/Sex',  planejado: 260, realizado: 300 },
  { dia: 'Sex/Sáb',  planejado: 310, realizado: 330 },
  { dia: 'Sáb',      planejado: 350, realizado: 320 },
]

const dadosGrafico2 = [
  { dia: 'Dom',      planejado: 100, realizado: 90  },
  { dia: 'Seg/Ter',  planejado: 180, realizado: 130 },
  { dia: 'Ter/Qua',  planejado: 260, realizado: 200 },
  { dia: 'Qua/Qui',  planejado: 300, realizado: 270 },
  { dia: 'Qui/Sex',  planejado: 240, realizado: 280 },
  { dia: 'Sex/Sáb',  planejado: 290, realizado: 310 },
  { dia: 'Sáb',      planejado: 330, realizado: 300 },
]

// ─── Subcomponentes ──────────────────────────────────────────────────────────

interface StatCardProps {
  label: string
  value: string | number
  sub?: string
  subColor?: string
  icon: React.ReactNode
  iconBg: string
}

function StatCard({ label, value, sub, subColor, icon, iconBg }: StatCardProps) {
  return (
    <div className="card px-5 py-4 flex items-start justify-between gap-4">
      <div>
        <p className="text-[10px] font-semibold text-text-secondary uppercase tracking-widest mb-1.5">
          {label}
        </p>
        <p className="text-2xl font-bold text-text-primary leading-none">{value}</p>
        {sub && (
          <p className={`text-xs mt-1.5 ${subColor ?? 'text-text-muted'}`}>{sub}</p>
        )}
      </div>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        {icon}
      </div>
    </div>
  )
}

interface MiniChartProps {
  data: typeof dadosGrafico1
}

function MiniChart({ data }: MiniChartProps) {
  return (
    <div className="flex-1 min-w-0">
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} margin={{ top: 8, right: 8, left: -28, bottom: 0 }}>
          <XAxis
            dataKey="dia"
            tick={{ fontSize: 9, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 9, fill: '#9ca3af' }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              fontSize: 11,
              borderRadius: 8,
              border: '1px solid #e5e7eb',
              boxShadow: '0 2px 8px rgba(0,0,0,.08)',
            }}
            labelStyle={{ fontWeight: 600 }}
          />
          <Legend
            iconType="circle"
            iconSize={6}
            wrapperStyle={{ fontSize: 10, paddingTop: 4 }}
            formatter={(value) => (
              <span style={{ color: '#6b7280' }}>
                {value === 'planejado' ? 'Planejado' : 'Realizado'}
              </span>
            )}
          />
          <Line
            type="monotone"
            dataKey="planejado"
            stroke="#2563eb"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="realizado"
            stroke="#06b6d4"
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ─── Contratos simulados (até o endpoint existir) ────────────────────────────

const contratosSimulados = [
  { id: '01', nome: 'Pronet', valor: 100, status: 'Ativo' },
]

// ─── Página principal ────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: projetos = [], isLoading } = useProjetos()

  const stats = useMemo(() => {
    const ativos = projetos.filter((p) => p.status === 'em_execucao').length
    const total = projetos.length
    const custoPlanejado = projetos.reduce((acc, p) => acc + p.custoPlanejado, 0)
    const custoReal = 0
    const pct = custoPlanejado > 0 ? ((custoReal / custoPlanejado) * 100).toFixed(1) : '0.0'
    return { ativos, total, custoPlanejado, custoReal, pct }
  }, [projetos])

  const emExecucao = projetos.filter((p) => p.status === 'em_execucao').slice(0, 5)

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-0.5">Visão geral dos projetos e contratos</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Projetos Ativos"
          value={isLoading ? '–' : stats.ativos}
          sub={`${stats.total} total`}
          icon={<FolderOpen size={16} className="text-primary" />}
          iconBg="bg-blue-50"
        />
        <StatCard
          label="Contratos Ativos"
          value={isLoading ? '–' : contratosSimulados.length}
          sub={`${contratosSimulados.length} total`}
          icon={<FileText size={16} className="text-violet-600" />}
          iconBg="bg-violet-50"
        />
        <StatCard
          label="Custo Planejado"
          value={isLoading ? '–' : formatCurrency(stats.custoPlanejado)}
          icon={<DollarSign size={16} className="text-amber-600" />}
          iconBg="bg-amber-50"
        />
        <StatCard
          label="Custo Real"
          value={isLoading ? '–' : formatCurrency(stats.custoReal)}
          sub={`${stats.pct}% do planejado`}
          subColor="text-success"
          icon={<TrendingUp size={16} className="text-success" />}
          iconBg="bg-green-50"
        />
      </div>

      {/* Charts */}
      <div className="card p-5 mb-6">
        <div className="flex gap-6">
          <MiniChart data={dadosGrafico1} />
          <div className="w-px bg-border self-stretch" />
          <MiniChart data={dadosGrafico2} />
        </div>
      </div>

      {/* Bottom grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* Projetos em execução */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">Projetos em Execução</h2>
            <Link
              to="/projetos"
              className="text-xs text-primary hover:text-primary-hover transition-colors font-medium"
            >
              Ver todos
            </Link>
          </div>

          {isLoading ? (
            <p className="text-sm text-text-muted text-center py-6">Carregando...</p>
          ) : emExecucao.length === 0 ? (
            <p className="text-sm text-text-muted text-center py-6">
              Nenhum projeto em execução.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {emExecucao.map((p) => (
                <Link
                  key={p.id}
                  to={`/projetos/${p.id}`}
                  className="flex items-center justify-between group"
                >
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-medium text-text-primary group-hover:text-primary transition-colors truncate">
                      {p.nome}
                    </p>
                    <p className="text-xs text-text-muted">{p.cliente}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-20 bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${p.progresso}%` }}
                      />
                    </div>
                    <span className="text-xs text-text-secondary w-8 text-right">
                      {p.progresso}%
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Contratos recentes */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-text-primary">Contratos Recentes</h2>
            <Link
              to="/contratos"
              className="text-xs text-primary hover:text-primary-hover transition-colors font-medium"
            >
              Ver todos
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            {contratosSimulados.map((c) => (
              <div key={c.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {c.id} – {c.nome}
                  </p>
                  <p className="text-xs text-text-muted font-mono">
                    {formatCurrency(c.valor)}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}