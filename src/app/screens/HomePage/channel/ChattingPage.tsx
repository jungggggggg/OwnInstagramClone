import { StyleSheet, Text, View } from "react-native";
import SwitchComponent from "../../../../components/SearchBar";
import { ChannelList } from "stream-chat-expo";
import { router } from "expo-router";

export default function ChattingPage() {

    const headerComponent = () => {return <SwitchComponent />}

    return (
        <View style={styles.container}>
            <ChannelList 
            ListHeaderComponent={headerComponent}
            onSelect={(channel) => router.push(`/screens/HomePage/channel/${channel.cid}`)} 
            
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})