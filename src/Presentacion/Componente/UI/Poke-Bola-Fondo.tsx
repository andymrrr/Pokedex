import { View, Text, StyleProp, ViewStyle, Image, ImageStyle, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { TemaContext } from '../../Context/Tema-Context'
interface Propiedad {
    estilo?: StyleProp<ImageStyle>
}
export const PokeBolaFondo = ({estilo}: Propiedad) => {
    const {oscuro} = useContext(TemaContext)
    const pokebolaImagen = oscuro 
    ? require("../../../assets/pokeball-dark.png")
    : require("../../../assets/pokeball-light.png")

  return (
   <Image 
    source={pokebolaImagen}
    style={[
        {
            width:300,
            height:300,
            opacity:0.3
        },
        estilo
    ]}
   
   />
  )
}

