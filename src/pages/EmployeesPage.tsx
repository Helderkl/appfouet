import { useState } from 'react'
import {
  Plus, MoreHorizontal, ChevronLeft, ChevronRight, Users as UsersIcon,
  BarChart3, Calendar,
} from 'lucide-react'

const kpis = [
  { label: 'Total de Colaboradores', value: '24', change: '+2% mês', icon: UsersIcon },
  { label: 'Folha de Pagamento', value: 'R$ 78.450', change: '+5.1%', icon: BarChart3 },
  { label: 'Próximo Pagamento', value: '05 Set', badge: 'Integrado', icon: Calendar },
]

const employees = [
  { id: '1', name: 'Ricardo Santos', email: 'ricardo.s@fouet.com', role: 'Desenvolvedor Sênior', salary: 12500, access: ['FIN', 'EST'], status: 'Ativo', avatar: 'RS' },
  { id: '2', name: 'Ana Beatriz Lima', email: 'ana.lima@fouet.com', role: 'Gerente de Vendas', salary: 8200, access: ['VEN'], status: 'Ativo', avatar: 'AB' },
  { id: '3', name: 'Marcos Oliveira', email: 'marcos.o@fouet.com', role: 'Auxiliar Administrativo', salary: 3450, access: ['ADM'], status: 'Afastado', avatar: 'MO' },
  { id: '4', name: 'Carla Mendes', email: 'carla.m@fouet.com', role: 'Confeiteira Chefe', salary: 6800, access: ['EST', 'VEN'], status: 'Ativo', avatar: 'CM' },
  { id: '5', name: 'Pedro Almeida', email: 'pedro.a@fouet.com', role: 'Entregador', salary: 2200, access: ['VEN'], status: 'Ativo', avatar: 'PA' },
]

const modules = [
  { name: 'Módulo Financeiro', desc: 'Controle total de entradas e saídas', users: 4 },
  { name: 'Módulo de Estoque', desc: 'Gestão de inventário e pedidos', users: 12 },
  { name: 'Administrador do Sistema', desc: 'Acesso total ao sistema', users: 2 },
]

const tabs = ['Lista de Colaboradores', 'Gestão de Permissões', 'Relatórios & Despesas']

export default function EmployeesPage() {
  const [activeTab, setActiveTab] = useState(0)
  const [showNewEmployee, setShowNewEmployee] = useState(false)

  const statusColor = (s: string) => s === 'Ativo' ? 'text-success' : 'text-warning'

  return (
    <div className="space-y-6 slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Controle de Funcionários</h1>
          <p className="text-sm text-text-secondary mt-1">Gerencie sua equipe, salários e níveis de acesso em um só lugar com integração direta ao fluxo financeiro.</p>
        </div>
        <button onClick={() => setShowNewEmployee(true)} className="btn-primary">
          <Plus size={16} /> Novo Colaborador
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="card p-5">
            <span className="text-xs text-text-secondary">{kpi.label}</span>
            <div className="flex items-end justify-between mt-2">
              <span className="text-3xl font-bold text-navy">{kpi.value}</span>
              {kpi.change && <span className="text-xs font-medium text-success">{kpi.change}</span>}
              {kpi.badge && <span className="badge badge-info text-[10px]">{kpi.badge}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex items-center gap-6">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`text-sm font-medium pb-3 border-b-2 transition-all ${
                activeTab === i ? 'text-navy border-primary' : 'text-text-secondary border-transparent hover:text-navy'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 0 && (
        <div className="card fade-in">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {['Colaborador', 'Cargo', 'Salário', 'Acesso', 'Status'].map((h) => (
                    <th key={h} className="table-header text-left">{h}</th>
                  ))}
                  <th className="table-header" />
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-surface/50 transition-colors">
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-md bg-gradient-to-br from-primary to-primary-dark text-white text-xs font-bold flex items-center justify-center">
                          {emp.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-navy">{emp.name}</p>
                          <p className="text-xs text-text-secondary">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell text-sm text-text-secondary">{emp.role}</td>
                    <td className="table-cell text-sm font-medium">R$ {emp.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                    <td className="table-cell">
                      <div className="flex items-center gap-1">
                        {emp.access.map((a) => (
                          <span key={a} className="badge badge-neutral text-[9px]">{a}</span>
                        ))}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`flex items-center gap-1.5 text-sm ${statusColor(emp.status)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {emp.status}
                      </span>
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
            <span>Mostrando {employees.length} de 24 colaboradores</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 border border-border rounded hover:bg-surface transition-colors"><ChevronLeft size={14} /></button>
              <button className="p-1.5 border border-border rounded hover:bg-surface transition-colors"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 1 && (
        <div className="space-y-4 fade-in">
          <h2 className="text-lg font-bold text-navy">Gestão de Permissões</h2>
          <div className="space-y-3">
            {modules.map((mod, i) => (
              <div key={i} className="card p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-navy">{mod.name}</p>
                  <p className="text-xs text-text-secondary">{mod.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-text-secondary">{mod.users} usuários</span>
                  <button className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">Configurar</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 2 && (
        <div className="space-y-4 fade-in">
          <h2 className="text-lg font-bold text-navy">Registro de Despesas de Salários</h2>
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-text-secondary">Previsão Folha - Setembro</p>
                <p className="text-3xl font-bold text-navy mt-1">R$ 82.300,00</p>
              </div>
              <div className="w-10 h-10 rounded-md bg-primary-light flex items-center justify-center">
                <BarChart3 size={18} className="text-primary-dark" />
              </div>
            </div>
            <div className="flex items-center justify-between bg-surface rounded-md p-3 mt-2">
              <span className="text-sm text-text-secondary">Integração com Contas a Pagar</span>
              <span className="text-xs font-bold text-success">CONECTADO</span>
            </div>
            <div className="mt-3">
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '75%' }} />
              </div>
              <p className="text-[10px] text-text-secondary mt-1">75% da folha já provisionada no fluxo de caixa</p>
            </div>
          </div>
        </div>
      )}

      {/* New Employee Modal */}
      {showNewEmployee && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 fade-in">
          <div className="bg-white rounded-md w-full max-w-lg shadow-modal slide-up">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h3 className="text-lg font-bold text-navy">Novo Colaborador</h3>
              <button onClick={() => setShowNewEmployee(false)} className="p-1 hover:bg-surface rounded">✕</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Nome Completo</label><input className="input-field" placeholder="Ex: Maria Silva" /></div>
                <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">E-mail</label><input className="input-field" type="email" placeholder="maria@fouet.com" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Cargo</label><input className="input-field" placeholder="Ex: Confeiteira" /></div>
                <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Salário</label><input className="input-field" placeholder="R$ 0,00" /></div>
              </div>
              <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Senha Inicial</label><input className="input-field" type="password" placeholder="Senha temporária" /></div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-border">
              <button onClick={() => setShowNewEmployee(false)} className="btn-secondary">Cancelar</button>
              <button className="btn-primary"><Plus size={14} /> Cadastrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
