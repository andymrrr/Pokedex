import { Pokemon } from '../../Dominio/Entidades/Pokemon'
import { BuscarPokemonPorId } from './Buscar-Pokemon-Por-Id'

export const BuscarPokemonPorIds = async(idPokemones: number[]): Promise<Pokemon[]> => {
  try {
    
    const promesaPokemon : Promise<Pokemon>[] = idPokemones.map(id => {
      return BuscarPokemonPorId(id)
    })
    const pokemones = Promise.all(promesaPokemon)
    return pokemones
  } catch (error) {
    console.log(error);
    throw new Error(`Error al Buscar el Pokeemon`)
    
  }
}
