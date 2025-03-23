import { APP_THEME } from '@/utils/config'
import { Slot, Stack } from 'expo-router'
import { useColorScheme, View } from 'react-native'

export default function Layout() {
  const colorScheme = useColorScheme()
  return (
    <Stack screenOptions={{navigationBarHidden: true, headerShown: false }}>
      <Stack.Screen name="index" options={{
        contentStyle: {
          height: "100%",
          backgroundColor: APP_THEME.primary_color(colorScheme)
        }
      }}/>
      <Stack.Screen name="account" options={{
        contentStyle: {
          height: "100%",
          backgroundColor: APP_THEME.primary_color(colorScheme)
        }
      }}/>
      <Stack.Screen name="settings" options={{
        contentStyle: {
          height: "100%",
          backgroundColor: APP_THEME.primary_color(colorScheme)
        }
      }}/>
    </Stack>
  )
}