import { useAuthStore } from '../stores/authStore'
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  ArrowRight,
  BarChart3,
} from 'lucide-react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const weeklyData = [
  { day: 'SEG', vendas: 1850, online: 920 },
  { day: 'TER', vendas: 2200, online: 1100 },
  { day: 'QUA', vendas: 1950, online: 850 },
  { day: 'QUI', vendas: 2800, online: 1400 },
  { day: 'SEX', vendas: 3200, online: 1650 },
  { day: 'SÁB', vendas: 4100, online: 2100 },
  { day: 'DOM', vendas: 2450, online: 1200 },
]

const kpis = [
  {
    label: 'FATURAMENTO DO DIA',
    value: 'R$ 2.450,00',
    change: '+12%',
    positive: true,
    icon: DollarSign,
    color: '#00D4C8',
  },
  {
    label: 'QTD PEDIDOS',
    value: '42',
    change: '+5%',
    positive: true,
    icon: ShoppingBag,
    color: '#00D4C8',
  },
  {
    label: 'TICKET MÉDIO',
    value: 'R$ 58,33',
    change: '-2%',
    positive: false,
    icon: BarChart3,
    color: '#EF4444',
  },
]

const alerts = [
  {
    type: 'danger' as const,
    icon: AlertTriangle,
    title: 'Contas em Atraso',
    description: '3 faturas pendentes de fornecedores que venceram ontem.',
    action: 'Ver Detalhes',
    bgColor: 'bg-red-50',
    iconBg: 'bg-red-100',
    iconColor: 'text-danger',
  },
  {
    type: 'warning' as const,
    icon: Clock,
    title: 'Contas a Vencer',
    description: 'Amanhã vencem 5 pagamentos (R$ 1.200,00).',
    action: 'Agendar Pagamentos',
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-warning',
  },
]

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user)

  return (
    <div className="space-y-6 slide-up">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-navy">Olá, {user?.name?.split(' ')[0] || 'Gestor'}</h1>
        <p className="text-text-secondary text-sm mt-1">
          Aqui está o que está acontecendo na Fouet Gestta hoje.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="card p-5" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                {kpi.label}
              </span>
              <div className="w-8 h-8 rounded-md bg-primary-light flex items-center justify-center">
                <kpi.icon size={16} className="text-primary-dark" />
              </div>
            </div>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-2xl font-bold text-navy">{kpi.value}</span>
              <span className={`text-sm font-medium flex items-center gap-0.5 ${kpi.positive ? 'text-success' : 'text-danger'}`}>
                {kpi.positive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {kpi.change}
              </span>
            </div>
            <div className="kpi-bar w-full" style={{ background: `${kpi.color}30` }}>
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{ width: '65%', background: kpi.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly Chart */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-navy">Desempenho Semanal</h2>
              <p className="text-xs text-text-secondary mt-0.5">Vendas brutas nos últimos 7 dias</p>
            </div>
            <select className="input-field !w-auto !py-1.5 !px-3 !text-xs">
              <option>Esta Semana</option>
              <option>Semana Passada</option>
              <option>Último Mês</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4C8" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#00D4C8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF0" vertical={false} />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#6B7A8D' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: '#6B7A8D' }}
                tickFormatter={(v) => `R$${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: '#1B2B3A',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '12px',
                }}
                formatter={(value) =>
                  [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']
                }
              />
              <Area
                type="monotone"
                dataKey="vendas"
                stroke="#00D4C8"
                strokeWidth={2}
                fill="url(#colorVendas)"
                name="Físico"
              />
              <Area
                type="monotone"
                dataKey="online"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#colorOnline)"
                name="Plataformas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Financial Alerts */}
        <div className="card p-5">
          <h2 className="text-base font-bold text-navy mb-4">Alertas Financeiros</h2>
          <div className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className={`${alert.bgColor} rounded-md p-4`}>
                <div className="flex items-start gap-3">
                  <div className={`${alert.iconBg} w-9 h-9 rounded-full flex items-center justify-center shrink-0`}>
                    <alert.icon size={16} className={alert.iconColor} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy">{alert.title}</p>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                      {alert.description}
                    </p>
                    <button className="text-xs font-semibold text-primary mt-2 hover:text-primary-dark transition-colors flex items-center gap-1">
                      {alert.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-text-secondary italic mt-4">
            Nenhum novo alerta de sistema.
          </p>
          <button className="w-full mt-4 text-center text-sm text-primary font-medium hover:text-primary-dark transition-colors flex items-center justify-center gap-1">
            Ir para Financeiro <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
