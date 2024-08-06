import { View, Text, Button, SafeAreaView, Image } from 'react-native';
import { supabase } from '../../../../lib/supabase';
import { useAuth } from '../../../components/AuthProvider';
import { Stack } from 'expo-router';
import ImagePickerExample from '../../../components/ImagePicker';

export default function ProfileScreen() {

  const { avatar_url } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',}}>
        <Image source={{ uri: avatar_url }} style={{ width: 100, height: 100, borderRadius: 50 }} />
      <ImagePickerExample />
    </SafeAreaView>
  );
}