import { useAuth } from '@/hooks/useAuth'
import React from 'react'

interface PokemonCardProps {
  pokemon: any
  showActions?: boolean
}

const PokemonCard = ({ pokemon, showActions = true }: PokemonCardProps) => {
  const { isAuth, capturedPokemons, capturePokemon, releasePokemon } = useAuth()
  const isPokemonCaptured = capturedPokemons.some((p) => p?.id === String(pokemon?.id))

  const handleCaptureClick = () => {
    if (isPokemonCaptured) {
      releasePokemon(String(pokemon?.id))
    } else {
      capturePokemon({ id: String(pokemon?.id), name: pokemon?.name })
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <h1 className="text-3xl font-bold capitalize mb-2">{pokemon?.name}</h1>
        <div className="flex items-center justify-between">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">Exp. Base: {pokemon?.base_experience}</span>
          {showActions &&
            isAuth &&
            (isPokemonCaptured ? (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Capturado</span>
            ) : (
              <button
                onClick={handleCaptureClick}
                className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-4 py-1 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9V5a1 1 0 112 0v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4z"
                    clipRule="evenodd"
                  />
                </svg>
                Capturar
              </button>
            ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gray-100 rounded-full transform -translate-x-2 translate-y-2"></div>
            <img
              src={pokemon?.sprites?.front_default}
              alt={pokemon?.name}
              className={`w-48 h-48 relative z-10 transform hover:scale-110 transition-transform duration-300 ${
                isPokemonCaptured ? 'filter brightness-110' : ''
              }`}
            />
            {isPokemonCaptured && (
              <div className="absolute top-0 right-0 bg-green-500 text-white p-1 rounded-full z-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-500 text-sm">Altura</p>
                <p className="text-lg font-semibold">{pokemon?.height / 10} m</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-500 text-sm">Peso</p>
                <p className="text-lg font-semibold">{pokemon?.weight / 10} kg</p>
              </div>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm mb-2">Tipos</h3>
              <div className="flex gap-2">
                {pokemon?.types.map((type: any) => (
                  <span key={type.type.name} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                    {type.type.name}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-500 text-sm mb-2">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon?.abilities.map((ability: any) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium capitalize">
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PokemonCard
