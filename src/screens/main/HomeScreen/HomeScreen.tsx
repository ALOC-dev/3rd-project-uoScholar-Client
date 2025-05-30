import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Keyboard,
    Animated,
    Platform,
} from "react-native";
import {
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IMAGES from "../../../assets/index";
import ChatInput from "./ChatInput";
import ChatContainer from "./ChatContainer";
import COLORS from "../../../constants/colors";

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
    const translateY = useState(new Animated.Value(0))[0];

    const handleSendMessage = (newMessage: ChatMessage) => {
        setChatList((prev) => [...prev, newMessage]);
    };

    // Custom Keyboard Handling
    useEffect(() => {
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const showSub = Keyboard.addListener(showEvent, (e) => {
            const height = e.endCoordinates.height;
            Animated.timing(translateY, {
                toValue: -height,
                duration: e.duration ?? 250,
                useNativeDriver: true,
            }).start();
        });

        const hideSub = Keyboard.addListener(hideEvent, (e) => {
            Animated.timing(translateY, {
                toValue: 0,
                duration: e.duration ?? 250,
                useNativeDriver: true,
            }).start();
    });

    return () => {
        showSub.remove();
        hideSub.remove();
    };
}, [translateY]);

    return (
        <View style={[styles.root]}>
            {/* Top Safe Area */}
            <View style={{ height: insets.top, backgroundColor: COLORS.HEADER_BACKGROUND }} />

            {/* Header */}
            <View style={styles.topContainer}>
                <Text style={styles.title}>
                    Chat
                </Text>
                <TouchableOpacity
                    style={styles.tabBtn}
                    onPress={() => navigation.navigate("Search")}
                >
                    <Image
                        source={IMAGES.TABICON}
                        style={styles.tabBtnImg}
                    />
                </TouchableOpacity>
            </View>

            {/* Chat & Input Area */}
            <Animated.View style={{ flex: 1, transform: [{ translateY }] }}>
                {/* Chat Container */}
                <View style={styles.chatContainer}>
                    <ChatContainer chatList={chatList} />
                </View>

                {/* Chat Input */}
                <View style={styles.inputContainer}>
                    <ChatInput onsend={handleSendMessage} />
                </View>
            </Animated.View>

            {/* Bottom Safe Area */}
            <View style={{ height: insets.bottom, backgroundColor: COLORS.FOOTER_BACKGROUND }} />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.HEADER_BACKGROUND,
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        zIndex: 100,
        backgroundColor: COLORS.HEADER_BACKGROUND,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
    },
    tabBtn: {
        position: "absolute",
        right: 10,
        padding: 10,
    },
    tabBtnImg: {
        width: 25,
        height: 25,
    },
    chatContainer: {
        flex: 1,
        backgroundColor: COLORS.MAIN_BACKGROUND,
    },
    inputContainer: {
        paddingVertical: 5,
        backgroundColor: COLORS.FOOTER_BACKGROUND,
    }
});

export default HomeScreen;