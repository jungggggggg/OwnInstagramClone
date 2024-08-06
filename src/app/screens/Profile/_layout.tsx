import { Link, Stack } from "expo-router";
import { StyleSheet, View } from 'react-native';
import { useAuth } from "../../../components/AuthProvider";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProfileLayout() {

  const { username } = useAuth();

  return (
    <Stack screenOptions={{
    }}>
      <Stack.Screen name="ProfilePage" options={{
          headerShown: true,
          headerTitleAlign: 'left',
          headerStyle: styles.header,
          title: `${username}`,
          headerTitleStyle: styles.headerTitle,
          headerLeft: () => (
            <View style={{ justifyContent: 'center', alignItems: 'center',}}>
            <Feather name="lock" size={15} color="black" style={{ marginLeft: 10, padding: 5,}}/>
            </View>
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',  }}>
              <Link href='../AddNewPost' style={{ marginHorizontal: 13}}>
            <FontAwesome name="plus-square-o" size={26} color="black"/>
            </Link>
            <Link href='./DeleteAccount' style={{ marginHorizontal: 13}}>
            <Feather name="menu" size={24} color="black"/>
            </Link>
            </View>
          ),
      }}
      />
      <Stack.Screen name="DeleteAccount" />
    </Stack>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white', 
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 23,
    paddingRight: 100,
  },
});