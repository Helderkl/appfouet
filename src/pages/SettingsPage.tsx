import { useState } from 'react'
import {
  Building2, User, FileText, Bell, Shield, Upload, Check,
  Save, Eye, EyeOff, Camera,
} from 'lucide-react'
import { useAuthStore } from '../stores/authStore'

const sidebarItems = [
  { key: 'empresa', label: 'Dados da Empresa', icon: Building2 },
  { key: 'conta', label: 'Minha Conta', icon: User },
  { key: 'fiscal', label: 'Fiscal & Certificados', icon: FileText },
  { key: 'notificacoes', label: 'Notificações', icon: Bell },
  { key: 'seguranca', label: 'Segurança', icon: Shield },
]

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user)
  const [activeSection, setActiveSection] = useState('empresa')
  const [showOldPass, setShowOldPass] = useState(false)
  const [showNewPass, setShowNewPass] = useState(false)
  const [nfceEnabled, setNfceEnabled] = useState(false)

  return (
    <div className="slide-up">
      <h1 className="text-2xl font-bold text-navy mb-6">Ajustes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                activeSection === item.key
                  ? 'bg-primary-light text-primary-dark'
                  : 'text-text-secondary hover:bg-surface hover:text-navy'
              }`}
            >
              <item.icon size={16} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6 fade-in">
          {/* Dados da Empresa */}
          {activeSection === 'empresa' && (
            <>
              <div>
                <h2 className="text-lg font-bold text-navy">Perfil da Empresa</h2>
                <p className="text-sm text-text-secondary mt-1">Gerencie a identidade visual e informações básicas da sua empresa.</p>
              </div>

              {/* Logo Upload */}
              <div className="card p-6">
                <h3 className="text-sm font-semibold text-navy mb-4">Logotipo da Empresa</h3>
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-md bg-surface border border-border flex items-center justify-center overflow-hidden">
                    <img src="/logo.jpeg" alt="Logo" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary mb-3">Formatos aceitos: PNG, JPG. Tamanho máximo: 2MB. Recomendado 512×512px.</p>
                    <div className="flex items-center gap-2">
                      <button className="btn-primary !py-1.5 !px-4 !text-xs"><Upload size={12} /> Subir Logo</button>
                      <button className="text-xs text-text-secondary hover:text-danger transition-colors">Remover</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Data */}
              <div className="card p-6 space-y-5">
                <h3 className="text-sm font-semibold text-navy">Dados Jurídicos</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Razão Social</label><input className="input-field" defaultValue="Fouet Confeitaria Ltda" /></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">CNPJ</label><input className="input-field" defaultValue="12.345.678/0001-90" /></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Inscrição Estadual</label><input className="input-field" defaultValue="Isento" /></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Regime Tributário</label><select className="input-field"><option>Simples Nacional</option><option>Lucro Presumido</option><option>MEI</option></select></div>
                </div>
              </div>

              {/* Address */}
              <div className="card p-6 space-y-5">
                <h3 className="text-sm font-semibold text-navy">Endereço</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">CEP</label><input className="input-field" defaultValue="01234-567" /></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Logradouro</label><input className="input-field" defaultValue="Av. Paulista" /></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Número</label><input className="input-field" defaultValue="1000" /></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Bairro</label><input className="input-field" defaultValue="Bela Vista" /></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Cidade</label><input className="input-field" defaultValue="Vitória" /></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Estado</label><input className="input-field" defaultValue="ES" /></div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button className="btn-secondary">Descartar</button>
                <button className="btn-primary"><Save size={14} /> Salvar Alterações</button>
              </div>
            </>
          )}

          {/* Minha Conta */}
          {activeSection === 'conta' && (
            <>
              <div>
                <h2 className="text-lg font-bold text-navy">Minha Conta</h2>
                <p className="text-sm text-text-secondary mt-1">Atualize seus dados pessoais e foto de perfil.</p>
              </div>
              <div className="card p-6 space-y-5">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-md bg-gradient-to-br from-primary to-primary-dark text-white text-2xl font-bold flex items-center justify-center">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-border rounded-md flex items-center justify-center shadow-sm hover:bg-surface transition-colors">
                      <Camera size={12} className="text-text-secondary" />
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">{user?.name}</p>
                    <p className="text-xs text-text-secondary">{user?.role}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Nome Completo</label><input className="input-field" defaultValue={user?.name || ''} /></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">E-mail</label><input className="input-field" defaultValue={user?.email || ''} /></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Telefone</label><input className="input-field" defaultValue="(27) 99999-0000" /></div>
                  <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Cargo</label><input className="input-field" defaultValue={user?.role || ''} disabled /></div>
                </div>
              </div>

              {/* Change Password */}
              <div className="card p-6 space-y-4">
                <h3 className="text-sm font-semibold text-navy">Alterar Senha</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Senha Atual</label>
                    <input className="input-field !pr-10" type={showOldPass ? 'text' : 'password'} placeholder="••••••••" />
                    <button onClick={() => setShowOldPass(!showOldPass)} className="absolute right-3 bottom-2.5 text-text-secondary">{showOldPass ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                  </div>
                  <div className="relative">
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Nova Senha</label>
                    <input className="input-field !pr-10" type={showNewPass ? 'text' : 'password'} placeholder="••••••••" />
                    <button onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 bottom-2.5 text-text-secondary">{showNewPass ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end"><button className="btn-primary"><Save size={14} /> Salvar Alterações</button></div>
            </>
          )}

          {/* Fiscal & Certificados */}
          {activeSection === 'fiscal' && (
            <>
              <div>
                <h2 className="text-lg font-bold text-navy">Configurações Fiscais & Emissão</h2>
                <p className="text-sm text-text-secondary mt-1">Gerencie certificados digitais e configurações de NFC-e.</p>
              </div>

              {/* Certificate */}
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
                      <Check size={18} className="text-primary-dark" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-navy">Certificado Digital A1</p>
                      <p className="text-xs text-text-secondary">Nenhum certificado carregado atualmente.</p>
                    </div>
                  </div>
                  <button className="btn-secondary !text-xs">Importar .pfx</button>
                </div>
              </div>

              {/* NFC-e Config */}
              <div className="card p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy">NFC-e (Nota de Consumidor)</span>
                  <button
                    onClick={() => setNfceEnabled(!nfceEnabled)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${nfceEnabled ? 'bg-primary' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${nfceEnabled ? 'left-5.5 translate-x-0' : 'left-0.5'}`} />
                  </button>
                </div>
                {nfceEnabled && (
                  <div className="grid grid-cols-2 gap-4 fade-in">
                    <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Série</label><input className="input-field" defaultValue="1" /></div>
                    <div><label className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary block mb-2">Número Inicial</label><input className="input-field" defaultValue="100" /></div>
                  </div>
                )}
              </div>

              {/* Environment */}
              <div className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-navy">Ambiente de Emissão</p>
                    <p className="text-xs text-text-secondary mt-1">Você está em modo de testes. As notas emitidas não possuem valor fiscal.</p>
                  </div>
                  <span className="badge badge-warning text-[10px]">HOMOLOGAÇÃO</span>
                </div>
                <button className="text-xs font-semibold text-primary mt-3 hover:text-primary-dark transition-colors flex items-center gap-1">
                  Alternar para Produção →
                </button>
              </div>
              <div className="flex justify-end"><button className="btn-primary"><Save size={14} /> Salvar Alterações</button></div>
            </>
          )}

          {/* Notificações */}
          {activeSection === 'notificacoes' && (
            <>
              <div>
                <h2 className="text-lg font-bold text-navy">Notificações</h2>
                <p className="text-sm text-text-secondary mt-1">Configure quais alertas deseja receber.</p>
              </div>
              <div className="card p-6 space-y-4">
                {['Alertas de estoque baixo', 'Contas a vencer (3 dias antes)', 'Novos pedidos via formulário', 'Relatório semanal por e-mail'].map((n, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-navy">{n}</span>
                    <button className={`w-11 h-6 rounded-full transition-colors relative ${i < 2 ? 'bg-primary' : 'bg-gray-300'}`}>
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${i < 2 ? 'left-5.5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Segurança */}
          {activeSection === 'seguranca' && (
            <>
              <div>
                <h2 className="text-lg font-bold text-navy">Segurança</h2>
                <p className="text-sm text-text-secondary mt-1">Configurações de segurança da conta.</p>
              </div>
              <div className="card p-6 space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div><p className="text-sm font-medium text-navy">Autenticação em dois fatores</p><p className="text-xs text-text-secondary">Adicione uma camada extra de segurança</p></div>
                  <button className="btn-secondary !py-1.5 !px-3 !text-xs">Ativar</button>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <div><p className="text-sm font-medium text-navy">Sessões ativas</p><p className="text-xs text-text-secondary">1 dispositivo conectado</p></div>
                  <button className="text-xs text-danger font-medium hover:underline">Encerrar todas</button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div><p className="text-sm font-medium text-navy">Último login</p><p className="text-xs text-text-secondary">Hoje às 10:32 — Chrome, Windows</p></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
