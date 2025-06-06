import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import COLORS from "../../../constants/colors";
import Hyperlink from 'react-native-hyperlink'
import openURL from "../../../components/openUrl";

interface ChatBubbleProps {
    text: string;
    sender: "bot" | "client";
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, sender }) => {
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

    return (
        <View style={[
            styles.rowContainer,
            isBot ? styles.leftAlign : styles.rightAlign
        ]}>
            {/* 왼쪽 시간 (client) */}
            {!isBot && <Text style={[styles.time]}>{currentTime}</Text>}

            {/* 말풍선 */}
            <View style={[
                styles.bubble,
                isBot ? styles.botBubble : styles.clientBubble
            ]}>
                <Hyperlink
	                linkStyle={{color: 'blue'}}
                    onPress={(url) => openURL(url)}
                >
                    <Text style={[
                        styles.text,
                        isBot ? styles.botText : styles.clientText
                    ]}>
                        {text}
                    </Text>
                </Hyperlink>
            </View>

            {/* 오른쪽 시간 (bot) */}
            {isBot && <Text style={[styles.time]}>{currentTime}</Text>}
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
        maxWidth: "60%",
        padding: 10,
        borderRadius: 10,
    },
    botBubble: {
        backgroundColor: COLORS.BOT_BUBBLE_BACKGROUND,
    },
    clientBubble: {
        backgroundColor: COLORS.CLIENT_BUBBLE_BACKGROUND,
    },
    text: {
        fontSize: 14,
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