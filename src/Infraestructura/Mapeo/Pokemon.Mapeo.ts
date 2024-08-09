import { BuscarColoresImagenes } from "../../Config/Utilitario/Buscar-Colores-Imagenes";
import type{ Pokemon } from "../../Dominio/Entidades/Pokemon";
import type { PokeAPIPokemon } from "../Interface/Pokemon-Api.interfaces";

export class PokemonMapeo {
  static async pokeApiPokemonEntidad(data: PokeAPIPokemon): Promise<Pokemon> {
    const sprites = PokemonMapeo.BuscarSprites(data);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    const color = await BuscarColoresImagenes(avatar);
    return {
      id: data.id,
      nombre: data.name,
      avatar: avatar,
      tipos: data.types.map(type => type.type.name),
      sprites: sprites,
      color: color,
      juegos : data.game_indices.map(juego => juego.version.name),
      estadisticas: data.stats.map(estadistica => ({ nombre: estadistica.stat.name, valor: estadistica.base_stat})),
      habilidades: data.abilities.map(habilidad => habilidad.ability.name),
      movimientos: data.moves
      .map(movimiento => ({nombre: movimiento.move.name, level:movimiento.version_group_details[0].level_learned_at})).
      sort((a,b)=> (a.level  - b.level ))

    };
  }

  static BuscarSprites(data: PokeAPIPokemon): string[] {
    const sprites: string[] = [
      data.sprites.front_default,
      data.sprites.back_default,
      data.sprites.front_shiny,
      data.sprites.back_shiny,
    ];

    if (data.sprites.other?.home.front_default)
      sprites.push(data.sprites.other?.home.front_default);
    if (data.sprites.other?.['official-artwork'].front_default)
      sprites.push(data.sprites.other?.['official-artwork'].front_default);
    if (data.sprites.other?.['official-artwork'].front_shiny)
      sprites.push(data.sprites.other?.['official-artwork'].front_shiny);
    if (data.sprites.other?.showdown.front_default)
      sprites.push(data.sprites.other?.showdown.front_default);
    if (data.sprites.other?.showdown.back_default)
      sprites.push(data.sprites.other?.showdown.back_default);

    return sprites;
  }
}