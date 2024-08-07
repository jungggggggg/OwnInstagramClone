import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '../../components/AuthProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet, Image, View } from 'react-native';
export default function ProtectedLayout() {
  const { isAuthenticated, avatar_url } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/SignIn" />;
  }


  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, headerShown: false}}>
      <Tabs.Screen name="HomePage" options={{ headerShown: false, 
      tabBarActiveTintColor: 'black',
        tabBarIcon: ({ focused }) => 
        <MaterialIcons name="home-filled" size={focused ? 30 : 24} color="black" />,
      }}/>
      <Tabs.Screen name="SearchPage" options={{ headerShown: false, 
      tabBarActiveTintColor: 'black',
        tabBarIcon: ({ focused }) => 
        <AntDesign name="search1" size={focused ? 30 : 24} color="black" />
      }}/>
      <Tabs.Screen name="AddNewPost" options={{ headerShown: false,
      tabBarActiveTintColor: 'black',
        tabBarIcon: ({ focused }) => 
        <FontAwesome name="plus-square-o" size={focused ? 30 : 24} color="black" />,
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