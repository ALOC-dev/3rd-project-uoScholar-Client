import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native";
import IMAGES from "../../../assets";
import { sendTextToBackend } from "../../../api/Api";
import { ChatMessage } from "./HomeScreen";

const ChatInput = ({ onsend }: { onsend: (message: ChatMessage) => void }) => {
    const [text, setText] = useState("");

    const handleSend = async () => {
        let currentText 
        = text.trim(); // 공백 입력 방지
        if (currentText === "") return;
        setText(""); // 입력창 초기화

        // 클라이언트 메세지 먼저 전송
        onsend({ message: currentText, sender: "client", link: "" });

        try {
            const sentTextResponse = await sendTextToBackend(currentText);

            if (sentTextResponse.length === 0) {
                onsend({
                    message: "원하시는 정보를 찾을 수 없습니다.",
                    sender: "bot",
                    link: ""
                });
                return;
            }
            
            for (let i = 0; i < sentTextResponse.length; i++) {
                let final_text = "";

                final_text += "제목: ";
                final_text += sentTextResponse[i].title;
                final_text += "\n";   
                final_text += "부서: "
                final_text += sentTextResponse[i].department;
                final_text += "\n";
                final_text += "시간: "
                final_text += sentTextResponse[i].posted_date;

                onsend({
                    message: final_text,
                    sender: "bot",
                    link: sentTextResponse[i].link,
                });
            }
        } catch (error) {
            console.error("sendTextToBackend 실패:", error.message);
            onsend({
                message: "❌ 메시지 전송 실패: 서버에 도달하지 못했습니다.",
                sender: "bot",
                link: ""
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
        alignItems: "center"
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
