import { Redirect } from 'expo-router';
import { Text, View } from 'react-native';

export default function Root() {
  return <Redirect href="/(auth)/SignIn" />
}
