import { Slot } from 'expo-router';
import { useEffect } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, OverlayProvider } from 'stream-chat-expo';



const API_KEY = process.env.EXPO_PUBLIC_STREAM_KEY
const client = StreamChat.getInstance(API_KEY);

export default function MakeChat() {

    useEffect(() => {
        const connect = async () => {
            await client.connectUser(
                {
                  id: 'jlahey',
                  name: 'Jim Lahey',
                  image: 'https://i.imgur.com/fR9Jz14.png',
                },
                client.devToken('jlahey')
              );

            //   const channel = client.channel('messaging', 'the_park', {
            //     name: 'The Park',
            //   })
            //   await channel.watch();
        }

        connect();
    },[])

    return (
        <OverlayProvider>
            <Chat client={client}>
            <Slot />
            </Chat>
        </OverlayProvider>
    )
}