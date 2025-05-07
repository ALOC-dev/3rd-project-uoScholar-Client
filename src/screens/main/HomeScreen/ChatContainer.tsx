import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';
import { ChatMessage } from './HomeScreen';

const ChatContainer = ({ chatList }: { chatList: ChatMessage[] }) => {
    return (
        <ScrollView contentContainerStyle={styles.chatContainer} showsVerticalScrollIndicator={false}>
            {chatList.map((chat, index) => (
                <ChatBubble key={index} text={chat.message} sender={chat.sender} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        paddingTop: 5,
        paddingBottom: 70,
        paddingHorizontal: 10,
    },
});

export default ChatContainer;