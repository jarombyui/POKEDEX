import { create } from 'zustand'

interface IUserLogin {
  email: string
  password: string
}

interface CapturedPokemon {
  id: string
  name: string
}

interface AuthStore {
  isAuth: boolean
  user: IUserLogin | null
  isLoading: boolean
  capturedPokemons: CapturedPokemon[]
  logoutAction: () => void
  loginAction: (user: any) => void
  loadingAction: (loading: boolean) => void
  refreshAuth: () => void
  capturePokemon: (pokemon: { id: string; name: string }) => void
  releasePokemon: (pokemonId: string) => void
}

const getCapturedPokemons = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('capturedPokemons') || '[]')
  }
  return []
}

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  isAuth: false,
  isLoading: true,
  capturedPokemons: getCapturedPokemons(),
  logoutAction: () => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }
    set({ isAuth: false, user: null, capturedPokemons: [] })
  },
  loginAction: (data: IUserLogin) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(data))
    }
    set({ isAuth: true, user: data })
  },
  loadingAction: (isLoading: boolean) => set({ isLoading }),
  refreshAuth: () => {
    set({ isLoading: true })
    if (typeof window !== 'undefined') {
      const userLS = localStorage.getItem('user')
      const user = userLS ? JSON.parse(userLS) : null
      if (user) {
        set({ isAuth: true, user, isLoading: false })
      } else {
        set({ isAuth: false, user: null, isLoading: false })
      }
    } else {
      set({ isAuth: false, user: null, isLoading: false })
    }
  },
  capturePokemon: (pokemon) => {
    set((state) => {
      const updatedCapturedPokemons = [...state.capturedPokemons, { id: pokemon.id, name: pokemon.name }]
      if (typeof window !== 'undefined') {
        localStorage.setItem('capturedPokemons', JSON.stringify(updatedCapturedPokemons))
      }
      return { capturedPokemons: updatedCapturedPokemons }
    })
  },
  releasePokemon: (pokemonId) => {
    set((state) => {
      const updatedCapturedPokemons = state.capturedPokemons.filter((pokemon) => pokemon.id !== pokemonId)
      if (typeof window !== 'undefined') {
        localStorage.setItem('capturedPokemons', JSON.stringify(updatedCapturedPokemons))
      }
      return { capturedPokemons: updatedCapturedPokemons }
    })
  }
}))
