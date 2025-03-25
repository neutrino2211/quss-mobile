import { StyleSheet } from "react-native";
import { spacing, typography } from "./theme";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  spaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginVertical: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.italic,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    marginBottom: spacing.xs,
  },
  text: {
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.regular,
  },
  textMuted: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
  },
}); 