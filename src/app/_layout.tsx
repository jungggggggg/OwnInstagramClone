import { Redirect, Slot, Stack, useRouter } from "expo-router";
import AuthProvider from "../components/AuthProvider";

export default function RootLayout() {

    return (
        <AuthProvider>
            <Stack>
                <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
            </Stack>    
        </AuthProvider>
    );
}