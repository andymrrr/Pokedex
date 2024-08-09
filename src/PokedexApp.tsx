import 'react-native-gesture-handler';
import React from 'react';
import {StackNavegacion} from './Presentacion/Navegacion/Stack-Navegacion';
import {TemaContextProveedor} from './Presentacion/Context/Tema-Context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
const queryClient = new QueryClient();
export const PokedexApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TemaContextProveedor>
        <StackNavegacion />
      </TemaContextProveedor>
    </QueryClientProvider>
  );
};
