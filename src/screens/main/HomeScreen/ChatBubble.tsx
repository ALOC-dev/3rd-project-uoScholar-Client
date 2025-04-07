import React from "react";
import { View, Text, StyleSheet } from 'react-native';

interface ChatBubbleProps {
    text: string;
    sender: "bot" | "client"; //채팅의 주체
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, sender }) => {
    return (
        <View style={[styles.container, sender === "bot" ? styles.botBubble : styles.clientBubble]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: "60%", //말풍선 최대 너비 (화면 전체 기준 비율)
        padding: 10, //말풍선 내부에서 텍스트와 테두리 사이 여백
        borderRadius: 10, 
        marginVertical: 5,
    },
    botBubble: {
        alignSelf: "flex-start",
        backgroundColor: "grey",
    },
    clientBubble: {
        alignSelf: "flex-end",
        backgroundColor: "black",
        marginRight: 10,
    },
    text: {
        color: "white",
        fontSize: 14,
    }
});

export default ChatBubble;