import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageStyle,
  StyleProp,
  Text,
  View,
} from 'react-native';
import { useAnimacion } from '../../Hooks/use-Animacion';


interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({uri, style}: Props) => {
  const {animatedOpacity, fadeIn} = useAnimacion();
  const [cargando, setCargando] = useState(true);
  const dispuesto  = useRef(false)

  useEffect(() => {
    return () => {
      dispuesto.current = true;
    }
  }, [])
  
  const CargaFinalizada =()=> {
    if(dispuesto.current)
    {
      return;
    }
    else  {
      fadeIn({});
      setCargando(false);
    }
  }
  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {cargando && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        source={{uri}}
        onLoadEnd={() => {
         CargaFinalizada()
        }}
        style={[style, {opacity: animatedOpacity}]}
      />
    </View>
  );
};