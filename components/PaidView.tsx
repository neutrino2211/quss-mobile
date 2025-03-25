import { useUser } from "@clerk/clerk-expo";
import { View, Text, Pressable } from "react-native";
import { useTheme } from "@/utils/styles/useTheme";
export default function PaidView({ children }: { children: React.ReactNode }) {
    const { colors } = useTheme();
    const { user } = useUser();

    if (!user) {
        return null;
    }

    if (!user.publicMetadata.paid) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 16, color: colors.text.secondary }}>
              This feature is available for paid subscribers only
            </Text>
            <Pressable
              style={{
                backgroundColor: colors.primary,
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8
              }}
              onPress={() => {
                // TODO: Implement payment flow
              }}
            >
              <Text style={{ color: colors.text.primary, fontSize: 16, fontWeight: '600' }}>
                Upgrade to Pro
              </Text>
            </Pressable>
          </View>
        );
    }

    return (
        <View>
            {children}
        </View>
    );
}   