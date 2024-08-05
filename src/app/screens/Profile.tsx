import { View, Text, Button, SafeAreaView } from 'react-native';
import { supabase } from '../../../lib/supabase';
import { useAuth } from '../../components/AuthProvider';

export default function ProfileScreen() {

  const { user } = useAuth();

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <Text>User id: {user?.id}</Text>

      <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
    </SafeAreaView>
  );
}