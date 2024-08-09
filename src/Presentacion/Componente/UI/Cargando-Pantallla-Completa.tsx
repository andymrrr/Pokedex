import { View, Text } from 'react-native'
import React from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'

export const CargandoPantalllaCompleta = () => {
    const {colors} = useTheme()
  return (
    <View style={{
        flex:1,
        justifyContent:"center",
        alignItems: "center",
        backgroundColor: colors.background
    }}>
      <ActivityIndicator color='white' size={30} />
    </View>
  )
}
