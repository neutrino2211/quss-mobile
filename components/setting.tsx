import { APP_THEME } from "@/utils/config"
import { CircleHelp, ShieldQuestion } from "lucide-react-native";
import { Pressable, Text, useColorScheme, View } from "react-native"
import Popover from "react-native-popover-view";

type SettingProps = {
  name: string,
  value: () => React.ReactNode,
  onPress?: () => void,
  paid?: boolean
  help?: string
}

export default function Setting(props: SettingProps) {
  const colorScheme = useColorScheme();
  return (
    <View style={{
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      marginHorizontal: 20,
      marginTop: 10,
      borderBottomColor: APP_THEME.muted_color(colorScheme),
      borderBottomWidth: 1,
      maxHeight: 62
    }}>
      <View style={{flex: 1, flexDirection: "row"}}>
        <Text style={{fontSize: 16, color: APP_THEME.primary_text_color(colorScheme), marginVertical: 8}}>
          {props.name}
        </Text>
        {
          props.help ?
          <View style={{
            marginTop: 12,
            marginLeft: 8
          }}>
            <Popover 
              backgroundStyle={{
                backgroundColor: "transparent"
              }}
              popoverStyle={{
                padding: 8,
                backgroundColor: APP_THEME.muted_color(colorScheme)
              }}
              from={
                <CircleHelp size={16} color={APP_THEME.primary_text_color(colorScheme)}/>
              }
            >
              <Text style={{color: APP_THEME.primary_text_color(colorScheme)}}>{props.help}</Text>
            </Popover>
          </View>
          : null
        }
      </View>
      {props.onPress ? <Pressable onPress={props.onPress}>{props.value()}</Pressable> : props.value()}
    </View>
  )
}