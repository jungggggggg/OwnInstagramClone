import { Redirect, Tabs } from 'expo-router';
import { useAuth } from '../../components/AuthProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="../(auth)/SignIn" />;
  }

  return (
    <Tabs screenOptions={{ tabBarShowLabel: false, }}>
      <Tabs.Screen name="HomePage" options={{ headerShown: false, 
      tabBarActiveTintColor: 'white',
        tabBarIcon: ({ color }) => <MaterialIcons name="home-filled" size={24} color={color} />,
      }}/>
      <Tabs.Screen name="SearchPage" options={{ headerShown: false, 
        tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={ color } />
      }}/>
      <Tabs.Screen name="AddNewPost" options={{ headerShown: false,
        tabBarIcon: ({ color }) => <FontAwesome name="plus-square-o" size={24} color={ color } />,
       }}/>
      <Tabs.Screen name="Profile" options={{ headerShown: false, }}/>
    </Tabs>
  )
}