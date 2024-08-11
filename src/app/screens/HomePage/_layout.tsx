import { Stack } from "expo-router";
import { Image, View } from "react-native";
import InstaLetterIcon from "../../../components/InstaLetterIcon";



export default function HomePageLayout() {
    return (
        <Stack>
            <Stack.Screen name="HomePageScreen"
            options={{
                headerShown: true,
                headerTitleAlign: 'left',
                headerLeft: () => (
                    <View style={{ width: 130, height: 45,}}>
                    <InstaLetterIcon />
                    </View>
                )
            }}
            />
        </Stack>
    )
}