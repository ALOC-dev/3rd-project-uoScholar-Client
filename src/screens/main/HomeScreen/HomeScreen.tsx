import React, { useState } from 'react';
import {
    View,
    Image,
    Platform,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import ChatInput from "./ChatInput";
import ChatContainer from "./ChatContainer";
import COLORS from "../../../constants/colors";
import IMAGES from "../../../assets/index";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Home"
>;

export type ChatMessage = {
    message: string;
    sender: "bot" | "client";
};

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const insets = useSafeAreaInsets();
    const [chatList, setChatList] = useState<ChatMessage[]>([]);

    const handleSendMessage = (newMessage: ChatMessage) => {
        setChatList((prev) => [...prev, newMessage]);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[ styles.inner, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.tabBtn}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    >
                        <Image source={IMAGES.TABICON} style={styles.tabIcon} />
                    </TouchableOpacity>
                </View>
                
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >   
                    {/* Chat Area */}
                    <View style={styles.chatContainer}>
                        <ChatContainer chatList={chatList} />
                    </View>

                    {/* Input */}
                    <View style={styles.inputContainer}>
                        <ChatInput onsend={handleSendMessage} />
                    </View>
                </KeyboardAvoidingView> 
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        backgroundColor: COLORS.MAIN_BACKGROUND,
    },
    header: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        height: 50,
        backgroundColor: COLORS.MAIN_BACKGROUND,
    },
    tabBtn: {
        padding: 10,
    },
    tabIcon: {
        width: 24,
        height: 24,
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: COLORS.MAIN_BACKGROUND,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: COLORS.MAIN_BACKGROUND,
    },
    inputContainer: {
        padding: 10,
        backgroundColor: COLORS.FOOTER_BACKGROUND,
    },
});

export default HomeScreen;