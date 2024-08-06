import { Redirect, Slot, Stack, useRouter } from "expo-router";
import AuthProvider from "../components/AuthProvider";
import { StyleSheet } from "react-native";

export default function RootLayout() {

    return (
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false, }}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
            </Stack>    
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    header:{
        height: 100,
    }
})