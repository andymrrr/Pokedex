import { View, StyleSheet, ScrollView, FlatList, Image } from 'react-native'
import React, { useContext } from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParametros } from '../../Navegacion/Stack-Navegacion'
import {  useQuery } from '@tanstack/react-query'
import { BuscarPokemonPorId } from '../../../Acciones/Pokemones/Buscar-Pokemon-Por-Id';
import { CargandoPantalllaCompleta } from '../../Componente/UI/Cargando-Pantallla-Completa'
import { Chip, Text } from 'react-native-paper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Formateador } from '../../../Config/Utilitario/Formateador';
import { FadeInImage } from '../../Componente/UI/Fade-In-Image'
import { TemaContext } from '../../Context/Tema-Context'
interface Propiedad extends StackScreenProps<RootStackParametros,"PokemonPantalla">{}
export const PokemonPantalla = ({route,navigation}:Propiedad) => {
  const {oscuro} = useContext(TemaContext)
  const {top} = useSafeAreaInsets()
  const {idPokemon} = route.params
  const pokebolaImagen = oscuro 
  ? require("../../../assets/pokeball-light.png")
  : require("../../../assets/pokeball-dark.png")

  const {isLoading, data: Pokemon} = useQuery({
    queryKey: ["Pokemon", idPokemon],
    queryFn: ()=> BuscarPokemonPorId(idPokemon),
    staleTime: 1000 * 60 * 60

  })
  if(!Pokemon)
  {
    return(
    <CargandoPantalllaCompleta/>
    )
  }

    return (
      <ScrollView
        style={ { flex: 1, backgroundColor: Pokemon.color } }
        bounces={ false }
        showsVerticalScrollIndicator={ false }>
        {/* Header Container */ }
        <View style={ Estilo.CabezaContenedor }>
          {/* Nombre del Pokemon */ }
          <Text
            style={ {
              ...Estilo.pokemonNombre,
              top: top + 5,
            } }>
            { Formateador.capitalize( Pokemon.nombre ) + '\n' }#{ Pokemon.id }
          </Text>
      
          {/* Pokeball */ }
          <Image source={ pokebolaImagen } style={ Estilo.pokebala } />
      
          <FadeInImage uri={ Pokemon.avatar } style={ Estilo.pokemonImagen } />
        </View>
      
        {/* Types */ }
        <View
          style={ { flexDirection: 'row', marginHorizontal: 20, marginTop: 10 } }>
          { Pokemon.tipos.map( tipo => (
            <Chip
              key={ tipo }
              mode="outlined"
              selectedColor="white"
              style={ { marginLeft: 10 } }>
              { tipo }
            </Chip>
          ) ) }
        </View>
      
        {/* Sprites */ }
        <FlatList
          data={ Pokemon.sprites }
          horizontal
          keyExtractor={ item => item }
          showsHorizontalScrollIndicator={ false }
          centerContent
          style={ {
            marginTop: 20,
            height: 100,
          } }
          renderItem={ ( { item } ) => (
            <FadeInImage
              uri={ item }
              style={ { width: 100, height: 100, marginHorizontal: 5 } }
            />
          ) }
        />
        {/* abilities */}
      <Text style={Estilo.subTitulo}>Habilidades</Text>
      <FlatList
        data={Pokemon.habilidades}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <Chip selectedColor="white">{Formateador.capitalize(item)}</Chip>
        )}
      />

      {/* Stats */}
      <Text style={Estilo.subTitulo}>Estadistica</Text>

      <FlatList
        data={Pokemon.estadisticas}
        keyExtractor={item => item.nombre}
        horizontal

        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <View style={Estilo.contenedorEstadistica}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formateador.capitalize(item.nombre)}
            </Text>
            <Text style={{color: 'white'}}>{item.valor}</Text>
          </View>
        )}
      />

      {/* Moves */}
      <Text style={Estilo.subTitulo}>Movimiento</Text>
      <FlatList
        data={Pokemon.movimientos}
        horizontal
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <View style={Estilo.contenedorEstadistica}>
            <Text style={{flex: 1, color: 'white'}}>
              {Formateador.capitalize(item.nombre)}
            </Text>
            <Text style={{color: 'white'}}>lvl {item.level}</Text>
          </View>
        )}
      />

      {/* Juegos */}
      <Text style={Estilo.subTitulo}>Juegos</Text>
      <FlatList
        data={Pokemon.juegos}
        horizontal
        keyExtractor={item => item}
        showsHorizontalScrollIndicator={false}
        centerContent
        renderItem={({item}) => (
          <Chip selectedColor="white">{Formateador.capitalize(item)}</Chip>
        )}
      />

      
      
        <View style={ { height: 100 } } />
      </ScrollView>
      
  )
}


const Estilo = StyleSheet.create({
  CabezaContenedor: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 1000,
    borderBottomLeftRadius: 1000,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  pokemonNombre: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokebala: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImagen: {
    width: 240,
    height: 240,
    position: 'absolute',
    bottom: -40,
  },
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subTitulo: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
  },
  contenedorEstadistica: {
    flexDirection: 'column',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  
});

