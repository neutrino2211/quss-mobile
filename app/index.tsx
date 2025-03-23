import { APP_THEME } from "@/utils/config";
import { Text, View } from "react-native";
import { Image } from 'expo-image';
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function Index() {
  const router = useRouter();
  const user = useUser();

  const [loaded, error] = useFonts({
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
    'NotoSans-Regular': require('../assets/fonts/NotoSans-Regular.ttf'),
    'NotoSans-Bold': require('../assets/fonts/NotoSans-Bold.ttf'),
    'NotoSans-Italic': require('../assets/fonts/NotoSans-Italic.ttf'),
  });

  useEffect(() => {
    setTimeout(() => {
      if (user.isSignedIn) {
        router.replace("/(home)");
      } else {
        router.push("/(auth)/sign-in");
      }
    }, 3000)
  },[])

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: APP_THEME.$primary_color,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/images/QUSS-Logo-xl.png")}
        style={{
          width: 250,
          height: 250,
        }}
      />
    </View>
  );
}
