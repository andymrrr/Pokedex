import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FAB, Text, useTheme} from 'react-native-paper';
import {BuscarPokemones} from '../../../Acciones/Pokemones';
import {useInfiniteQuery, useQueryClient} from '@tanstack/react-query';
import {PokeBolaFondo} from '../../Componente/UI/Poke-Bola-Fondo';
import {FlatList} from 'react-native-gesture-handler';
import {TemaGlobal} from '../../../Config/Tema/Tema-Global';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TarjetaPokemon} from '../../Componente/Pokemon/Tarjeta-Pokemon';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParametros} from '../../Navegacion/Stack-Navegacion';
import { CargandoPantalllaCompleta } from '../../Componente/UI/Cargando-Pantallla-Completa';

interface Propiedad
  extends StackScreenProps<RootStackParametros, 'BuscadorPantalla'> {}
export const InicioPantalla = ({navigation}: Propiedad) => {
  const {top} = useSafeAreaInsets();
  const ClienteQuery = useQueryClient();
  const tema = useTheme();
  const {isLoading, data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['Pokemon', 'infinito'],
    initialPageParam: 0,
    queryFn: async params => {
      const pokemones = await BuscarPokemones(params.pageParam);

      pokemones.forEach(pokemon => {
        ClienteQuery.setQueryData(['Pokemon', pokemon.id], pokemon);
      });

      return pokemones;
    },
    getNextPageParam: (ultimapagina, pagina) => pagina.length,
    staleTime: 1000 * 60 * 60,
  });

 
  return (
    <View style={TemaGlobal.marginGlobal}>
      <PokeBolaFondo estilo={Estilo.PosicionImagen} />
      <FlatList
        data={data?.pages.flat() ?? []}
        style={{paddingTop: top + 20}}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        ListHeaderComponent={() => <Text variant="displayMedium">Pokedex</Text>}
        renderItem={({item}) => <TarjetaPokemon pokemon={item} />}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />

      <FAB
        label="Buscar"
        style={[TemaGlobal.fab, {backgroundColor: tema.colors.primary}]}
        mode="elevated"
        onPress={() => navigation.push('BuscadorPantalla')}
        color={tema.dark ? 'black' : 'white'}
      />
    </View>
  );
};
const Estilo = StyleSheet.create({
  PosicionImagen: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
});
