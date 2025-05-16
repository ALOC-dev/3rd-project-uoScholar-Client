import React, { useEffect, useRef } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ChatBubble from './ChatBubble';
import { ChatMessage } from './HomeScreen';

const ChatContainer = ({ chatList }: { chatList: ChatMessage[] }) => {
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        // chatList가 업데이트될 때 맨 아래로 스크롤
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [chatList]);

    return (
        <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.chatContainer}
            showsVerticalScrollIndicator={false}
        >
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
