import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native";
import IMAGES from "../../../assets";
import { sendMessageToChatbot } from "../../../api/Api";
import { ChatMessage } from "./HomeScreen";

interface ChatInputProps {
    onSendMessage: (message: ChatMessage) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
    const [userInput, setUserInput] = useState("");

    const handleSendMessage = async () => {
        const trimmedInput = userInput.trim();
        if (trimmedInput === "") return;

        setUserInput(""); // 입력창 초기화

        // 👤 사용자 메시지 전송
        onSendMessage({ message: trimmedInput, sender: "client" });

        try {
            // 🤖 챗봇 응답 받기
            const botReply = await sendMessageToChatbot(trimmedInput);
            onSendMessage({
                message: botReply,
                sender: "bot"
            });
        } catch (error: any) {
            console.error("챗봇 응답 실패:", error.message);
            onSendMessage({
                message: "❌ 서버 응답 오류: 다시 시도해주세요.",
                sender: "bot",
            });
        }
    };

    return (
        <View>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="메시지를 입력하세요"
                    value={userInput}
                    onChangeText={setUserInput}
                />
                <TouchableOpacity onPress={handleSendMessage} disabled={userInput === ""}>
                    <Image
                        source={IMAGES.SEND}
                        style={userInput === "" ? styles.nullIcon : styles.icon}
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
    icon: {
        width: 40,
        height: 40,
        marginLeft: 8,
    },
});

export default ChatInput;