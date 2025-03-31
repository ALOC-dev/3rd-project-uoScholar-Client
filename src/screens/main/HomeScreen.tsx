import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { sendTextToBackend } from '../../api/Api';
import IMAGES from '../../assets/index';
import { ChatBubble } from '../../components';

const HomeScreen = () => {
    const [text, setText] = useState(''); // user input
    const [response, setResponse] = useState(''); // server output
    const navigation = useNavigation();

    const handleSubmit = async () => {
        try {
            const result = await sendTextToBackend(text);
            setResponse(result);
        } catch (error) {
            setResponse('오류가 발생했습니다.');
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>

                {/* Header */}
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Chat</Text>
                    <TouchableOpacity
                        style={styles.tabBtn}
                        onPress={() => navigation.navigate('Search')}
                    >
                        <Image 
                            source={IMAGES.TABICON} 
                            style={styles.tabBtnImg} 
                        />
                    </TouchableOpacity>
                </View>

                {/* 입력 컴포넌트 */}
                <TextInput
                    style={styles.input}
                    placeholder="텍스트를 입력하세요"
                    value={text}
                    onChangeText={setText}
                />
                <Button title="전송" onPress={handleSubmit} />

                {/* Chatting Bubble design */}
                <ChatBubble text={text}/>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    topContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        position: "absolute",
        alignItems: 'center',
    },
    tabBtn: {
        position: 'absolute',
        right: 10,
        padding: 10,
    },
    tabBtnImg: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    input: {
        flexShrink: 1,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 10,
        height: 50,
    }, 
    response: {
        marginTop: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;