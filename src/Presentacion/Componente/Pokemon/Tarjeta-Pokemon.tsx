import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Pokemon} from '../../../Dominio/Entidades/Pokemon';
import {Card, Text} from 'react-native-paper';
import {FadeInImage} from '../UI/Fade-In-Image';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParametros } from '../../Navegacion/Stack-Navegacion';

interface Propiedad {
  pokemon: Pokemon;
}
export const TarjetaPokemon = ({pokemon}: Propiedad) => {
    const  navegacion = useNavigation<NavigationProp<RootStackParametros>>();
  return (
    <Pressable
      style={{
        flex:1
      }}
        onPress={() => navegacion.navigate("PokemonPantalla", {idPokemon: pokemon.id})}
    >
      <Card
        style={[Estilo.tarjetaContenedor, {backgroundColor: pokemon.color}]}>
        <Text style={Estilo.nombre} variant="bodyLarge">
          {pokemon.nombre}
          {`\n#${pokemon.id}`}
        </Text>
        {/*Fondo*/}
        <View style={Estilo.pokebolaContenedor}>
          <Image
            source={require('../../../assets/pokeball-light.png')}
            style={Estilo.pokebola}
          />
        </View>
        {/*Pokemn Imagen*/}
        <FadeInImage uri={pokemon.avatar} style={Estilo.pokemonImagen} />
        {/*Tipo*/}
        <Text style={[Estilo.nombre, {marginTop: 35}]}>{pokemon.tipos[0]}</Text>
      </Card>
    </Pressable>
  );
};

const Estilo = StyleSheet.create({
  tarjetaContenedor: {
    marginHorizontal: 10,
    backgroundColor: 'grey',
    height: 120,
    flex: 0.5,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  nombre: {
    color: 'white',
    top: 10,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    right: -25,
    top: -25,
    opacity: 0.4,
  },
  pokemonImagen: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -15,
    top: -30,
  },

  pokebolaContenedor: {
    alignItems: 'flex-end',
    width: '100%',
    position: 'absolute',

    overflow: 'hidden',
    opacity: 0.5,
  },
});
