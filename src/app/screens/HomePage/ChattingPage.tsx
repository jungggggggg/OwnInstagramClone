import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import SwitchComponent from "../../../components/SearchBar";

export default function ChattingPage() {
    return (
        <View style={styles.container}>
            <SwitchComponent />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})