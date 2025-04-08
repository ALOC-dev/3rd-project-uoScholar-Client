import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
} from "react-native";
import IMAGES from "../../../assets";
import { sendTextToBackend } from "../../../api/Api";

const ChatInput = ({ onsend } : { onsend: (message: string) => void}) => {
    const [text, setText] = useState('');

    const handleSend = () => {
        if (text === '') return;

        console.log('전송:', text);
        onsend(text);
        setText('');

        sendTextToBackend(text);
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <TextInput
                    style={styles.input}
                    placeholder="텍스트를 입력하세요"
                    value={text}
                    onChangeText={setText}
                />
                <TouchableOpacity onPress={handleSend} disabled={text === ''}>
                    <Image
                        source={
                            text === ''
                                ? IMAGES.UNSEND
                                : IMAGES.SEND
                        }
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 1,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flexShrink: 1,
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        height: 40,
        borderRadius: 25,
        paddingVertical: 0,
        paddingLeft: 10,
    },
    icon: {
        width: 40,
        height: 40,
        marginLeft: 8,
    },
});

export default ChatInput;
