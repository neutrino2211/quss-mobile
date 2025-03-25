import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/utils/styles/useTheme";
import { commonStyles } from "@/utils/styles/common";

type HomeSectionProps = {
  title: string;
  empty: string;
  elements: { view: React.ReactNode; onPress?: () => void }[];
};

export default function HomeSection(props: HomeSectionProps) {
  const { colors, spacing } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[commonStyles.title, { color: colors.text.primary }]}>
        {props.title}
      </Text>
      <View>
        {props.elements.length === 0 && (
          <Text
            style={[commonStyles.subtitle, { color: colors.text.primary }]}
          >
            {props.empty}
          </Text>
        )}
        {props.elements.map((element, index) => (
          <Pressable
            key={index}
            style={styles.element}
            onPress={() => element.onPress?.()}
          >
            {element.view}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  element: {
    padding: 10,
  },
});