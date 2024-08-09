import {createContext, PropsWithChildren} from 'react';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {adaptNavigationTheme, PaperProvider} from 'react-native-paper';
import {useColorScheme} from 'react-native';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});
export const TemaContext = createContext({
  oscuro: false,
  tema: LightTheme,
});

export const TemaContextProveedor = ({children}: PropsWithChildren) => {
  const esquemaColor = useColorScheme();

  const temaOscuro = esquemaColor === 'dark';
  const tema = temaOscuro ? DarkTheme : LightTheme;

  return (
    <PaperProvider theme={tema}>
        <TemaContext.Provider
            value={{
                oscuro: temaOscuro,
                tema: tema
            }}
        >
            <NavigationContainer theme={tema}>{children}</NavigationContainer>
        </TemaContext.Provider>
      
    </PaperProvider>
  );
};
