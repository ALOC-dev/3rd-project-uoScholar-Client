import React from "react";
import { View, Text, StyleSheet, Linking, Pressable } from 'react-native';
import COLORS from "../../../constants/colors";

interface ChatBubbleProps {
    text: string;
    sender: "bot" | "client";
    link: string | null;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, sender, link }) => {
    const timeFormat = (date: Date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? '오후' : '오전';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        return `${ampm} ${formattedHours}:${formattedMinutes}`;
    };

    const currentTime = timeFormat(new Date());
    const isBot = sender === 'bot';
    return isBot ? (
        <View style={[styles.rowContainer, styles.leftAlign]}>
            <View style={[styles.bubble, styles.botBubble]}>
                <Text
                    style={[styles.text, styles.botText]}
                    onPress={() => {
                        console.log("Link clicked:", link);
                        if (link && link.trim() !== "") {
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
            <View style={[styles.bubble, styles.clientBubble]}> 
                <Text style={[styles.text, styles.clientText]}>
                    {text}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginVertical: 5,
    },
    leftAlign: {
        alignSelf: 'flex-start',
    },
    rightAlign: {
        alignSelf: 'flex-end',
    },
    bubble: {
        padding: 10,
        borderRadius: 10,
    },
    botBubble: {
        maxWidth: "70%",
        backgroundColor: COLORS.BOT_BUBBLE_BACKGROUND,
        borderWidth: 1,
        borderColor: "#CFCFCF",

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 10,
    },
    clientBubble: {
        maxWidth: "60%",
        backgroundColor: COLORS.CLIENT_BUBBLE_BACKGROUND,

        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 10,
    },
    text: {
        fontSize: 14,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    botText: {
        color: COLORS.BOT_TEXT,
    },
    clientText: {
        color: COLORS.CLIENT_TEXT,
    },
    time: {
        fontSize: 10,
        marginHorizontal: 6,
        marginBottom: 2,
    },
});

export default ChatBubble;