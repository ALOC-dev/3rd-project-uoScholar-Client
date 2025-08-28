import React from "react";
import { View, Text, StyleSheet, Linking, Pressable } from "react-native";
import COLORS from "../../constants/colors";

interface ChatBubbleProps {
  text: string;
  role: "assistant" | "user";
  link: "";
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, role, link }) => {
  const timeFormat = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "오후" : "오전";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${ampm} ${formattedHours}:${formattedMinutes}`;
  };

  const currentTime = timeFormat(new Date());
  const isAssistant = role === "assistant";
  return isAssistant ? (
    <View style={[styles.rowContainer, styles.leftAlign]}>
      <View style={[styles.bubble, styles.assistantBubble]}>
        <Text
          style={[styles.text, styles.assistantText]}
          onPress={() => {
            if (link !== "") {
              Linking.openURL(link);
            }
          }}
        >
          {text}
        </Text>
      </View>
      <Text style={styles.time}>{currentTime}</Text>
    </View>
  ) : (
    <View style={[styles.rowContainer, styles.rightAlign]}>
      <Text style={styles.time}>{currentTime}</Text>
      <View style={[styles.bubble, styles.userBubble]}>
        <Text style={[styles.text, styles.userText]}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  leftAlign: {
    alignSelf: "flex-start",
  },
  rightAlign: {
    alignSelf: "flex-end",
  },
  bubble: {
    padding: 10,
    borderRadius: 10,
  },
  assistantBubble: {
    maxWidth: "70%",
    backgroundColor: COLORS.BOT_BUBBLE_BACKGROUND,
    borderWidth: 1,
    borderColor: "#CFCFCF",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 5,
  },
  userBubble: {
    maxWidth: "60%",
    backgroundColor: COLORS.CLIENT_BUBBLE_BACKGROUND,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    fontSize: 14,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  assistantText: {
    color: COLORS.BOT_TEXT,
  },
  userText: {
    color: COLORS.CLIENT_TEXT,
  },
  time: {
    fontSize: 10,
    marginHorizontal: 6,
    marginBottom: 2,
  },
});

export default ChatBubble;
