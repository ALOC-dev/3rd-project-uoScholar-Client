import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import IMAGES from "../../assets";
import { chatApi, ChatResponse } from "../../api/Api";
import { AxiosError } from "axios";

export type ChatMessage = {
  message: string;
  role: "assistant" | "user";
  link: "";
  selected?: {
    title: string;
    department: string;
    posted_date: string;
    link: string;
  };
};

interface ChatInputProps {
  onsend: (message: ChatMessage) => void;
  chatList: ChatMessage[];
  onFound?: (found: boolean) => void;
}

const ChatInput = ({ onsend, chatList, onFound }: ChatInputProps) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    let currentText = text.trim(); // 공백 입력 방지
    if (currentText === "") return;
    setText(""); // 입력창 초기화

    // 사용자 메세지 먼저 전송
    onsend({ message: currentText, role: "user", link: "" });

    try {
      // 채팅 히스토리를 요구사항에 맞는 형태로 변환
      const history = chatList.map(chat => ({
        role: chat.role,
        content: chat.message
      }));

      // API 요청 데이터 구성
      const requestData = {
        history: history,
        user_message: currentText
      };

      const response: ChatResponse = await chatApi.sendMessage(requestData);
      
      // found 값을 HomeScreen으로 전달
      if (onFound) {
        onFound(response.found || false);
      }
      
      onsend({ 
        message: response.assistant, 
        role: "assistant", 
        link: "",
        selected: response.selected
      });
    } catch (error) {
      console.error("chatApi.sendMessage 실패:", error);
      
      // 사용자 친화적인 에러 메시지 생성
      let userFriendlyMessage = "메시지 전송에 실패했어요 😢";
      
      if (error instanceof AxiosError) {
        if (error.response) {
          const status = error.response.status;
          if (status === 404) {
            userFriendlyMessage = "요청하신 정보를 찾을 수 없어요 😢";
          } else if (status === 500) {
            userFriendlyMessage = "서버에 일시적인 문제가 있어요. 잠시 후 다시 시도해주세요 🔄";
          } else if (status >= 400 && status < 500) {
            userFriendlyMessage = "잘못된 요청이에요. 다시 확인해주세요 📝";
          } else {
            userFriendlyMessage = "서버에 문제가 있어요. 잠시 후 다시 시도해주세요 🔄";
          }
        } else if (error.request) {
          userFriendlyMessage = "인터넷 연결을 확인해주세요 📶";
        } else {
          userFriendlyMessage = "알 수 없는 오류가 발생했어요. 다시 시도해주세요 🔄";
        }
      }
      
      onsend({
        message: userFriendlyMessage,
        role: "assistant",
        link: "",
      });
      return;
    }
  };

  return (
    <View>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="텍스트를 입력하세요"
          value={text}
          onChangeText={setText}
          blurOnSubmit={false}
          returnKeyType="send"
          onSubmitEditing={handleSend}
          multiline={false}
          autoCapitalize="sentences"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={handleSend} disabled={text === ""}>
          <Image
            source={IMAGES.SEND}
            style={text === "" ? styles.nullIcon : styles.Icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flexShrink: 1,
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 40,
    borderRadius: 25,
    paddingLeft: 10,
  },
  nullIcon: {
    width: 40,
    height: 40,
    marginLeft: 8,
    opacity: 0.5,
  },
  Icon: {
    width: 40,
    height: 40,
    marginLeft: 8,
  },
});

export default ChatInput;
