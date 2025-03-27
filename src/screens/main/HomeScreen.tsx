import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { sendTextToBackend } from '../../api/Api';

const HomeScreen = () => {
    const [text, setText] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
    try {
        const result = await sendTextToBackend(text);
        setResponse(result);
    } catch (error) {
        setResponse('오류가 발생했습니다.');
    }
};

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="텍스트를 입력하세요"
                value={text}
                onChangeText={setText}
            />
            <Button title="전송" onPress={handleSubmit} />
            {response ? <Text style={styles.response}>응답: {response}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20, 
        justifyContent: 'center'
    }, 
    input: {
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5
    }, 
    response: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default HomeScreen;
