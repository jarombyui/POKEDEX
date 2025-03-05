import DashboardLayout from '@/components/common/Layout/DashboardLayout'
import { WithoutLayout } from '@/components/common/Layout/WithoutLayout'
import { IPokemonResponse } from '@/interfaces/pokemon'
import { getPokemons } from '@/services/pokemon'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const [page, setPage] = useState(1)
  const limit = 20
  const router = useRouter()

  const { data: pokemons = [], isLoading } = useQuery<IPokemonResponse[]>({
    queryKey: ['getPokemons', page],
    queryFn: () => getPokemons({ offset: page, limit })
  })

  const { isAuth, capturedPokemons } = useAuth()

  return (
    <WithoutLayout>
      <div className="text-2xl font-bold mb-20">Pokemons</div>
      <div>
        {!isLoading && (
          <div className="grid grid-cols-5 gap-4">
            {pokemons.map((pokemon) => {
              const id = pokemon.url.split('/').slice(-2, -1)[0]
              return (
                <button
                  key={pokemon.name}
                  onClick={() => router.push(`/pokemon/${id}`)}
                  className="cursor-pointer border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 w-40 h-40 p-3 flex justify-center items-center flex-col gap-2 bg-white transform hover:scale-105">
                  <h2 className="text-md font-semibold text-gray-800">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    alt={pokemon.name}
                    className="w-14 h-14"
                  />
                  {isAuth && (
                    <span
                      className={`text-sm ${capturedPokemons.some((pokemon) => pokemon.id === id) ? 'text-green-500' : 'text-red-500'}`}>
                      {capturedPokemons.some((pokemon) => pokemon.id === id) ? 'Capturado' : 'No Capturado'}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}
        {isLoading && <div className="text-2xl font-bold h-[688px] flex justify-center items-center w-[864px]">Loading...</div>}
        <div className="flex justify-between mt-4">
          <button
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1 || isLoading}>
            Previous
          </button>
          <button
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={pokemons.length < limit || isLoading}>
            Next
          </button>
        </div>
      </div>
    </WithoutLayout>
  )
}
