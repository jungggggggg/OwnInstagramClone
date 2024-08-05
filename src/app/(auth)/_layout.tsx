import { Redirect, Slot, Stack } from 'expo-router';
import { useAuth } from '../../components/AuthProvider';

export default function AuthLayout() {

  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="../screens/Profile" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="SignUp" />
    </Stack>
  )
}