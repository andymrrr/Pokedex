import { PokemonApi } from '../../Config/Api/PokemonApi'
import { PokeApiPaginacion, } from '../../Infraestructura/Interface/Pokemon-Api.interfaces'

export const BuscarPokemonPorNombreId = async(idPokemon: number)=> {
  try {
    console.log(idPokemon)
    const {data} = await PokemonApi.get<PokeApiPaginacion>(`/pokemon`,{
      params:{
        limits: 1000
      }
    });
    
    //const  resultado = 
    return ;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al Buscar el Pokeemon ${idPokemon}`)
    
  }
}
