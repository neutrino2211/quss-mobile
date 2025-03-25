import { ColorSchemeName } from "react-native";

export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  border: string;
  muted: string;
};

export type Spacing = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type Typography = {
  fontFamily: {
    regular: string;
    italic: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
};

const lightColors: ThemeColors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  background: "#FFFFFF",
  text: {
    primary: "#000000",
    secondary: "#3C3C43",
    muted: "#8E8E93",
  },
  border: "#C6C6C8",
  muted: "#F2F2F7",
};

const darkColors: ThemeColors = {
  primary: "#0A84FF",
  secondary: "#5E5CE6",
  background: "#000000",
  text: {
    primary: "#FFFFFF",
    secondary: "#EBEBF5",
    muted: "#98989F",
  },
  border: "#38383A",
  muted: "#1C1C1E",
};

export const spacing: Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography: Typography = {
  fontFamily: {
    regular: "NotoSans",
    italic: "NotoSans-Italic",
    bold: "NotoSans-Bold",
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
};

export const getThemeColors = (colorScheme: ColorSchemeName): ThemeColors => {
  return colorScheme === "dark" ? darkColors : lightColors;
};

export const theme = {
  colors: {
    light: lightColors,
    dark: darkColors,
  },
  spacing,
  typography,
}; 