import { SafeAreaView, Image, Text, StyleSheet, Pressable, View, ScrollView, AppState } from 'react-native';
import { useAuth } from '../../../components/AuthProvider';
import ImagePickerExample from '../../../components/ImagePicker';
import { supabase } from '../../../../lib/supabase';
import Introduce from '../../../components/Introduce';
import { Link } from 'expo-router';



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
      <View style={{flex: 1, alignItems: 'flex-start',}}>

        <ScrollView horizontal={false} style={{flex: 1, maxWidth: '100%',}} showsVerticalScrollIndicator={false}>

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

      
      {self_introduce && <Text style={{paddingHorizontal: 15,}}>{self_introduce}</Text>}

      <View style={styles.profileButtonBox}> 

            <Link href='/screens/Profile/editProfile' style={styles.profileButton}>
            프로필 편집
            </Link>

        <Pressable style={styles.profileButton} onPress={() => console.log('you click')}>
            <Text>프로필 공유</Text>
        </Pressable>
      </View>

      </ScrollView>

      </View>
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
    alignSelf: 'flex-start'
  },
  profileButtonBox: {
    flexDirection: 'row', 
    padding: 10,
  },
  profileButton: {
    borderRadius: 5,
    backgroundColor: '#f4f4f4',
    paddingVertical: 5,
    paddingHorizontal: 57,
    margin: 3,
  }
})