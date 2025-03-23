import React from "react"
import { View, useColorScheme } from "react-native"

type NavbarProps = {
  title?: React.ReactNode,
  leftIcon?: React.ReactNode,
  rightIcon?: React.ReactNode,
}

export default function Navbar(props: NavbarProps) {
  const colorScheme = useColorScheme(); 

  console.log({props})
  return (
    <View style={{padding: 10, paddingLeft: 10, height: 60, flexDirection: "row", justifyContent: "space-between", borderBottomColor: colorScheme === "dark" ? "#333" : "#ddd", borderBottomWidth: 1}}>
      {props.leftIcon || <View/>}
      {props.title || <View/>}
      {props.rightIcon || <View/>}
    </View>
  )
}