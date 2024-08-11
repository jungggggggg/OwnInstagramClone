import { Image, View } from "react-native";


export default function InstaLetterIcon() {
    return (
        <View>
            <Image source={require('../../assets/instagramFontLogo.png')} resizeMode="stretch" style={{ width: "100%", height: "100%", }}/>
        </View>
    )
}