import { PokemonApi } from '../../Config/Api/PokemonApi'
import { PokeAPIPokemon } from '../../Infraestructura/Interface/Pokemon-Api.interfaces'
import { Pokemon } from '../../Dominio/Entidades/Pokemon'
import { PokemonMapeo } from '../../Infraestructura/Mapeo/Pokemon.Mapeo'

export const BuscarPokemonPorId = async(idPokemon: number): Promise<Pokemon> => {
  try {
    console.log(idPokemon)
    const {data} = await PokemonApi.get<PokeAPIPokemon>(`/pokemon/${idPokemon}`);
    const pokemon = await PokemonMapeo.pokeApiPokemonEntidad(data)

    return pokemon;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al Buscar el Pokeemon ${idPokemon}`)
    
  }
}
