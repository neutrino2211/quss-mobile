import Navbar from "@/components/Navbar";
import Setting from "@/components/setting";
import { APP_THEME } from "@/utils/config";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { ArrowLeftCircle, Settings } from "lucide-react-native";
import { useState, useEffect } from "react";
import { Pressable, Text, TextInput, useColorScheme, View, Keyboard, ActivityIndicator, Switch } from "react-native";

export default function SettingsPage() {
    const router = useRouter();
    const colorScheme = useColorScheme();
    const { user } = useUser();
    const [syncLibData, setSyncLibData] = useState(true);
    const [webSearch, setWebSearch] = useState(true);
    const [selectedSearchPriority, setSelectedSearchPriority] = useState(0);

    return (
        <View style={{height: "100%"}}>
            <Navbar
                rightIcon={<Text style={{color: APP_THEME.primary_heading_color(colorScheme), fontSize: 16, fontFamily: "NotoSans-ExtraLight", marginTop: 8}}>My Settings</Text>}
                leftIcon={
                    <Pressable onPress={() => {
                        router.back()
                    }}>
                        <ArrowLeftCircle stroke={APP_THEME.$primary_color} strokeWidth={1.5} size={30} style={{marginVertical: "auto"}}/>
                    </Pressable>
                }
            />

            <Text style={{fontSize: 16, color: APP_THEME.primary_text_color(colorScheme), marginTop: 16, marginLeft: 20, fontFamily: "NotoSans-Bold"}}>Basic Settings</Text>

            <Setting
                name="Sync library data"
                value={() => <Switch thumbColor={APP_THEME.$primary_color} value={syncLibData} onChange={(e) => setSyncLibData(!syncLibData)} />}
                onPress={() => void 0}
                help="Get the latest library contents each time you open the app. This might include new texts and documents sourced from 3rd party libraries"
            />

            <Setting
                name="Allow google searches"
                value={() => <Switch thumbColor={APP_THEME.$primary_color} value={webSearch} onChange={(e) => setWebSearch(!webSearch)} />}
                onPress={() => void 0}
                help="Allow Quss to make web searches if available texts in the library do not suffice. CAUTION: May include incorrect information"
            />

            <Setting
                name="Web search priority"
                inactive={!webSearch}
                value={() => 
                <Picker 
                style={{
                    width: "40%",
                    height: 60,
                    marginTop: -10,
                    color: APP_THEME.primary_text_color(colorScheme),
                }}
                itemStyle={{
                    color: APP_THEME.primary_text_color(colorScheme)
                }}
                selectedValue={selectedSearchPriority}
                
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedSearchPriority(itemValue)
                }>
                    <Picker.Item label="Low" value={1} />
                    <Picker.Item label="Medium" value={2} />
                    <Picker.Item label="High" value={3} />
                </Picker>
                }
                help="How important should web searches be considered compared to the internal Quss library (if enabled). Low = Use one or two web search results, Medium = Use two to four web search results, High = Use only one library result along with web search results"
            />

            {/** Upgrade to Pro Prompt */}
            {
                !user?.publicMetadata.paid && (
                    <View style={{marginHorizontal: 20, marginTop: 40}}>
                        <Text style={{fontSize: 16, color: APP_THEME.primary_text_color(colorScheme), fontFamily: "NotoSans-Bold"}}>Upgrade to Pro</Text>
                        <Text style={{fontSize: 14, color: APP_THEME.muted_placeholder(colorScheme), fontFamily: "NotoSans-Regular"}}>Get access to all features and content</Text>
                    </View>
                )
            }
        </View>
    )
}