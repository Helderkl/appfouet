import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import axios from 'axios'

export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

/**
 * AUTH STORE
 *
 * In production, login() calls POST /api/auth/login on the backend.
 * The backend handles password hashing (bcrypt), JWT signing, and
 * credential validation. NO passwords are stored in the frontend.
 *
 * In development (when the backend is unavailable), a fallback is
 * provided that simulates the flow WITHOUT exposing real credentials.
 * The fallback uses a flag from import.meta.env to ensure it is
 * tree-shaken out of production builds.
 */

const API_URL = import.meta.env.VITE_API_URL || '/api'

async function authenticateViaBackend(
  email: string,
  password: string
): Promise<{ user: User; token: string } | null> {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password })
    if (res.data?.user && res.data?.token) {
      return { user: res.data.user, token: res.data.token }
    }
    return null
  } catch {
    return null
  }
}

/**
 * DEV-ONLY fallback when backend is not running.
 * This only executes in development mode (import.meta.env.DEV === true).
 * Credentials here are dev-only placeholders and MUST NOT match
 * any real production credentials.
 */
async function devFallbackLogin(
  email: string,
  _password: string
): Promise<{ user: User; token: string } | null> {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 600))

  // Dev-only: accept any password for known test emails
  const devUsers: Record<string, User> = {
    'demo@fouetgestta.dev': {
      id: 'dev-1',
      name: 'Demo Admin',
      email: 'demo@fouetgestta.dev',
      role: 'Administrador',
    },
    'gerente@fouetgestta.dev': {
      id: 'dev-2',
      name: 'Ana Beatriz Lima',
      email: 'gerente@fouetgestta.dev',
      role: 'Gerente de Vendas',
    },
    'aux@fouetgestta.dev': {
      id: 'dev-3',
      name: 'Marcos Oliveira',
      email: 'aux@fouetgestta.dev',
      role: 'Auxiliar Administrativo',
    },
  }

  const user = devUsers[email.toLowerCase()]
  if (!user) return null

  return {
    user,
    token: `dev-token-${Date.now()}`,
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // 1. Try backend authentication first
        const result = await authenticateViaBackend(email, password)

        if (result) {
          set({
            user: result.user,
            token: result.token,
            isAuthenticated: true,
          })
          return true
        }

        // 2. Dev-only fallback (tree-shaken in production builds)
        if (import.meta.env.DEV) {
          const devResult = await devFallbackLogin(email, password)
          if (devResult) {
            set({
              user: devResult.user,
              token: devResult.token,
              isAuthenticated: true,
            })
            return true
          }
        }

        return false
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    { name: 'fouet-auth' }
  )
)
