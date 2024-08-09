import { createStackNavigator } from '@react-navigation/stack';
import { InicioPantalla } from '../Pantallas/Inicio/Inicio-Pantalla';
import { PokemonPantalla } from '../Pantallas/Pokemon/Pokemon-Pantalla';
import { BuscadorPantalla } from '../Pantallas/Buscar/Buscador-Pantalla';


export type RootStackParametros = {
  InicioPantalla: undefined;
  PokemonPantalla:{idPokemon: number};
  BuscadorPantalla: undefined

}
const Stack = createStackNavigator<RootStackParametros>();
export const StackNavegacion =  () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="InicioPantalla" component={InicioPantalla} />
      <Stack.Screen name="PokemonPantalla" component={PokemonPantalla} />
      <Stack.Screen name="BuscadorPantalla" component={BuscadorPantalla} />
    </Stack.Navigator>
  );
}