import React, { useEffect, useState } from 'react'
import { Alert, AppState, StyleSheet, TextInput, View, Text, Pressable } from 'react-native'
import { supabase } from '../../../lib/supabase'
import { SafeAreaView } from 'react-native-safe-area-context'
import InstaLetterIcon from '../../components/InstaLetterIcon'
import { Link, Stack, useRouter } from 'expo-router'

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (email.includes('@') && password.length > 5) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen />
      <InstaLetterIcon />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="Email"
          autoCapitalize={'none'}
          style={styles.input}
          placeholderTextColor='gray'
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          style={styles.input}
          placeholderTextColor='gray'
        />
      </View>
      <View style={{ alignSelf: 'stretch', marginVertical: 20,}}>
        <Pressable onPress={() => signInWithEmail()} 
        disabled={isDisabled}
        style={({pressed}) => [
          isDisabled ? { flexDirection: 'row', paddingVertical: 13, backgroundColor: '#68B5FA', borderRadius: 13, justifyContent: 'center',} :
          { flexDirection: 'row', paddingVertical: 13, backgroundColor: '#0095F6', borderRadius: 13, justifyContent: 'center',} 
        ]
        }
        >
          <Text style={{ color: 'white', fontSize: 20,}}>Log In</Text>
        </Pressable>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row', }}>
        <View style={{ height: 1, backgroundColor: 'gray', flex: 1, }} />
        <Text style={{ fontSize: 17, marginHorizontal: 30, marginVertical: 18, }}>OR</Text>
        <View style={{ height: 1, backgroundColor: 'gray', flex: 1, }} />
      </View>
      <View>
        <View style={{ flexDirection: 'row', }}>
          <Text style={{ color: '#8A8A8A', marginRight: 5, }}>Dont have an account?</Text>
          <Link href='/SignUp'>
          <Text style={{ fontWeight: 'bold', color: '#525252', }}>Sign Up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    flex: 1,
    paddingBottom: 100
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 5,
  },

})