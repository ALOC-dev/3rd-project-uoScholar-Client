import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  SafeAreaView,
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

const { height } = Dimensions.get("window");

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      {/* 상단 SafeArea */}
      <SafeAreaView
        edges={["top"]}
        style={{ backgroundColor: COLORS.HEADER_BACKGROUND, flex: 1 }}
      >
        <View style={styles.root}>
          {/* Header */}
          <View style={styles.topContainer}>
            <Text style={styles.title}>Chat</Text>
            <TouchableOpacity
              style={styles.tabBtn}
              onPress={() => navigation.navigate("Search")}
            >
              <Image source={IMAGES.TABICON} style={styles.tabBtnImg} />
            </TouchableOpacity>
          </View>

          {/* Chat */}
          <View style={styles.chatContentContainer}>
            <ChatContainer chatList={chatList} />
          </View>

          {/* Input */}
          <View style={styles.bottomContainer}>
            <ChatInput onsend={handleSendMessage} />
          </View>
        </View>
        {/* 하단 SafeArea */}
        {/* <SafeAreaView edges={['bottom']} style={{ backgroundColor: COLORS.FOOTER_BACKGROUND }} /> */}
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  keyboardAvoiding: {
    flex: 1,
  },
  chatWrapper: {
    flex: 1,
  },
  chatContentContainer: {
    flex: 1,
    backgroundColor: COLORS.MAIN_BACKGROUND,
    paddingBottom: 10,
  },
  bottomContainer: {
    height: 65,
    bottom: 0,
    padding: 10,
    backgroundColor: COLORS.FOOTER_BACKGROUND,
  },
});

export default HomeScreen;
