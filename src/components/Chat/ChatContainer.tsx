import React, { useEffect, useRef } from "react";
import { View, ScrollView, StyleSheet, Text, Pressable, Linking } from "react-native";
import ChatBubble from "./ChatBubble";
import { ChatMessage } from "./ChatInput";

const ChatContainer = ({ chatList }: { chatList: ChatMessage[] }) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const renderChatBubbles = () => {
    const bubbles: React.ReactElement[] = [];
    
    chatList.forEach((chat, index) => {
      // Assistant 메시지 bubble 렌더링
      bubbles.push(
        <ChatBubble
          key={`chat-${index}`}
          text={chat.message}
          role={chat.role}
          link={chat.link}
        />
      );
      
      // selected가 있는 경우 별도의 공지사항 bubble 렌더링
      if (chat.selected) {
        const noticeText = `${chat.selected.title}\n${chat.selected.department} | ${chat.selected.posted_date}`;
        bubbles.push(
          <ChatBubble
            key={`notice-${index}`}
            text={noticeText}
            role="assistant"
            link={chat.selected.link}
          />
        );
      }
    });
    
    return bubbles;
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={styles.chatContainer}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      onContentSizeChange={() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }}
      automaticallyAdjustContentInsets={true}
    >
      {renderChatBubbles()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  leftAlign: {
    alignSelf: "flex-start",
  },
  time: {
    fontSize: 10,
    marginHorizontal: 6,
    marginBottom: 2,
  },
});

export default ChatContainer;
