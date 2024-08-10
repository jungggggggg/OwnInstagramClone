import { SafeAreaView, Image, Text, StyleSheet, Pressable, View, ScrollView, AppState } from 'react-native';
import { useAuth } from '../../../components/AuthProvider';
import ImagePickerExample from '../../../components/ImagePicker';
import { supabase } from '../../../../lib/supabase';
import Introduce from '../../../components/Introduce';



AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function ProfileScreen() {

  const { full_name, username, self_introduce } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', alignItems: 'flex-start' }}>
      <View style={{ padding: 15, alignItems: 'center', flexDirection: 'row', }}>
        <ImagePickerExample />

        <View style={styles.containInfo}>
          <Text>0</Text>
          <Text>게시물</Text>
        </View>

        <View style={styles.containInfo}>
          <Text>46</Text>
          <Text>팔로워</Text>
        </View>

        <View style={styles.containInfo}>
          <Text>58</Text>
          <Text>팔로우</Text>
        </View>

      </View >

      <Text style={styles.fullNameText}>{full_name}</Text>

      <View style={styles.usernameBox}>
        <Text>@ {username}</Text>
      </View>

    <Introduce />
      {self_introduce && <Text>{self_introduce}</Text>}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullNameText: {
    fontWeight: '600',
    paddingHorizontal: 15,
  },
  containInfo: {
    padding: 28,
    flexDirection: 'column',
    alignItems: 'center',
  },
  usernameBox: {
    borderRadius: 20,
    backgroundColor: '#f4f4f4',
    padding: 6,
    margin: 10,
  }
})