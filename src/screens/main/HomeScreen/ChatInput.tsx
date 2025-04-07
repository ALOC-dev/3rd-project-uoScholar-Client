import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button,
} from "react-native";

const ChatInput = () => {
    const [text, setText] = useState(''); // user input
    
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="텍스트를 입력하세요"
                value={text}
                onChangeText={setText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        flexShrink: 1,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 10,
        height: 50,
    },    
});

export default ChatInput;