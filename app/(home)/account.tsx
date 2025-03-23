import Navbar from "@/components/Navbar";
import { APP_THEME } from "@/utils/config";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { ArrowLeftCircle, Settings } from "lucide-react-native";
import { useState, useEffect } from "react";
import { Pressable, Text, TextInput, useColorScheme, View, Keyboard, ActivityIndicator } from "react-native";

export default function AccountsPage() {
    const { signOut } = useAuth()
    const { user } = useUser();
    const router = useRouter();
    const colorScheme = useColorScheme();

    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

        return () => {
        showSubscription.remove();
        };
    }, []);

    const handleKeyboardShow = (_: any) => {
        setIsKeyboardVisible(true);
    };

    const handleKeyboardHide = (_: any) => {
        setIsKeyboardVisible(false);
    };

    return (
        <View style={{height: "100%"}}>
            <Navbar
                rightIcon={<Text style={{color: APP_THEME.primary_heading_color(colorScheme), fontSize: 16, fontFamily: "NotoSans-ExtraLight", marginTop: 8}}>My Account</Text>}
                leftIcon={
                    <Pressable onPress={() => {
                        router.back()
                    }}>
                        <ArrowLeftCircle stroke={APP_THEME.$primary_color} strokeWidth={1.5} size={30} style={{marginVertical: "auto"}}/>
                    </Pressable>
                }
            />

            <View style={{flexDirection: "row", marginHorizontal: 20, width: "100%", paddingVertical: 20}}>
                <View style={{borderRadius: "50%", backgroundColor: APP_THEME.muted_color(colorScheme), width: 80, height: 80}}>
                    <Text style={{fontSize: 60, fontFamily: "NotoSans-Bold", marginHorizontal: "auto", color: APP_THEME.primary_text_color(colorScheme)}}>{user?.firstName?.[0].toUpperCase()}</Text>
                </View>
                <View style={{marginLeft: 20, marginVertical: "auto"}}>
                    <Text style={{fontSize: 24, fontFamily: "NotoSans-Bold", color: APP_THEME.primary_text_color(colorScheme)}}>{user?.firstName} {user?.lastName}</Text>
                    <Text style={{fontSize: 16, fontFamily: "NotoSans-Regular", color: APP_THEME.primary_text_color(colorScheme)}}>{user?.emailAddresses[0].emailAddress}</Text>
                </View>
            </View>

            <View>
                <View
                    style={{
                        borderColor: APP_THEME.muted_color(colorScheme),
                        borderWidth: 1,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                        marginVertical: 10,
                    }}
                >
                    <Text style={{
                        color: APP_THEME.muted_placeholder(colorScheme),
                        fontSize: 16,
                        fontFamily: "NotoSans-Regular",
                    }}>@{user?.username}</Text>
                </View>
                <TextInput
                    style={{
                        backgroundColor: APP_THEME.muted_color(colorScheme),
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                        marginVertical: 10,
                        color: APP_THEME.primary_text_color(colorScheme),
                        fontSize: 16,
                        fontFamily: "NotoSans-Regular",
                    }}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="Current Password"
                    placeholderTextColor={APP_THEME.muted_placeholder(colorScheme)}
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text)
                    }}
                />
                <TextInput
                    style={{
                        backgroundColor: APP_THEME.muted_color(colorScheme),
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 10,
                        marginHorizontal: 20,
                        marginVertical: 10,
                        color: APP_THEME.primary_text_color(colorScheme),
                        fontSize: 16,
                        fontFamily: "NotoSans-Regular",
                    }}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    placeholder="New Password"
                    placeholderTextColor={APP_THEME.muted_placeholder(colorScheme)}
                    value={newPassword}
                    onChangeText={(text) => {
                        setNewPassword(text)
                    }}
                />
                <Pressable onPress={async () => {
                    setLoading(true)
                    const res = await user?.updatePassword({currentPassword: password, newPassword});
                    console.log({res})
                    setLoading(false)
                    setNewPassword("")
                    setPassword("")

                }}>
                    <View style={APP_THEME.button_style(colorScheme)}>
                        {
                            loading ?
                            <ActivityIndicator size={29} color={"white"}/>
                            : <Text style={{fontSize: 16, fontFamily: "NotoSans-Bold", color: APP_THEME.$primary_color, textAlign: "center"}}>SAVE</Text>
                        }
                    </View>
                </Pressable>
            </View>

            {
                !isKeyboardVisible &&
                <View style={{position: "absolute", bottom: 0, width: "100%"}}>
                    <Pressable onPress={() => {
                        signOut().then(() => router.replace("/(auth)/sign-in"))
                    }}>
                        <View style={APP_THEME.button_style(colorScheme)}>
                            <Text style={{fontSize: 16, fontFamily: "NotoSans-Bold", color: APP_THEME.$destructive_action_color, textAlign: "center", marginHorizontal: "auto"}}>LOGOUT</Text>
                        </View>
                    </Pressable>
                </View>
            }
        </View>
    )
}