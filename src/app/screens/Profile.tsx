import { View, Text, Button, SafeAreaView } from 'react-native';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../components/AuthProvider';
import { Stack } from 'expo-router';

export default function ProfileScreen() {

  const { username } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white',}}>

    </SafeAreaView>
  );
}