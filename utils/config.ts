import { StyleProp, useColorScheme, ViewStyle } from "react-native";

export const APP_THEME = {
  $primary_color: "#439a85",
  $primary_text_color: "white",
  $destructive_action_color: "#e63946",

  primary_color: (scheme: ReturnType<typeof useColorScheme>) => scheme === "dark" ? "black" : "white",
  primary_text_color: (scheme: ReturnType<typeof useColorScheme>) => scheme === "dark" ? "white" : "black",
  primary_heading_color: (scheme: ReturnType<typeof useColorScheme>) => scheme === "dark"? "white" : "#439a85",

  muted_color: (scheme: ReturnType<typeof useColorScheme>) => scheme === "dark" ? "#333" : "#ddd",
  muted_placeholder: (scheme: ReturnType<typeof useColorScheme>) => scheme === "dark"? "#555" : "#aaa",

  button_style: (scheme: ReturnType<typeof useColorScheme>): StyleProp<ViewStyle> => {
    const isDark = scheme === "dark";

    return {
      backgroundColor: isDark ? "#222" : "#eee",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      marginHorizontal: 20,
      marginVertical: 10,
    };
  }
}