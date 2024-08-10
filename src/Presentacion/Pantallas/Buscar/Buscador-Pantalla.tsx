import {FlatList, View} from 'react-native';
import React, { useMemo, useState } from 'react';
import {TemaGlobal} from '../../../Config/Tema/Tema-Global';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {TarjetaPokemon} from '../../Componente/Pokemon/Tarjeta-Pokemon';
import {Pokemon} from '../../../Dominio/Entidades/Pokemon';
import { useQuery } from '@tanstack/react-query';
import { BuscarPokemonPorIds, BuscarPokemonPorNombreId } from '../../../Acciones/Pokemones';
import { CargandoPantalllaCompleta } from '../../Componente/UI/Cargando-Pantallla-Completa';
import { useAntiRebote } from '../../Hooks/use-Anti-Rebote';

export const BuscadorPantalla = () => {
  const {top} = useSafeAreaInsets();
  const [termino, setTermino] = useState("")
  const antiRebote = useAntiRebote(termino,500)
  const {isLoading, data: PokemonListado =[]} = useQuery({
    queryKey: ["Pokemon","Todos"],
    queryFn:()=> BuscarPokemonPorNombreId()
  })

  const pokemones  = useMemo( () => {
    //Es numero 
    if(!isNaN(Number(antiRebote)))
    {
        const pokemones =  PokemonListado.find( pokemon => pokemon.id === Number(antiRebote))
        return pokemones ? [pokemones] :[]
    }
    if (antiRebote.length ===0) {
      return []
    }
    if(antiRebote.length < 3)
    {
      return []
    }

    return PokemonListado.filter(pokemon => pokemon.nombre.includes(antiRebote.toLowerCase()))

  },[antiRebote])
  const {isLoading: cargandoPokemon, data: Pokemon =[]} = useQuery({
    queryKey:["Pokemon","Por", pokemones],
    queryFn: () => BuscarPokemonPorIds(pokemones.map(pokemon => pokemon.id)),
    staleTime: 1000 *60 *60
  })

  if(isLoading){
    return(
      <CargandoPantalllaCompleta/>
    )
  }
  return (
    <View style={[TemaGlobal.marginGlobal, {paddingTop: top}]}>
      <TextInput
        placeholder="Buscar Pokemon"
        autoFocus
        autoCorrect={false}
        onChangeText={setTermino}
        value={termino}
      />
  {
    cargandoPokemon && (
      <ActivityIndicator style={{paddingTop: 20}} />
    )
  }
      

      <FlatList
        data={Pokemon}
        style={{paddingTop: top + 20}}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        renderItem={({item}) => <TarjetaPokemon pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={{height:120}}/>}
      />
    </View>
  );
};
