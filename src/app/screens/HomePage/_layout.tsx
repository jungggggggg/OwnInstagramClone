import { Link, router, Stack } from "expo-router";
import { Image, StyleSheet, View, Text, TouchableOpacity, Pressable, Alert } from "react-native";
import InstaLetterIcon from "../../../components/InstaLetterIcon";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAuth } from "../../../components/AuthProvider";
import { supabase } from "../../../../lib/supabase";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';



export default function HomePageLayout() {

    const { username } = useAuth();

    const showAlert = () => {
        Alert.alert(
            'Log Out',
            'You will be returned to the login screen',
            [
                {
                    text: 'Cancel',
                    onPress: () => null,
                },
                {
                    text: 'Log Out',
                    onPress: async () => {
                        await supabase.auth.signOut()
                    },
                },
            ],
        )
    }

    const handlePress = () => {
        router.back();
    }

    return (
        <Stack>
            <Stack.Screen name="HomePageScreen"
                options={{
                    headerShown: true,
                    headerTitleAlign: 'left',
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <View style={{ width: 130, height: 45, }}>
                            <InstaLetterIcon />
                        </View>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', }}>
                            <Link href="/screens/HomePage/channel" style={styles.iconBox}>
                                <Ionicons name="heart-outline" size={30} color="black" />
                            </Link>
                            <Link href="/screens/HomePage/channel" style={styles.iconBox}>
                                <Ionicons name="paper-plane-outline" size={30} color="black" />
                            </Link>
                        </View>
                    ),

                }}
            />
            <Stack.Screen name="channel" options={{headerShown: false}} />
        </Stack>
    )
}

const styles = StyleSheet.create({
    iconBox: {
        paddingHorizontal: 10,
    },
    headerTitleFont: {
        fontWeight: '500',
        fontSize: 25,
    },
    headerTitleContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    headerTitle: {
        fontWeight: 'bold',
        fontSize: 23,
    },
    headerRight: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        marginHorizontal: 13,
    },
    accountHeaderTitle: {
        fontWeight: 'bold',
        fontSize: 14,
    },
})