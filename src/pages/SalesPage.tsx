import { useState } from 'react'
import {
  ShoppingCart, Plus, X,
  Coffee, Cake, CupSoda, IceCreamCone, MoreHorizontal,
} from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  qty: number
}

const quickProducts = [
  { id: 'p1', name: 'Bolo Trufado', price: 89.0, icon: Cake },
  { id: 'p2', name: 'Brigadeiro Gourmet', price: 4.5, icon: IceCreamCone },
  { id: 'p3', name: 'Torta de Limão', price: 65.0, icon: Cake },
  { id: 'p4', name: 'Refrigerante', price: 8.0, icon: CupSoda },
  { id: 'p5', name: 'Café Expresso', price: 6.5, icon: Coffee },
]

const kanbanColumns = [
  { key: 'recebido', label: 'RECEBIDO', color: 'text-primary' },
  { key: 'producao', label: 'EM PRODUÇÃO', color: 'text-warning' },
  { key: 'pronto', label: 'PRONTO', color: 'text-info' },
  { key: 'entrega', label: 'ENTREGA', color: 'text-success' },
]

const demoOrders = [
  { id: '#1024', customer: 'João Silva', items: '1x Combo Master, 1x Coca 2L', value: 89.9, platform: 'iFood', status: 'recebido', time: '10:45' },
  { id: '#442', customer: 'Maria Oliveira', items: '2x Bolo Trufado', value: 124.0, platform: 'Uber Eats', status: 'recebido', time: '10:52' },
  { id: '#1026', customer: 'Pedro Santos', items: '1x Torta de Limão, 1x Suco', value: 45.0, platform: 'Balcão', status: 'producao', time: '10:30' },
  { id: '#1021', customer: 'Ana Costa', items: '3x Brigadeiro Gourmet', value: 13.5, platform: 'iFood', status: 'pronto', time: '10:15' },
  { id: '#1019', customer: 'Ricardo Lima', items: '1x Bolo de Chocolate 2kg', value: 120.0, platform: 'Delivery Próprio', status: 'entrega', time: '09:50' },
]

const recentSales = [
  { id: '#1024', customer: 'João Silva', platform: 'iFood', status: 'Recebido', value: 89.9 },
  { id: '#1023', customer: 'Renata Dias', platform: 'Balcão', status: 'Concluído', value: 35.5 },
  { id: '#1022', customer: 'Carlos M.', platform: 'Uber Eats', status: 'Concluído', value: 67.0 },
  { id: '#1021', customer: 'Ana Costa', platform: 'iFood', status: 'Em Produção', value: 13.5 },
]

