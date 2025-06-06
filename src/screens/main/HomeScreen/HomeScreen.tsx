import React, { useState, useEffect} from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Keyboard,
    KeyboardEvent,
    Dimensions,
} from "react-native";
import {
    useSafeAreaInsets,SafeAreaView,
} from "react-native-safe-area-context";
import {
    useNavigation,
    DrawerActions,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IMAGES from "../../../assets/index";
import ChatInput from "./ChatInput";
import ChatContainer from "./ChatContainer";
import COLORS from "../../../constants/colors";
import CustomKeyboardAvoidingView from '../../../components/CustomKeyboardAvoidingView/CustomKeyboardAvoidingView';

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
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    const handleSendMessage = (newMessage: ChatMessage) => {
        setChatList((prev) => [...prev, newMessage]);
    };

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <View style={[styles.root]}>
            {/* Top Safe Area */}
            <View style={{ zIndex: 100, height: insets.top, backgroundColor: COLORS.HEADER_BACKGROUND }} />

            {/* Header */}
            <View style={styles.topContainer}>
                <TouchableOpacity
                    style={styles.tabBtn}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                >
                    <Image
                        source={IMAGES.TABICON}
                        style={styles.tabBtnImg}
                    />
                </TouchableOpacity>
                <Text style={styles.title}>
                    Home
                </Text>
            </View>

            {/* Chat & Input Area */}
            <CustomKeyboardAvoidingView style={{ flex: 1 }}>
                {/* Chat Container */}
                <View style={styles.chatContainer}>
                    <ChatContainer chatList={chatList} />
                </View>

                {/* Chat Input */}
                <View style={styles.inputContainer}>
                    <ChatInput onsend={handleSendMessage} />
                </View>
            </CustomKeyboardAvoidingView>
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
        left: 10,
        padding: 10,
    },
    tabBtnImg: {
        width: 25,
        height: 25,
    },
    chatContainer: {
        flex : 1,
        paddingVertical: 10,
        backgroundColor: COLORS.MAIN_BACKGROUND,
    },
    inputContainer: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: COLORS.FOOTER_BACKGROUND,
    }
});

export default HomeScreen;