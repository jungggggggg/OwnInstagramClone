import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import { Stack } from 'expo-router';
import { useAuth } from '../../../components/AuthProvider';
import { Link } from 'expo-router';
import { Feather, FontAwesome, AntDesign } from '@expo/vector-icons';
import { supabase } from '../../../../lib/supabase';

export default function AppStack() {
  const { username } = useAuth();

  const showAlert = () => {
    Alert.alert(
      'Log Out',
      'You will be returned to the login screen',
      [
        { 
          text: 'Cancel',
          onPress: () => null,
        },
        {
          text: 'Log Out',
          onPress: async () => {
            await supabase.auth.signOut()
        },
        },
      ],
    )
  }

  return (
    <Stack>
      <Stack.Screen 
        name="ProfilePage" 
        options={{
          headerShown: true,
          headerTitleAlign: 'left',
          headerTitle: () => (
            <Pressable onPress={showAlert} style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>
                {username} <AntDesign name="down" size={15} color="black" />
              </Text>
            </Pressable>
          ),
          headerStyle: {
            backgroundColor: 'white',
          },
          headerLeft: () => (
            <View>
              <Feather name="lock" size={15} color="black" />
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <Link href='/screens/AddNewPost' style={styles.link}>
                <FontAwesome name="plus-square-o" size={28} color="black"/>
              </Link>
              <Pressable onPress={showAlert} style={styles.link}>
                <Feather name="menu" size={28} color="black"/>
                </Pressable>
            </View>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    marginHorizontal: 13,
  },
  accountHeaderTitle:{
    fontWeight: 'bold',
    fontSize: 14,
  },
});