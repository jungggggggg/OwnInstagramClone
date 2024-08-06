import { Link, Redirect, Tabs } from 'expo-router';
import { useAuth } from '../../components/AuthProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Alert, Button, Pressable, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { supabase } from '../../../lib/supabase';

export default function ProtectedLayout() {
  const { isAuthenticated, username } = useAuth();

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
      options={{ headerShown: true, 
        headerStyle: {height: 100,} ,
        tabBarActiveTintColor: 'black',
        title: `${username}`,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
          position: 'absolute',
          right: 45,
        },
        headerLeft: () => (
          <View style={{ justifyContent: 'center', alignItems: 'center',}}>
          <Feather name="lock" size={15} color="black" style={{ marginLeft: 10, padding: 5,}}/>
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  }}>
            <Link href='./AddNewPost' style={{ marginHorizontal: 13}}>
          <FontAwesome name="plus-square-o" size={26} color="black"/>
          </Link>
          <Pressable style={{ marginHorizontal: 13}} onPress={showAlert}>
          <Feather name="menu" size={24} color="black"/>
          </Pressable>
          </View>
        ),
      }}/>
    </Tabs>
  )
}