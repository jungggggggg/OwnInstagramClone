import { Redirect, Slot, Stack, useRouter } from "expo-router";
import AuthProvider from "../components/AuthProvider";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MakeChat from "../components/MakeChat";
import ChatProvider from "../components/MakeChat";

export default function RootLayout() {

    
    return (
            <GestureHandlerRootView>
        <AuthProvider>
            <Stack screenOptions={{ headerShown: false, }}>
                <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
            </Stack>   
        </AuthProvider>
            </GestureHandlerRootView> 
    );
}

const styles = StyleSheet.create({
    header:{
        height: 100,
    }
})