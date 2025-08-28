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

export type ChatMessage = {
  message: string;
  role: "assistant" | "user";
  link: "";
  selected?: {
    title: string;
    department: string;
    date: string;
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
      const errorMessage = error instanceof Error ? error.message : "메시지 전송 중 오류가 발생했습니다.";
      console.error("chatApi.sendMessage 실패:", errorMessage);
      onsend({
        message: `❌ 메시지 전송 실패: ${errorMessage}`,
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
