import { useState } from 'react'
import {
  TrendingUp, ArrowDownRight, ArrowUpRight, Plus, MoreHorizontal,
  FileText,
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

const kpis = [
  { label: 'Saldo Total', value: 'R$ 42.580,20', change: '+12.4%', positive: true, icon: TrendingUp },
  { label: 'Entradas Previstas', value: 'R$ 12.400,00', sub: 'Este mês', icon: ArrowDownRight },
  { label: 'Saídas Agendadas', value: 'R$ 8.920,45', change: '-R$ 2.150', negative: true, icon: ArrowUpRight },
]

const cashFlowData = [
  { month: 'JAN', entradas: 18500, saidas: 12200 },
  { month: 'FEV', entradas: 22000, saidas: 14800 },
  { month: 'MAR', entradas: 19500, saidas: 13100 },
  { month: 'ABR', entradas: 28000, saidas: 16500 },
]

const bills = [
  { date: '12 Mai, 2024', desc: 'Fornecedor de Farinha Premium', type: 'Boleto / Pagar', value: -1450.0, status: 'Pendente' },
  { date: '15 Mai, 2024', desc: 'Aluguel - Loja Centro', type: 'Boleto / Pagar', value: -3200.0, status: 'Pendente' },
  { date: '18 Mai, 2024', desc: 'Vendas iFood - Semana 19', type: 'Recebível', value: 4850.0, status: 'Previsto' },
  { date: '20 Mai, 2024', desc: 'Conta de Energia', type: 'Boleto / Pagar', value: -680.0, status: 'Pendente' },
  { date: '25 Mai, 2024', desc: 'Salário - Ana Beatriz', type: 'Folha', value: -8200.0, status: 'Agendado' },
]

const filterTabs = ['Todos', 'Boletos', 'Faturas']

export default function FinancePage() {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const [showNewTransaction, setShowNewTransaction] = useState(false)

  return (
    <div className="space-y-6 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-navy">Gestão Financeira</h1>
        <button onClick={() => setShowNewTransaction(true)} className="btn-primary">
          <Plus size={16} /> Nova Transação
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-md bg-primary-light flex items-center justify-center">
                <kpi.icon size={18} className="text-primary-dark" />
              </div>
              {kpi.change && (
                <span className={`text-xs font-medium ${kpi.positive ? 'text-success' : 'text-danger'}`}>
                  {kpi.change}
                </span>
              )}
              {kpi.sub && <span className="text-xs text-text-secondary">{kpi.sub}</span>}
            </div>
            <span className="text-xs text-text-secondary block mt-3">{kpi.label}</span>
            <p className="text-2xl font-bold text-navy mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Chart + Profitability */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Cash Flow Chart */}
        <div className="card p-5 lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-navy">Fluxo de Caixa</h2>
              <p className="text-xs text-text-secondary mt-0.5">Comparativo Entradas vs Saídas</p>
            </div>
            <span className="text-xs text-text-secondary">Últimos 6 meses</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={cashFlowData}>
              <defs>
                <linearGradient id="colorEntradas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSaidas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF0" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7A8D' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#6B7A8D' }} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: '#1B2B3A', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '12px' }} formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, '']} />
              <Area type="monotone" dataKey="entradas" stroke="#10B981" strokeWidth={2} fill="url(#colorEntradas)" name="Entradas" />
              <Area type="monotone" dataKey="saidas" stroke="#EF4444" strokeWidth={2} fill="url(#colorSaidas)" name="Saídas" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-3">
            <span className="flex items-center gap-1.5 text-xs text-text-secondary"><span className="w-2.5 h-2.5 rounded-full bg-success" /> Entradas</span>
            <span className="flex items-center gap-1.5 text-xs text-text-secondary"><span className="w-2.5 h-2.5 rounded-full bg-danger" /> Saídas</span>
          </div>
        </div>

        {/* Profitability Report */}
        <div className="lg:col-span-2 bg-navy rounded-md p-6 text-white space-y-4">
          <div>
            <h2 className="text-base font-bold">Relatório de Lucratividade</h2>
            <p className="text-xs text-white/50 mt-0.5">Baseado no faturamento líquido</p>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span>Faturamento Bruto</span><span className="font-semibold">R$ 15.420,00</span></div>
            <div className="flex justify-between"><span className="text-danger">Taxas iFood (23%)</span><span className="text-danger font-semibold">- R$ 3.546,60</span></div>
            <div className="flex justify-between"><span className="text-danger">Taxas Cartão (2.9%)</span><span className="text-danger font-semibold">- R$ 447,18</span></div>
            <div className="flex justify-between"><span>Custo de Insumos (CMV)</span><span className="font-semibold">- R$ 4.626,00</span></div>
          </div>
          <div className="border-t border-white/20 pt-4">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Lucro Líquido</span>
                <p className="text-3xl font-bold text-primary mt-1">R$ 6.800,22</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-white/50">Margem</span>
                <p className="text-2xl font-bold">44.1%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bills Table */}
      <div className="card">
        <div className="flex items-center justify-between p-5 pb-0">
          <h2 className="text-base font-bold text-navy">Contas a Pagar e Receber</h2>
          <div className="flex items-center gap-1">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md transition-all ${
                  activeFilter === tab ? 'bg-navy text-white' : 'text-text-secondary hover:bg-surface'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr>
                {['Vencimento', 'Descrição', 'Tipo', 'Valor', 'Status'].map((h) => (
                  <th key={h} className="table-header text-left">{h}</th>
                ))}
                <th className="table-header" />
              </tr>
            </thead>
            <tbody>
              {bills.map((bill, i) => (
                <tr key={i} className="hover:bg-surface/50 transition-colors">
                  <td className="table-cell text-sm text-text-secondary">{bill.date}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <FileText size={14} className="text-text-secondary shrink-0" />
                      <span className="text-sm font-medium">{bill.desc}</span>
                    </div>
                  </td>
                  <td className="table-cell text-sm text-text-secondary">{bill.type}</td>
                  <td className={`table-cell text-sm font-semibold ${bill.value > 0 ? 'text-success' : 'text-danger'}`}>
                    {bill.value > 0 ? '+' : ''}R$ {Math.abs(bill.value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="table-cell">
                    <span className={`badge text-[10px] ${
                      bill.status === 'Pendente' ? 'badge-danger' :
                      bill.status === 'Agendado' ? 'badge-info' :
                      'badge-warning'
                    }`}>
                      {bill.status}
                    </span>
                  </td>
                  <td className="table-cell">
                    <button className="p-1 hover:bg-surface rounded transition-colors">
                      <MoreHorizontal size={16} className="text-text-secondary" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Transaction Modal */}
      {showNewTransaction && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 fade-in">
          <div className="bg-white rounded-md w-full max-w-lg shadow-modal slide-up">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-lg font-bold text-navy">Nova Transação</h3>
              <button onClick={() => setShowNewTransaction(false)} className="p-1 hover:bg-surface rounded">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Tipo</label>
                  <select className="input-field"><option>Despesa</option><option>Receita</option></select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Categoria</label>
                  <select className="input-field"><option>Fornecedor</option><option>Aluguel</option><option>Salários</option><option>Consumo</option></select>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Descrição</label>
                <input className="input-field" placeholder="Ex: Fornecedor de Farinha Premium" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Valor</label>
                  <input className="input-field" placeholder="R$ 0,00" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Vencimento</label>
                  <input className="input-field" type="date" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-border">
              <button onClick={() => setShowNewTransaction(false)} className="btn-secondary">Cancelar</button>
              <button className="btn-primary"><Plus size={14} /> Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
