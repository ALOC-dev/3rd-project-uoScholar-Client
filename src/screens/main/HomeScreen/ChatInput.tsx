import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native";
import IMAGES from "../../../assets";
import { sendTextToBackend, getTextFromBackend } from "../../../api/Api";
import { ChatMessage } from "./HomeScreen";

const ChatInput = ({ onsend }: { onsend: (message: ChatMessage) => void }) => {
    const [text, setText] = useState('');

    const handleSend = async () => {
        let currentText = text.trim(); // 공백 입력 방지
        if (currentText === '') return;
        setText(''); // 입력창 초기화

        // 클라이언트 메세지 먼저 전송
        onsend({ message: currentText, sender: 'client' });

        try {
            await sendTextToBackend(currentText);
        } catch (error) {
            console.error('sendTextToBackend 실패:', error.message);
            onsend({ message: '❌ 메시지 전송 실패: 서버에 도달하지 못했습니다.', sender: 'bot' });
            return;
        }
    
        try {
            const backendResponse = await getTextFromBackend();
            onsend({ message: backendResponse, sender: 'bot' });
        } catch (error: any) {
            console.error('getTextFromBackend 실패:', error.message);
            onsend({ message: '⚠️ 챗봇 응답 실패: 잠시 후 다시 시도해주세요.', sender: 'bot' });
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="텍스트를 입력하세요"
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity onPress={handleSend} disabled={text === ''}>
                    <Image
                        source={text === '' ? IMAGES.UNSEND : IMAGES.SEND}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 1 },
    inputRow: { flexDirection: 'row', alignItems: 'center' },
    input: {
        flexShrink: 1,
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        height: 40,
        borderRadius: 25,
        paddingVertical: 0,
        paddingLeft: 10
    },
    icon: {
        width: 40,
        height: 40,
        marginLeft: 8 },
});

export default ChatInput;