import React, { useState } from "react";
import {
  View,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import ChatInput from "../../../components/Chat/ChatInput";
import ChatContainer from "../../../components/Chat/ChatContainer";
import COLORS from "../../../constants/colors";
import IMAGES from "../../../assets/index";
import { DrawerParamList } from "../../../navigation/DrawerNavigator";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ChatMessage } from "../../../components/Chat/ChatInput";

type HomeScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "Home">;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const [chatList, setChatList] = useState<ChatMessage[]>([]);
  const [found, setFound] = useState<boolean>(false);
  const [responseCount, setResponseCount] = useState<number>(0);

  const handleSendMessage = (newMessage: ChatMessage) => {
    setChatList((prev) => [...prev, newMessage]);
    
    // assistant 응답인 경우 카운트 증가
    if (newMessage.role === "assistant") {
      setResponseCount((prev) => prev + 1);
    }
  };

  const handleFound = (foundValue: boolean) => {
    setFound(foundValue);
  };

  const handleRefreshChat = () => {
    setChatList([]);
    setFound(false);
    setResponseCount(0); // 응답 카운트도 초기화
  };

  // 새로고침 버튼 표시 조건: found가 true이거나 응답 카운트가 3회 이상
  const shouldShowRefreshButton = found || responseCount >= 3;

  return (
    <View
      style={[
        styles.inner,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
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
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Chat Area */}
        <View style={styles.chatContainer}>
          <ChatContainer chatList={chatList} />
        </View>

        {/* 대화 새로고침 버튼 */}
        {shouldShowRefreshButton && (
          <View style={styles.refreshContainer}>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefreshChat}>
              <Text style={styles.refreshText}>대화 새로고침 🔃</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Input */}
        <View style={styles.inputContainer}>
          <ChatInput onsend={handleSendMessage} chatList={chatList} onFound={handleFound} />
        </View>
      </KeyboardAvoidingView>
    </View>
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
    opacity: 1,
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
  refreshContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.FOOTER_BACKGROUND,
  },
  refreshButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  refreshText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  inputContainer: {
    paddingTop: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: COLORS.FOOTER_BACKGROUND,
  },
});

export default HomeScreen;
