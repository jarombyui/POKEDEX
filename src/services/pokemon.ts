import { IPokemonRequest, IPokemonResponse } from '@/interfaces/pokemon'
import { apiService } from './config'

export const getPokemons = async ({ offset = 1, limit = 10 }: IPokemonRequest): Promise<IPokemonResponse[]> => {
  try {
    const { data } = await apiService.get(`/pokemon?offset=${offset}&limit=${limit}`)
    return data?.results
  } catch (error: any) {
    throw error?.response?.data?.message
  }
}

export const getPokemon = async ({ id }: { id: string }): Promise<any> => {
  try {
    const { data } = await apiService.get(`/pokemon/${id}`)
    return data
  } catch (error: any) {
    throw error?.response?.data?.message
  }
}
