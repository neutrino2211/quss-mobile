import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, useColorScheme, Pressable } from 'react-native'
import React, { useState } from 'react'
import { APP_THEME } from '@/utils/config'
import { Image } from 'expo-image'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [error, setError] = useState("");
  const colorScheme = useColorScheme();

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      setError("Invalid Credentials")
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: APP_THEME.primary_color(colorScheme),
      width: "100%"
    }}>
      <View style={{
        alignItems: "center"
      }}>
        <Image source={require('../../assets/images/QUSS-Full-Light-l.png')} style={{width: 160, height: 100, marginVertical: 40}} />
      </View>
      <TextInput
        style={{
          backgroundColor: APP_THEME.muted_color(colorScheme),
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          marginHorizontal: 20,
          marginVertical: 10,
          color: APP_THEME.primary_text_color(colorScheme),
          fontSize: 16,
          fontFamily: "NotoSans-Regular",
        }}
        placeholder="Email"
        placeholderTextColor={APP_THEME.muted_placeholder(colorScheme)}
        value={emailAddress}
        onChangeText={(text) => {
          setEmailAddress(text)
        }}
      />
      <TextInput
        style={{
          backgroundColor: APP_THEME.muted_color(colorScheme),
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 10,
          marginHorizontal: 20,
          marginVertical: 10,
          color: APP_THEME.primary_text_color(colorScheme),
          fontSize: 16,
          fontFamily: "NotoSans-Regular",
        }}
        placeholder="Password"
        placeholderTextColor={APP_THEME.muted_placeholder(colorScheme)}
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => {
          setPassword(text)
        }}
      />
      <Pressable onPress={onSignInPress}>
          <View style={{
            backgroundColor: APP_THEME.$primary_color,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            marginHorizontal: 20,
            marginVertical: 10,
          }}>
            <Text style={{fontSize: 16, fontFamily: "NotoSans-Bold", color: "white", textAlign: "center", marginHorizontal: "auto"}}>SIGN IN</Text>
          </View>
        </Pressable>
      <View style={{
        marginHorizontal: 20
      }}>
        {error ? <Text style={{fontFamily: "NotoSans-Bold", color: APP_THEME.$destructive_action_color}}>{error}</Text> : null}
        <Text style={{fontFamily: "NotoSans-Bold", color: APP_THEME.primary_text_color(colorScheme)}}>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text style={{fontFamily: "NotoSans-Bold", textDecorationLine: "underline", color: APP_THEME.primary_text_color(colorScheme)}}>Sign Up</Text>
        </Link>
      </View>
    </View>
  )
}