export default function SalesPage() {
  const [cart, setCart] = useState<CartItem[]>([
    { id: 'p1', name: 'Bolo Trufado', price: 89.0, qty: 1 },
    { id: 'p4', name: 'Refrigerante', price: 8.0, qty: 1 },
  ])
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const addToCart = (product: typeof quickProducts[0]) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id)
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)

  const platformColor = (p: string) => {
    if (p.includes('iFood')) return 'bg-red-100 text-red-700'
    if (p.includes('Uber')) return 'bg-green-100 text-green-700'
    if (p.includes('Balcão')) return 'bg-blue-100 text-blue-700'
    return 'bg-purple-100 text-purple-700'
  }

  const statusColor = (s: string) => {
    if (s === 'Concluído') return 'text-success'
    if (s === 'Recebido') return 'text-primary'
    return 'text-warning'
  }

  return (
    <div className="space-y-6 slide-up">
      {/* PDV Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Quick Products */}
        <div className="lg:col-span-3 card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} className="text-navy" />
              <h2 className="text-base font-bold text-navy">Venda Rápida PDV</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
                NOVO CLIENTE
              </button>
              <button className="text-xs font-semibold text-text-secondary hover:text-navy transition-colors">
                HISTÓRICO
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {quickProducts.map((p) => (
              <button
                key={p.id}
                onClick={() => addToCart(p)}
                className="card !shadow-none border border-border p-4 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary-light/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-md bg-surface flex items-center justify-center group-hover:bg-primary-light transition-colors">
                  <p.icon size={20} className="text-text-secondary group-hover:text-primary-dark transition-colors" />
                </div>
                <span className="text-xs font-medium text-center leading-tight">{p.name}</span>
              </button>
            ))}
            <button className="card !shadow-none border border-dashed border-border p-4 flex flex-col items-center gap-2 hover:border-primary transition-colors">
              <div className="w-10 h-10 rounded-md bg-surface flex items-center justify-center">
                <Plus size={20} className="text-text-secondary" />
              </div>
              <span className="text-xs font-medium text-text-secondary">Outros</span>
            </button>
          </div>
        </div>

        {/* Cart */}
        <div className="card p-5">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary mb-3">
            Carrinho Atual
          </h3>
          <div className="space-y-2 mb-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-navy">{item.qty}x {item.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}</span>
                  <button onClick={() => removeFromCart(item.id)} className="text-text-secondary hover:text-danger transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Total</span>
              <span className="text-xl font-bold text-navy">
                R$ {cartTotal.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>
          <button className="btn-primary w-full justify-center !py-3">
            <ShoppingCart size={16} />
            Finalizar Venda
          </button>
        </div>
      </div>

      {/* Kanban Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-navy">Status de Pedidos</h2>
            <span className="badge badge-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-success rounded-full" /> Sistema Online
            </span>
          </div>
          <div className="flex items-center gap-2">
            {['iFood', 'Uber Eats'].map((p) => (
              <button
                key={p}
                onClick={() => setActiveFilter(activeFilter === p ? null : p)}
                className={`text-xs font-medium px-3 py-1.5 rounded-md border transition-all ${
                  activeFilter === p
                    ? 'border-primary bg-primary-light text-primary-dark'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kanbanColumns.map((col) => {
            const orders = demoOrders.filter(
              (o) => o.status === col.key && (!activeFilter || o.platform.includes(activeFilter))
            )
            return (
              <div key={col.key}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${col.color}`}>
                    {col.label}
                  </span>
                  <span className="badge badge-neutral text-[10px]">{orders.length}</span>
                </div>
                <div className="space-y-3 min-h-[120px]">
                  {orders.map((order) => (
                    <div key={order.id} className="card p-4">
                      <div className="flex items-start justify-between mb-2">
                        <span className={`text-[10px] font-bold uppercase ${platformColor(order.platform).split(' ')[1]}`}>
                          {order.platform} {order.id}
                        </span>
                        <span className="text-[10px] text-text-secondary">{order.time}</span>
                      </div>
                      <p className="text-sm font-semibold text-navy">{order.customer}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{order.items}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-sm font-bold text-navy">
                          R$ {order.value.toFixed(2).replace('.', ',')}
                        </span>
                        {col.key === 'recebido' && (
                          <button className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">
                            Aceitar
                          </button>
                        )}
                        {col.key === 'pronto' && (
                          <button className="btn-primary !py-1.5 !px-3 !text-xs">
                            Chamar Motoboy
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Sales Table */}
      <div className="card">
        <div className="flex items-center justify-between p-5 pb-0">
          <h2 className="text-base font-bold text-navy">Resumo de Vendas Recentes</h2>
          <div className="flex items-center gap-2">
            <button className="btn-secondary !py-1.5 !px-3 !text-xs">Exportar CSV</button>
            <button className="btn-primary !py-1.5 !px-3 !text-xs">Ver Todas</button>
          </div>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr>
                {['ID Pedido', 'Cliente', 'Plataforma', 'Status', 'Valor Total'].map((h) => (
                  <th key={h} className="table-header text-left">{h}</th>
                ))}
                <th className="table-header" />
              </tr>
            </thead>
            <tbody>
              {recentSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-surface/50 transition-colors">
                  <td className="table-cell font-medium text-text-secondary">{sale.id}</td>
                  <td className="table-cell">{sale.customer}</td>
                  <td className="table-cell">
                    <span className={`badge text-[10px] ${platformColor(sale.platform)}`}>
                      {sale.platform}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={`flex items-center gap-1.5 text-sm ${statusColor(sale.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {sale.status}
                    </span>
                  </td>
                  <td className="table-cell font-semibold text-right">
                    R$ {sale.value.toFixed(2).replace('.', ',')}
                  </td>
                  <td className="table-cell text-center">
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
    </div>
  )
}
