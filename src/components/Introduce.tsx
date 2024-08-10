import { useEffect, useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import { supabase } from "../../lib/supabase";
import { useAuth } from "./AuthProvider";

export default function Introduce() {
  const [selfIntroduce, setSelfIntroduce] = useState('');
  const { username } = useAuth();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 self_introduce 값을 가져옵니다.
    const fetchIntroduce = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('self_introduce')
        .eq('username', username)
        .single();

      if (error) {
        Alert.alert('Error fetching data:', error.message);
      } else if (data) {
        setSelfIntroduce(data.self_introduce || '');
      }
    };

    fetchIntroduce();
  }, [username]);

  async function updateIntroduce() {
    const { error } = await supabase
      .from('profiles')
      .update({ self_introduce: selfIntroduce })
      .eq('username', username); // WHERE 절을 추가하여 특정 사용자의 데이터만 업데이트

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
        setSelfIntroduce(data.self_introduce || '');
      }
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Introduce yourself"
        value={selfIntroduce}
        onChangeText={setSelfIntroduce}
        onEndEditing={updateIntroduce}
      />
    </View>
  );
}