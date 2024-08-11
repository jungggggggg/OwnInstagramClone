import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ImagePickerExample from "../../../components/ImagePicker";
import { useAuth } from "../../../components/AuthProvider";
import { useState } from "react";
import { supabase } from "../../../../lib/supabase";






export default function editProfile() {

    const { username, full_name, self_introduce } = useAuth();

    const [isName, setIsName] = useState(full_name);
    const [isFullName, setIsFullName] = useState(username);
    const [isSelfIntroduce, setIsSelfIntroduce] = useState(self_introduce);

    async function updateFullName() {
        const { error } = await supabase
          .from('profiles')
          .update({ full_name: isName })
          .eq('username', username); 
    
        if (error) {
          Alert.alert('Error updating introduce:', error.message);
        } else {
          Alert.alert('Introduce updated successfully');
          // 업데이트 후 데이터 다시 가져오기
          const { data } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('username', username)
            .single();
          if (data) {
            setIsName(data.full_name || '');
          }
        }
      }

      async function updateUserName() {
        const { error } = await supabase
          .from('profiles')
          .update({ username: isFullName })
          .eq('username', username); 
    
        if (error) {
          Alert.alert('Error updating introduce:', error.message);
        } else {
          Alert.alert('Introduce updated successfully');
          // 업데이트 후 데이터 다시 가져오기
          const { data } = await supabase
            .from('profiles')
            .select('username')
            .eq('username', username)
            .single();
          if (data) {
            setIsFullName(data.username || '');
          }
        }
      }

      async function updateSelfIntroduce() {
        const { error } = await supabase
          .from('profiles')
          .update({ self_introduce: isSelfIntroduce })
          .eq('username', username); 
    
        if (error) {
          Alert.alert('Error updating introduce:', error.message);
        } else {
          Alert.alert('Introduce updated successfully');
          // 업데이트 후 데이터 다시 가져오기
          const { data } = await supabase
            .from('profiles')
            .select('self_introduce')
            .eq('username', username)
            .single();
          if (data) {
            setIsSelfIntroduce(data.self_introduce || '');
          }
        }
      }


    return (
        <View style={styles.mainContainer}>

            <View style={styles.imageChange}>
                <ImagePickerExample />


                <TouchableOpacity onPress={() => { }}>
                    <Text style={{ color: '#0095F6', padding: 15, }}>사진을 수정하려면 프로필을 클릭하세요!</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.columnStyle}>

                <View style={styles.rowStyle}>
                    <Text>이름</Text>
                    <TextInput  
                    value={isName}
                    onChangeText={setIsName} 
                    style={{marginLeft: 70,}} 
                    onEndEditing={updateFullName}
                    placeholder="이름을 입력하세요"/>
                </View>

                <View style={styles.rowStyle}>
                    <Text>사용자 이름</Text>
                    <TextInput style={{marginLeft: 30,}} 
                    value={isFullName}
                    onChangeText={setIsFullName}
                    onEndEditing={updateUserName}
                    placeholder="사용자 이름을 입력하세요"/>
                </View>

                <View style={styles.rowStyle}>
                    <Text>소개</Text>
                    <TextInput 
                    value={isSelfIntroduce}
                    onChangeText={setIsSelfIntroduce}
                    onEndEditing={updateSelfIntroduce}
                    style={{marginLeft: 70,}} 
                    placeholder="소개를 입력하세요"/>
                </View>


            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageChange: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    rowStyle: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: '#f5f5f5',
        padding: 15,
    },
    columnStyle: {
        flexDirection: 'column',
        padding: 5,

    }
})