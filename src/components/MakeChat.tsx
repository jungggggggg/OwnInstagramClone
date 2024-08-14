import { Slot } from 'expo-router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';
import { useAuth } from './AuthProvider';

const API_KEY = process.env.EXPO_PUBLIC_STREAM_KEY;
const client = StreamChat.getInstance(API_KEY);

export default function ChatProvider({children}: PropsWithChildren) {
    const [isReady, setIsReady] = useState(false);
    const { userId, full_name, avatar_url, isProfile } = useAuth();

    useEffect(() => {
        if (!isProfile) {
            return;
        }

        const connect = async () => {
            // 이전 연결이 있는지 확인
            if (client.userID) {
                await client.disconnectUser();
            }

            await client.connectUser(
                {
                    id: userId,
                    name: full_name,
                    image: avatar_url,
                },
                client.devToken(userId)
            );
            setIsReady(true);
        };

        connect();

        return () => {
            if (isReady) {
                client.disconnectUser();
            }
            setIsReady(false);
        };
    }, [userId]);

    if (!isReady) {
        return <ActivityIndicator />;
    }

    return (
        <OverlayProvider>
            <Chat client={client}>
                {children}
            </Chat>
        </OverlayProvider>
    );
}