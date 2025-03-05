import DashboardLayout from '@/components/common/Layout/DashboardLayout'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import React from 'react'

const User = () => {
  const { logoutAction, capturedPokemons } = useAuth()
  const router = useRouter()
  return (
    <DashboardLayout>
      <div className="text-2xl font-bold mb-20">Mis pokemones registrados ({capturedPokemons.length})</div>

      <div className="grid grid-cols-5 gap-4">
        {capturedPokemons.map((pokemon) => (
          <button
            key={pokemon.id}
            onClick={() => router.push(`/pokemon/${pokemon?.id}`)}
            className="cursor-pointer border w-40 h-40 p-4 flex justify-center items-center flex-col gap-5">
            <h2>{pokemon.name}</h2>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={pokemon.name}
              className="w-10 h-10"
            />
          </button>
        ))}
      </div>
    </DashboardLayout>
  )
}

export default User
