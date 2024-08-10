import { PokemonApi } from '../../Config/Api/PokemonApi'
import { PokeApiPaginacion, } from '../../Infraestructura/Interface/Pokemon-Api.interfaces'

export const BuscarPokemonPorNombreId = async()=> {
  try {
   
    const {data} = await PokemonApi.get<PokeApiPaginacion>(`/pokemon`,{
      params:{
        limit: 1000
      }
    });
    
    const  resultado = data.results.map((informacion)=>({
      id: Number(informacion.url.split('/')[6]),
      nombre: informacion.name
    }))
    return resultado;
  } catch (error) {
    console.log(error);
    throw new Error(`Error al Buscar el Pokeemon `)
    
  }
}
