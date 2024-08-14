import { router, Slot, Stack } from 'expo-router';
import { Alert, Pressable, View, StyleSheet, Text } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Chat, DeepPartial, defaultTheme, OverlayProvider, Theme } from 'stream-chat-expo';
import { useAuth } from '../../../../components/AuthProvider';
import { supabase } from '../../../../../lib/supabase';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ChatProvider from '../../../../components/MakeChat';





const theme: DeepPartial<Theme> = {
    messageSimple: {
        file: {
            container: {
                backgroundColor: 'white',
            }
        }
    }
}

export default function MakeChat() {

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
                <Stack.Screen name="ChattingPage" options={{
                headerShown: true,
                headerShadowVisible: false,
                headerTitle: () => (
                    <View style={{flexDirection: 'row'}}>
                        <MaterialIcons name="arrow-back-ios" size={27} color="black" onPress={handlePress}/>
                        <Pressable onPress={showAlert} style={styles.headerTitleContainer}>
                            <Text style={styles.headerTitle}>
                                {username} <AntDesign name="down" size={15} color="black" />
                            </Text>
                        </Pressable>
                    </View>
                ),
                headerBackVisible: false,
            }} />
                <Stack.Screen name='[cid]' options={{ }} />
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