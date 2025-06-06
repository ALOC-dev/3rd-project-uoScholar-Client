import React, { useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';
import { ChatMessage } from './HomeScreen';

const ChatContainer = ({ chatList }: { chatList: ChatMessage[] }) => {
    const scrollViewRef = useRef<ScrollView>(null);

    return (
        <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.chatContainer}
            overScrollMode={'never'}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }}
        >
            {chatList.map((chat, index) => (
                <ChatBubble key={index} text={chat.message} sender={chat.sender} />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    chatContainer: {
        paddingHorizontal: 10,
    },
});

export default ChatContainer;
