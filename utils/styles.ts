import { StyleSheet } from "react-native";
import { APP_THEME } from "./config";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  text_light: {
    color: "#fff",
  },

  text_dark: {
    color: APP_THEME.$primary_color,
  },

  gradient_light: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  }
});