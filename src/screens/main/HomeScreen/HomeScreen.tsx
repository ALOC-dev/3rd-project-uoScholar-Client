import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from '../../../assets/index';
import ChatInput from './ChatInput';
import ChatContainer from './ChatContainer';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [chatList, setChatList] = useState<string[]>([]);

    const handleSendMessage = (message: string) => {
        if (message.trim() === '') return;
        setChatList((prev) => [...prev, message]);
    };

    return (
        <>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'lightblue' }}>
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

            {/* Chatting Screen */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={{ flex: 1 }}>
                    {/* Chatting Content */}
                    <View style={styles.chatContentContainer}>
                        <ChatContainer chatList={chatList} />
                    </View>

                    {/* Chatting Input */}
                    <View style={styles.bottomContainer}>
                        <ChatInput onsend={handleSendMessage}/>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
        </>
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
        backgroundColor: 'lightblue',
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
    chatContentContainer: {
        flex: 1,
        backgroundColor: 'skyblue',
    },
    bottomContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        padding: 10,
        backgroundColor: '#fff',
    },
});

export default HomeScreen;