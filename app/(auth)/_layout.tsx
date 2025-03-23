import { Redirect, Slot, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { useColorScheme, View } from 'react-native'
import { APP_THEME } from '@/utils/config'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()
  const colorScheme = useColorScheme()

  if (isSignedIn) {
    return <Redirect href={'/(home)'} />
  }

  return (
    <View style={{
      height: "100%",
      backgroundColor: APP_THEME.primary_color(colorScheme)
    }}>
      <Slot/>
    </View>
  )
}