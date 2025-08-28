import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import IMAGES from "../../assets";
import { chatApi } from "../../api/Api";

export type ChatMessage = {
  message: string;
  role: "assistant" | "user";
  link: "";
};

const ChatInput = ({ onsend }: { onsend: (message: ChatMessage) => void }) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    let currentText = text.trim(); // 공백 입력 방지
    if (currentText === "") return;
    setText(""); // 입력창 초기화

    // 사용자 메세지 먼저 전송
    onsend({ message: currentText, role: "user", link: "" });

    try {
      const assistantReply = await chatApi.sendMessage(currentText);
      onsend({ message: assistantReply, role: "assistant", link: "" });
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
