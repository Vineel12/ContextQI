import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="settings/index" options={{ title: 'Settings' }} />
        <Stack.Screen name="settings/profile" options={{ title: 'Profile' }} />
        <Stack.Screen name="settings/privacy" options={{ title: 'Privacy & Security' }} />
        <Stack.Screen name="settings/help" options={{ title: 'Help & Support' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
