import {Pokemon} from '../../Dominio/Entidades/Pokemon';
import {PokemonApi} from '../../Config/Api/PokemonApi';
import {
  PokeApiPaginacion,
  PokeAPIPokemon,
} from '../../Infraestructura/Interface/Pokemon-Api.interfaces';
import {PokemonMapeo} from '../../Infraestructura/Mapeo/Pokemon.Mapeo';

export const BuscarPokemones = async (
  pagina: number,
  limite: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = `/pokemon`;
    const {data} = await PokemonApi.get<PokeApiPaginacion>(url, {
      params: {
        offset: pagina * 10,
        limit: limite,
      },
    });

    const PromesaPokemon = data.results.map(info => {
      return PokemonApi.get<PokeAPIPokemon>(info.url);
    });

    const PokeApiPokemones = await Promise.all(PromesaPokemon);

    const Pokemones = PokeApiPokemones.map(item =>
      PokemonMapeo.pokeApiPokemonEntidad(item.data),
    );

    return  await Promise.all(Pokemones);
  } catch (error) {
    throw new Error('Error al buscar los pokemon');
  }
};
