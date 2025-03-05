import axios from 'axios'

export const apiService = axios.create({
  baseURL: `https://pokeapi.co/api/v2`
})
