import * as React from 'react'
import { Text, TextInput, Button, View, useColorScheme, Pressable } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { APP_THEME } from '@/utils/config'
import { Image } from 'expo-image'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const colorScheme = useColorScheme();

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <>
        <Text>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
        />
        <Button title="Verify" onPress={onVerifyPress} />
      </>
    )
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
      <Pressable onPress={onSignUpPress}>
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
        <Text style={{fontFamily: "NotoSans-Bold", color: APP_THEME.primary_text_color(colorScheme)}}>Already have an account?</Text>
        <Link href="/sign-in">
          <Text style={{fontFamily: "NotoSans-Bold", textDecorationLine: "underline", color: APP_THEME.primary_text_color(colorScheme)}}>Sign In</Text>
        </Link>
      </View>
    </View>
  )
}