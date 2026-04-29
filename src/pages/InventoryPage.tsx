import { useState } from 'react'
import {
  Package, AlertTriangle, DollarSign, TrendingUp, TrendingDown,
  Search, MoreHorizontal, FileText, Download, Plus,
  ChevronLeft, ChevronRight,
} from 'lucide-react'

const kpis = [
  { label: 'TOTAL ITENS', value: '148', change: '+5%', positive: true, icon: Package },
  { label: 'ESTOQUE BAIXO', value: '12', change: '-2%', negative: true, icon: AlertTriangle },
  { label: 'VALOR EM ESTOQUE', value: 'R$ 24.500', change: '-1%', negative: true, icon: DollarSign },
]

const ingredients = [
  { id: 1, name: 'Ovos Orgânicos', unit: '24 dz', cost: 14.5, supplier: 'Granja Verde', status: 'ok', emoji: '🥚' },
  { id: 2, name: 'Essência de Baunilha', unit: '1.2 L', cost: 180.0, supplier: 'Master Flavors', status: 'ok', emoji: '🧴' },
  { id: 3, name: 'Açúcar Mascavo', unit: '8 kg', cost: 9.2, supplier: 'Distrib. Doce Vida', status: 'low', emoji: '🍬' },
  { id: 4, name: 'Farinha de Trigo (T1)', unit: '5 kg', cost: 4.8, supplier: 'Moinho Central', status: 'critical', emoji: '🌾' },
  { id: 5, name: 'Manteiga sem Sal', unit: '2.5 kg', cost: 32.0, supplier: 'Laticínios Sul', status: 'critical', emoji: '🧈' },
  { id: 6, name: 'Chocolate Belga 70%', unit: '3 kg', cost: 89.0, supplier: 'Callebaut BR', status: 'ok', emoji: '🍫' },
  { id: 7, name: 'Leite Integral', unit: '20 L', cost: 5.8, supplier: 'Fazenda Boa', status: 'ok', emoji: '🥛' },
  { id: 8, name: 'Creme de Leite', unit: '6 L', cost: 12.5, supplier: 'Laticínios Sul', status: 'ok', emoji: '🥛' },
]

const alerts = [
  { name: 'Farinha de Trigo (T1)', remaining: '5kg', critical: true },
  { name: 'Manteiga sem Sal', remaining: '2.5kg', critical: true },
]

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)

  const filtered = ingredients.filter((i) =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const qtyColor = (status: string) => {
    if (status === 'critical') return 'text-danger font-semibold'
    if (status === 'low') return 'text-warning font-semibold'
    return 'text-navy'
  }

  return (
    <div className="space-y-6 slide-up">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="card p-5">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-md bg-primary-light flex items-center justify-center">
                <kpi.icon size={18} className="text-primary-dark" />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${
                kpi.positive ? 'text-success' : 'text-danger'
              }`}>
                {kpi.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {kpi.change}
              </span>
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mt-3">
              {kpi.label}
            </span>
            <p className="text-3xl font-bold text-navy mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      {/* Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Invoice Entry Button */}
        <button
          onClick={() => setShowInvoiceModal(true)}
          className="btn-primary !py-4 !text-base justify-center"
        >
          <FileText size={20} /> Entrada de Faturas
        </button>

        {/* Safety Alerts */}
        <div className="card p-5 lg:col-span-2">
          <h3 className="flex items-center gap-2 text-sm font-bold text-navy mb-3">
            <AlertTriangle size={16} className="text-danger" />
            Alertas de Segurança
          </h3>
          <div className="space-y-2">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-center justify-between bg-amber-50 rounded-md px-4 py-2.5">
                <div>
                  <span className="text-sm font-semibold text-navy">{alert.name}</span>
                  <span className="text-xs text-danger ml-2">Restante: {alert.remaining}</span>
                </div>
                <button className={`badge text-[10px] cursor-pointer transition-transform hover:scale-105 ${
                  alert.critical ? 'badge-danger' : 'badge-warning'
                }`}>
                  {alert.critical ? 'REPOR' : 'COMPRAR'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="card">
        <div className="flex items-center justify-between p-5 pb-0">
          <h2 className="text-base font-bold text-navy">Insumos em Estoque</h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="text"
                placeholder="Buscar insumo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field !py-1.5 !pl-9 !pr-3 !text-xs w-[200px]"
              />
            </div>
            <button className="btn-secondary !py-1.5 !px-3 !text-xs">
              <Download size={14} /> PDF Contagem
            </button>
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr>
                {['Item / Insumo', 'Quantidade', 'Custo Unit.', 'Fornecedor', 'Ações'].map((h) => (
                  <th key={h} className="table-header text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-surface flex items-center justify-center text-lg">
                        {item.emoji}
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className={`table-cell ${qtyColor(item.status)}`}>{item.unit}</td>
                  <td className="table-cell text-text-secondary">R$ {item.cost.toFixed(2).replace('.', ',')}</td>
                  <td className="table-cell">
                    <span className="badge badge-neutral text-[10px]">{item.supplier}</span>
                  </td>
                  <td className="table-cell">
                    <button className="p-1.5 hover:bg-surface rounded transition-colors">
                      <MoreHorizontal size={16} className="text-text-secondary" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between p-4 text-xs text-text-secondary">
          <span>Mostrando {filtered.length} de {ingredients.length} itens</span>
          <div className="flex items-center gap-1">
            <button className="p-1.5 border border-border rounded hover:bg-surface transition-colors">
              <ChevronLeft size={14} />
            </button>
            <button className="p-1.5 border border-border rounded hover:bg-surface transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 fade-in">
          <div className="bg-white rounded-md w-full max-w-lg shadow-modal slide-up">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-lg font-bold text-navy">Entrada de Fatura</h3>
              <button onClick={() => setShowInvoiceModal(false)} className="p-1 hover:bg-surface rounded transition-colors">
                ✕
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Insumo</label>
                  <select className="input-field"><option>Selecione...</option></select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Quantidade</label>
                  <input className="input-field" placeholder="Ex: 10 kg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Custo Total</label>
                  <input className="input-field" placeholder="R$ 0,00" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Fornecedor</label>
                  <input className="input-field" placeholder="Nome do fornecedor" />
                </div>
              </div>
              <p className="text-xs text-text-secondary">O estoque será atualizado automaticamente e a despesa será lançada no financeiro.</p>
            </div>
            <div className="flex items-center justify-end gap-3 p-5 border-t border-border">
              <button onClick={() => setShowInvoiceModal(false)} className="btn-secondary">Cancelar</button>
              <button className="btn-primary">
                <Plus size={14} /> Registrar Entrada
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
