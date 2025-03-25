import { useColorScheme } from "react-native";
import { ThemeColors, getThemeColors, spacing, theme, typography } from "./theme";

export const useTheme = () => {
  const colorScheme = useColorScheme();
  const colors = getThemeColors(colorScheme);

  return {
    colors,
    spacing,
    typography,
    colorScheme,
  };
};

export type Theme = {
  colors: ThemeColors;
  spacing: typeof spacing;
  typography: typeof typography;
  colorScheme: ReturnType<typeof useColorScheme>;
}; 