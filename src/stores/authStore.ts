import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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

// Demo users for testing
const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'helderkock2008@gmail.com': {
    password: 'fouetgestta@1',
    user: {
      id: '1',
      name: 'Helder Kock',
      email: 'helderkock2008@gmail.com',
      role: 'Administrador',
      avatar: undefined,
    },
  },
  'ana.lima@fouet.com': {
    password: 'fouet123',
    user: {
      id: '2',
      name: 'Ana Beatriz Lima',
      email: 'ana.lima@fouet.com',
      role: 'Gerente de Vendas',
    },
  },
  'marcos.o@fouet.com': {
    password: 'fouet123',
    user: {
      id: '3',
      name: 'Marcos Oliveira',
      email: 'marcos.o@fouet.com',
      role: 'Auxiliar Administrativo',
    },
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        // Simulate API delay
        await new Promise((r) => setTimeout(r, 800))

        const entry = DEMO_USERS[email.toLowerCase()]
        if (entry && entry.password === password) {
          set({
            user: entry.user,
            token: 'demo-jwt-token-' + Date.now(),
            isAuthenticated: true,
          })
          return true
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
