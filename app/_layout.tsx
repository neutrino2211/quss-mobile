import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { Stack } from "expo-router";
import { tokenCache } from '@/utils/cache';
import { APP_THEME } from '@/utils/config';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
  const colorScheme = useColorScheme()

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <Stack screenOptions={{
          headerShown: false,
          statusBarStyle: colorScheme === "dark"? "light" : "dark",
          statusBarBackgroundColor: colorScheme === "dark" ? "#000" : "#fff"
        }}/>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
