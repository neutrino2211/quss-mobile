import { APP_THEME } from "@/utils/config"
import React from "react"
import { Pressable, StyleSheet, Text, useColorScheme, View } from "react-native"

type HomeSectionProps = {
  title: string,
  empty: string,
  elements: {view: React.ReactNode, onPress?: () => void}[],
}
export default function HomeSection(props: HomeSectionProps) {
  const colorScheme = useColorScheme();

  return (
    <View>
      <Text style={{...styles.title, color: APP_THEME.primary_text_color(colorScheme)}}>{props.title}</Text>
      <View>
        {
          props.elements.length == 0 && <Text style={{...styles.title, color: APP_THEME.primary_text_color(colorScheme), fontSize: 24}}>{props.empty}</Text>
        }
        {props.elements.map((element, index) => {
          return (
            <Pressable key={index} style={{padding: 10}} onPress={() => element.onPress?.()}>
              {element.view}
            </Pressable>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontFamily: "NotoSans-Italic",
    padding: 10,
  }
})