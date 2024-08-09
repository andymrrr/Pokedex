import { FlatList, View } from 'react-native'
import React from 'react'
import { TemaGlobal } from '../../../Config/Tema/Tema-Global'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, TextInput } from 'react-native-paper';

export const BuscadorPantalla = () => {
  const {top}= useSafeAreaInsets()
  return (

    <View style={[TemaGlobal.marginGlobal, {paddingTop: top}]}>
      <TextInput
        placeholder='Buscar Pokemon'
        autoFocus
        autoCorrect={false}
        onChangeText={()=> console.log("Hola")}
        value=''
      />

      <ActivityIndicator style={{paddingTop:20}} />

      {/* <FlatList
      data={data?.pages.flat() ?? []}
      style={{paddingTop: top +20 }}
      keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
      numColumns={2}
      ListHeaderComponent={()=>(
        <Text variant='displayMedium'>Pokedex</Text>
      )}
      renderItem={({item})=> <TarjetaPokemon pokemon={item}/> }
      onEndReachedThreshold={0.6}
      onEndReached={()=> fetchNextPage()}
      showsVerticalScrollIndicator={false}
      /> */}

    </View>
  )
}
