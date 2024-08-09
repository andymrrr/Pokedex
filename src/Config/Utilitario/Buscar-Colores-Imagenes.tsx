import ImageColors from "react-native-image-colors"

export const BuscarColoresImagenes = async(imagen: string) => {
 const colorDefecto = "gray"; 
 const color =  await ImageColors.getColors(imagen,{
    fallback:"gray"
 })
 switch (color.platform) {
    case "android":
        return color.dominant ?? colorDefecto
    case "ios":
        return color.background ?? colorDefecto
    default:
        return colorDefecto
 }
}
