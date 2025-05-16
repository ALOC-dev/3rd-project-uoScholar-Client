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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from '../../../assets/index';
import ChatInput from './ChatInput';
import ChatContainer from './ChatContainer';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export type ChatMessage = {
    message: string;
    sender: 'user' | 'bot';
};

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const insets = useSafeAreaInsets();

    const [chatList, setChatList] = useState<ChatMessage[]>([]);

    const handleSendMessage = (newMessage: ChatMessage) => {
        setChatList(prev => [...prev, newMessage]);
    };

    return (
        <View style={styles.root}>
            <SafeAreaView style={styles.safeTopArea} />

            <View style={styles.topContainer}>
                <Text style={styles.title}>Chat</Text>
                <TouchableOpacity
                    style={styles.tabBtn}
                    onPress={() => navigation.navigate('Search')}
                >
                    <Image source={IMAGES.TABICON} style={styles.tabBtnImg} />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={styles.keyboardAvoiding}
                behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
            >
                <View style={styles.chatWrapper}>
                    <View style={styles.chatContentContainer}>
                        <ChatContainer chatList={chatList} />
                    </View>
                    <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}> 
                        <ChatInput onsend={handleSendMessage} />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'skyblue'
    },
    safeTopArea: {
        backgroundColor: 'lightblue'
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: 'lightblue',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        alignItems: 'center'
    },
    tabBtn: {
        position: 'absolute',
        right: 10,
        padding: 10
    },
    tabBtnImg: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    keyboardAvoiding: {
        flex: 1
    },
    chatWrapper: {
        flex: 1
    },
    chatContentContainer: {
        flex: 1,
        backgroundColor: 'skyblue',
        paddingBottom: 20,
    },
    bottomContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
});

export default HomeScreen;