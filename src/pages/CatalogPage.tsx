import { useState } from 'react'
import {
  Plus, Edit, MoreHorizontal, Upload, Trash2, TrendingUp, TrendingDown,
  Lightbulb, Save,
} from 'lucide-react'

const kpis = [
  { label: 'CUSTO MÉDIO DE PRODUÇÃO', value: 'R$ 14,80', change: '-4% vs último mês', negative: true },
  { label: 'MARGEM MÉDIA GERAL', value: '42.5%', change: '— Estável', neutral: true },
  { label: 'TOTAL EM CATÁLOGO', value: '24 Itens', change: '+2 novos produtos', positive: true },
]

const categories = ['Todos', 'Doces', 'Salgados', 'Bebidas']

const products = [
  { id: 'PRD-001', name: 'Bolo Trufado', cost: 34.2, margin: '60%', price: 89.0, img: '🎂' },
  { id: 'PRD-002', name: 'Brigadeiro Gourmet', cost: 1.2, margin: '150%', price: 4.5, img: '🍫' },
  { id: 'PRD-003', name: 'Torta de Limão', cost: 22.5, margin: '80%', price: 65.0, img: '🍰' },
  { id: 'PRD-004', name: 'Café Expresso', cost: 1.8, margin: '120%', price: 6.5, img: '☕' },
  { id: 'PRD-005', name: 'Croissant', cost: 3.5, margin: '90%', price: 12.0, img: '🥐' },
]

