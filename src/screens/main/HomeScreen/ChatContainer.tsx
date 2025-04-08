import React, { useState } from 'react';
import {
    View,
    FlatList,
    ScrollView,
    StyleSheet
} from 'react-native';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';

const ChatContainer = ({ chatList }: { chatList: string[] }) => {

    return (
        <ScrollView
            contentContainerStyle={styles.chatContainer}
            showsVerticalScrollIndicator={false}
            >
            {chatList.map((message, index) => (
                <ChatBubble text={message} sender='client' />

            ))}
        </ScrollView>
    );
};
    
const styles = StyleSheet.create({
    chatContainer: {
        paddingTop: 5,
        paddingBottom: 70,  // ChatInput 높이 만큼 여백 주기
        paddingHorizontal: 10,
    },
});

export default ChatContainer;