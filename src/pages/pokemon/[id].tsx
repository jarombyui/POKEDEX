import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { WithoutLayout } from '@/components/common/Layout/WithoutLayout'
import { getPokemon } from '@/services/pokemon'
import PokemonCard from '@/components/common/PokemonCard'

const Pokemon = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: pokemon, isLoading } = useQuery({
    queryKey: ['getPokemon', id],
    queryFn: () => getPokemon({ id: String(id) }),
    enabled: !!id
  })

  if (isLoading)
    return (
      <WithoutLayout>
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </WithoutLayout>
    )

  return (
    <WithoutLayout>
      <div className="max-w-2xl mx-auto">
        <PokemonCard pokemon={pokemon} />
      </div>
    </WithoutLayout>
  )
}

export default Pokemon
