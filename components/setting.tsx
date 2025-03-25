import { CircleHelp } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Popover from "react-native-popover-view";
import { useTheme } from "@/utils/styles/useTheme";
import { commonStyles } from "@/utils/styles/common";

type SettingProps = {
  name: string;
  value: () => React.ReactNode;
  inactive?: boolean;
  onPress?: () => void;
  paid?: boolean;
  help?: string;
};

export default function Setting(props: SettingProps) {
  const { colors, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: colors.border },
      ]}
    >
      <View style={styles.nameContainer}>
        <Text style={[commonStyles.text, { color: props.inactive ? colors.text.muted : colors.text.primary, marginTop: spacing.sm }]}>
          {props.name}
        </Text>
        {props.help && (
          <View style={styles.helpIcon}>
            <Popover
              backgroundStyle={styles.popoverBackground}
              popoverStyle={[
                styles.popover,
                { backgroundColor: colors.muted },
              ]}
              from={<CircleHelp size={16} color={props.inactive ? colors.text.muted : colors.text.primary} />}
            >
              <Text style={[commonStyles.textMuted, { color: colors.text.primary }]}>
                {props.help}
              </Text>
            </Popover>
          </View>
        )}
      </View>
      {props.inactive ? (
        null
      ) : (
        props.onPress ? (
          <Pressable onPress={props.onPress}>{props.value()}</Pressable>
        ) : (
          props.value()
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    maxHeight: 62,
  },
  nameContainer: {
    flex: 1,
    flexDirection: "row",
  },
  helpIcon: {
    marginTop: 12,
    marginLeft: 8,
  },
  popoverBackground: {
    backgroundColor: "transparent",
  },
  popover: {
    padding: 8,
  },
});