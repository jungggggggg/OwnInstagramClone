import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../components/AuthProvider";
import { useEffect } from "react";
import { UserProfile } from "../../components/AuthProvider";



export default function AllUsers () {

    const { showAllUsers, userList } = useAuth();

    useEffect(() => {
        showAllUsers();
    },[])

    const renderItem = ({ item }: { item: UserProfile}) => (
        <View style={styles.renderItemBox}>
            {/* 프로필이미지 */}
            <View>
                <Image source={{ uri: item.avatar_url }} style={styles.avatarBox}/>
            </View>

            {/* 이름, 태그 순 */}
            <View style={{ flexDirection: 'column', justifyContent: 'center',  }}>
                <Text style={{ fontWeight: 'bold', }}>{item.username}</Text>
                <Text style={{ color: '#9e9e9e'}}>{item.full_name}</Text>
            </View>
            
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white',}}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, padding: 10,}} >모든 사용자</Text>
            <FlatList
            data={userList}
            renderItem={renderItem}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    renderItemBox: {
        flexDirection: 'row', 
        padding: 15, 
    },
    avatarBox: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 15,
    }
})