import HomeSection from '@/components/HomeSection'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Redirect, useRouter } from 'expo-router'
import { Pressable, Text, useColorScheme, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import styles from '@/utils/styles';
import { APP_THEME } from '@/utils/config';
import { Image } from 'expo-image';
import { CircleUserRound, Settings, User2 } from 'lucide-react-native';
import Navbar from '@/components/Navbar';

export default function Page() {
  const { user } = useUser()
  const colorScheme = useColorScheme()
  const router = useRouter();

  if (user == null || user == undefined) {
    router.replace('/(auth)/sign-in')
  }

  return (
    <View>
        <Navbar
            leftIcon={
                <Pressable onPress={() => {
                  router.push("/(home)/account")
                }}>
                    <CircleUserRound stroke={APP_THEME.$primary_color} strokeWidth={1.5} size={30} style={{marginVertical: "auto"}}/>
                </Pressable>
            }
            title={<Image source={require('../../assets/images/QUSS-Logo-Light-Outline.png')} style={{width: 25, height: 40}} />}
            rightIcon={
              <Pressable onPress={() => {
                router.push("/(home)/settings")
              }}>
                <Settings stroke={APP_THEME.$primary_color} strokeWidth={1.5} size={30} style={{marginVertical: "auto"}}/>
              </Pressable>
            }
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "column"
          }}
        >
          <Text style={{color: "white", fontSize: 48}}> What Are You Curious About Today?</Text>
          
        </View>
        {/* <HomeSection title="Recent Searches 1180-2743-1962-5378-9816" empty='No recent Searches' elements={[]} /> */}
    </View>
  )
}