interface Ingredient {
  name: string
  qty: number
  cost: number
}

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [showNewProduct, setShowNewProduct] = useState(false)
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: 'Farinha de Trigo', qty: 500, cost: 2.5 },
    { name: 'Chocolate Belga 70%', qty: 200, cost: 18.0 },
  ])
  const [marginPercent, setMarginPercent] = useState(100)
  const [fixedCosts] = useState(4.0)

  const ingredientCost = ingredients.reduce((sum, i) => sum + i.cost, 0)
  const totalCost = ingredientCost + fixedCosts
  const markup = totalCost * (marginPercent / 100)
  const suggestedPrice = totalCost + markup

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', qty: 0, cost: 0 }])
  }

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Catálogo</h1>
          <p className="text-sm text-text-secondary mt-1">Gestão inteligente de insumos e margens de lucro.</p>
        </div>
        <button onClick={() => setShowNewProduct(!showNewProduct)} className="btn-primary">
          <Plus size={16} /> Novo Produto
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="card p-5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
              {kpi.label}
            </span>
            <p className={`text-2xl font-bold mt-2 ${kpi.label.includes('MARGEM') ? 'text-primary' : 'text-navy'}`}>
              {kpi.value}
            </p>
            <p className={`text-xs mt-1 flex items-center gap-1 ${
              kpi.positive ? 'text-success' : kpi.negative ? 'text-danger' : 'text-text-secondary'
            }`}>
              {kpi.positive && <TrendingUp size={12} />}
              {kpi.negative && <TrendingDown size={12} />}
              {kpi.change}
            </p>
          </div>
        ))}
      </div>

      {/* Product Table */}
      <div className="card">
        <div className="flex items-center gap-4 p-4 border-b border-border">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-medium pb-1 transition-colors ${
                activeCategory === cat
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-text-secondary hover:text-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {['ID', 'Produto', 'Custo Produção', 'Margem Sugerida', 'Preço de Venda', 'Ações'].map((h) => (
                  <th key={h} className="table-header text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-surface/50 transition-colors">
                  <td className="table-cell text-text-secondary text-xs">#{p.id}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-md bg-surface flex items-center justify-center text-lg">
                        {p.img}
                      </div>
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="table-cell text-text-secondary">R$ {p.cost.toFixed(2).replace('.', ',')}</td>
                  <td className="table-cell">
                    <span className="badge badge-success">{p.margin} Markup</span>
                  </td>
                  <td className="table-cell font-semibold">R$ {p.price.toFixed(2).replace('.', ',')}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-surface rounded transition-colors">
                        <Edit size={14} className="text-text-secondary" />
                      </button>
                      <button className="p-1.5 hover:bg-surface rounded transition-colors">
                        <MoreHorizontal size={14} className="text-text-secondary" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Product Form + Pricing Calculator */}
      {showNewProduct && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 fade-in">
          {/* Form */}
          <div className="lg:col-span-3 space-y-5">
            <h2 className="text-xl font-bold text-navy">Nova Ficha Técnica</h2>
            <div className="card p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">
                    Nome do Produto
                  </label>
                  <input className="input-field" placeholder="Ex: Torta de Limão" />
                </div>
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">
                    Categoria
                  </label>
                  <select className="input-field">
                    <option>Selecione...</option>
                    <option>Doces</option>
                    <option>Salgados</option>
                    <option>Bebidas</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">
                  Foto do Produto
                </label>
                <div className="border-2 border-dashed border-border rounded-md p-8 text-center hover:border-primary transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto text-text-secondary mb-2" />
                  <p className="text-sm">
                    <span className="text-primary font-medium">Clique para subir</span> ou arraste uma foto
                  </p>
                  <p className="text-xs text-text-secondary mt-1">PNG, JPG até 5MB</p>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                    Insumos e Gramaturas
                  </label>
                  <button onClick={addIngredient} className="text-xs font-semibold text-primary hover:text-primary-dark flex items-center gap-1 transition-colors">
                    <Plus size={14} /> Adicionar Insumo
                  </button>
                </div>
                <div className="space-y-3">
                  {ingredients.map((ing, i) => (
                    <div key={i} className="bg-surface rounded-md p-3 flex items-center gap-3">
                      <div className="flex-1">
                        <span className="text-[10px] text-primary font-medium">Insumo</span>
                        <p className="text-sm font-medium">{ing.name || 'Novo insumo'}</p>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] text-text-secondary">Qtd (g/ml)</span>
                        <p className="text-sm font-medium">{ing.qty}</p>
                      </div>
                      <div className="text-center">
                        <span className="text-[10px] text-text-secondary">Custo Proporcional</span>
                        <p className="text-sm font-medium">R$ {ing.cost.toFixed(2).replace('.', ',')}</p>
                      </div>
                      <button onClick={() => removeIngredient(i)} className="p-1 text-text-secondary hover:text-danger transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Calculator */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold text-navy">Precificação Automática</h2>
            <div className="bg-navy text-white rounded-md p-6 space-y-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                  Custo Total de Produção
                </span>
                <p className="text-3xl font-bold text-primary mt-1">
                  R$ {totalCost.toFixed(2).replace('.', ',')}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                    Margem de Lucro Sugerida (%)
                  </span>
                  <span className="text-sm font-bold text-primary">{marginPercent}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="300"
                  value={marginPercent}
                  onChange={(e) => setMarginPercent(Number(e.target.value))}
                  className="w-full accent-primary"
                />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/70">Custo Insumos</span>
                  <span>R$ {ingredientCost.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Markup ({marginPercent}%)</span>
                  <span className="text-primary">+ R$ {markup.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Custos Fixos/Gás</span>
                  <span>R$ {fixedCosts.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Preço Sugerido</span>
                  <span className="text-2xl font-bold text-primary">
                    R$ {suggestedPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button className="btn-primary w-full justify-center !bg-primary !py-3 !text-sm">
                <Save size={16} /> SALVAR E PUBLICAR
              </button>
              <p className="text-[10px] text-center text-white/40 uppercase tracking-wider">
                Cálculo baseado em valores atualizados dos insumos
              </p>
            </div>

            {/* Tip Card */}
            <div className="bg-primary-light rounded-md p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={14} className="text-primary-dark" />
                <span className="text-xs font-bold text-primary-dark uppercase">Dica do Gestta</span>
              </div>
              <p className="text-xs text-navy leading-relaxed">
                Sua margem para este produto está <span className="font-bold text-primary-dark">15% acima</span> da
                média do mercado local. Considere revisar para maior competitividade.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
