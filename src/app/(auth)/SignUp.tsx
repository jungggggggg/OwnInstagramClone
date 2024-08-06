import React, { useEffect, useState } from 'react'
import { Alert, AppState, StyleSheet, TextInput, View, Text, Pressable } from 'react-native'
import { supabase } from '../../../lib/supabase'
import { SafeAreaView } from 'react-native-safe-area-context'
import InstaLetterIcon from '../../components/InstaLetterIcon'
import { Link } from 'expo-router'
import { useAuth } from '../../components/AuthProvider'

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  const { username: dataUsername } = useAuth();

  useEffect(() => {
    if (email.includes('@') && password.length > 5 && fullname && username.length >= 4) {
      setIsDisabled(true); 
    } else {
      setIsDisabled(false); 
    }
  }, [email, password, fullname, username]);

  const handlePress = async () => {
    if (isDisabled) {

      const { data: existUser, error: usernameCheckError} = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username)

      if (usernameCheckError) {
        Alert.alert('Error checking username:', usernameCheckError.message)
        setLoading(false);
        return;
      }

      if (existUser.length > 0) {
        Alert.alert('Username already exists', 'Please choose a different username.')
        setLoading(false);
        return;
      }

      signUpWithEmail(email, password, username, fullname);
      setLoading(true);
    }
    setLoading(false);
  }

  async function signUpWithEmail(email: string, password: string, username: string, fullname: string) {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          full_name: fullname,
        },
      },
    });
  
    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }
  
    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({ id: userId, username: username, full_name: fullname });
  
      if (profileError) {
        Alert.alert('Error updating profile:', profileError.message);
      } 
    }
  
    setLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <InstaLetterIcon />
      <Text style={{ fontSize: 22, fontWeight: '500', textAlign: 'center', color: '#A38E95'}}>
        Sign up to see photos and videos from your friends.
        </Text>
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
          onChangeText={(text) => setFullname(text)}
          value={fullname}
          placeholder="Full Name"
          autoCapitalize={'none'}
          style={styles.input}
          placeholderTextColor='gray'
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={(text) => setUsername(text)}
          value={username}
          placeholder="Username (At least 4 characters)"
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
        <Pressable 
        onPress={handlePress} 
        disabled={!isDisabled}
        style={({ pressed }) => [
          !isDisabled ? styles.ButtonStyle : styles.CantPress
        ]}
        >
          <Text style={{ color: 'white', fontSize: 20,}}>Sign Up</Text>
        </Pressable>
      </View>
      <View style={{ alignItems: 'center', flexDirection: 'row', }}>
        <View style={{ height: 1, backgroundColor: 'gray', flex: 1, }} />
        <Text style={{ fontSize: 17, marginHorizontal: 30, marginVertical: 18, }}>OR</Text>
        <View style={{ height: 1, backgroundColor: 'gray', flex: 1, }} />
      </View>
      <View>
        <View style={{ flexDirection: 'row', }}>
          <Text style={{ color: '#8A8A8A', marginRight: 5, }}>Have an account?</Text>
          <Link href='/SignIn'>
          <Text style={{ fontWeight: 'bold', color: '#525252', paddingLeft: 5 }}>Sign In</Text>
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
    borderRadius: 4,
  },
  ButtonStyle: {
    flexDirection: 'row', 
    paddingVertical: 13, 
    backgroundColor: '#68B5FA',
    borderRadius: 13, 
    justifyContent: 'center'
  },
  CantPress:{
    backgroundColor: '#0095F6', 
    flexDirection: 'row', 
    paddingVertical: 13, 
    borderRadius: 13, 
    justifyContent: 'center'
  }

})