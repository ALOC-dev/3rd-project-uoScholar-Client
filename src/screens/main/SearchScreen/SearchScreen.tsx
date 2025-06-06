import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from "react-native";
import {
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
    useNavigation,
    DrawerActions,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IMAGES from "../../../assets/index";
import COLORS from "../../../constants/colors";
import MainTabs from "../../../navigation/MainTabs";

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Search"
>;

export type ChatMessage = {
    message: string;
    sender: "bot" | "client";
};

const SearchScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const insets = useSafeAreaInsets();

    const [chatList, setChatList] = useState<ChatMessage[]>([]);

    const handleSendMessage = (newMessage: ChatMessage) => {
        setChatList((prev) => [...prev, newMessage]);
    };

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
                    Search
                </Text>
            </View>

            {/* Body */}
            <View style={styles.mainContainer}>
                <MainTabs />
            </View>
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
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.MAIN_BACKGROUND,
    },
});

export default SearchScreen;