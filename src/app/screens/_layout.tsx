import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '../../components/AuthProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Alert, StyleSheet, Image, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../../lib/supabase';
import { useState } from 'react';

export default function ProtectedLayout() {
  const { isAuthenticated, avatar_url } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="../(auth)/SignIn" />;
  }

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
          onPress: () => supabase.auth.signOut(),
        },
      ],
    )
  }

  const [isPressed, setIsPressed] = useState(false);

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false}}>
      <Tabs.Screen name="HomePage" options={{ headerShown: false, 
      tabBarActiveTintColor: 'black',
        tabBarIcon: ({ color }) => <MaterialIcons name="home-filled" size={24} color={color} />,
      }}/>
      <Tabs.Screen name="SearchPage" options={{ headerShown: false, 
      tabBarActiveTintColor: 'black',
        tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={ color } />
      }}/>
      <Tabs.Screen name="AddNewPost" options={{ headerShown: false,
      tabBarActiveTintColor: 'black',
        tabBarIcon: ({ color }) => <FontAwesome name="plus-square-o" size={24} color={ color } />,
       }}/>
      <Tabs.Screen name="Profile" 
      options={{ headerShown: false, 
        tabBarActiveTintColor: 'black',
        tabBarIcon: ({ focused }) => (
          <View style={[styles.iconContainer, focused && styles.pressed]}>
          <Image 
            source={{ uri: avatar_url }} 
            style={styles.avatar}
          />
        </View>
      )}}
        />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 24,
    padding: 1, 
  },
  pressed: {
    borderColor: 'black',
    borderWidth: 1,
  },
  avatar: {
    width: 24,  
    height: 24, 
    borderRadius: 12,
  },
});