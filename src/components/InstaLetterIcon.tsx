import { Image, View } from "react-native";


export default function InstaLetterIcon() {
    return (
        <View>
            <Image source={require('../../assets/instagramFontLogo.png')} resizeMode="stretch" style={{ width: 200, height: 70, }}/>
        </View>
    )
}