import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { Eye, EyeOff, ArrowRight, Shield, HelpCircle, Globe } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const success = await login(email, password)
    setIsLoading(false)

    if (success) {
      navigate('/')
    } else {
      setError('E-mail ou senha inválidos. Tente novamente.')
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-4">
      {/* Logo & Title */}
      <div className="text-center mb-8 slide-up">
        <div className="w-16 h-16 rounded-lg bg-primary-light mx-auto mb-4 flex items-center justify-center overflow-hidden">
          <img src="/logo.jpeg" alt="Fouet Gestta" className="w-12 h-12 object-cover rounded" />
        </div>
        <h1 className="text-2xl font-bold text-navy tracking-tight">Fouet Gestta</h1>
        <p className="text-text-secondary text-sm mt-1">Gestão inteligente para o seu negócio</p>
      </div>

      {/* Login Card */}
      <div className="card p-8 w-full max-w-[420px] slide-up" style={{ animationDelay: '0.1s' }}>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              E-mail ou Usuário
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@gestta.com.br"
              className="input-field"
              required
              autoFocus
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Senha
              </label>
              <button type="button" className="text-xs text-primary font-medium hover:text-primary-dark transition-colors">
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative">
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-field !pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary accent-primary"
            />
            <span className="text-sm text-text-secondary">Mantenha-me conectado</span>
          </label>

          {/* Error */}
          {error && (
            <div className="bg-red-50 text-danger text-sm px-4 py-3 rounded-md border border-red-100 fade-in">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            id="login-submit"
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full justify-center !py-3 !text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Acessar Conta
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="border-t border-border mt-6 pt-5 text-center">
          <p className="text-sm text-text-secondary">
            Ainda não tem uma conta?{' '}
            <button className="text-primary font-medium hover:text-primary-dark transition-colors">
              Solicite acesso
            </button>
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="flex items-center gap-6 mt-8 text-xs text-text-secondary">
        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <Shield size={13} /> Privacidade
        </button>
        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <HelpCircle size={13} /> Suporte
        </button>
        <button className="flex items-center gap-1.5 hover:text-primary transition-colors">
          <Globe size={13} /> Português (BR)
        </button>
      </div>
    </div>
  )
}
