import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

interface ChatBubbleProps {
    text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text>Chat Bubble</Text>
            <Text>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default ChatBubble;