import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import IMAGES from '../../../assets/index';
import ChatInput from './ChatInput';
import ChatContainer from './ChatContainer';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const { height } = Dimensions.get('window');

export type ChatMessage = {
    message: string;
    sender: 'bot' | 'client';
};

const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const insets = useSafeAreaInsets();

    const [chatList, setChatList] = useState<ChatMessage[]>([]);

    const handleSendMessage = (newMessage: ChatMessage) => {
        setChatList(prev => [...prev, newMessage]);
    };

    return (
        <SafeAreaView style={styles.root}>
            <View>
                {/* Header */}
                <View style={styles.topContainer}>
                    <Text style={styles.title}>Chat</Text>
                    <TouchableOpacity
                        style={styles.tabBtn}
                        onPress={() => navigation.navigate('Search')}
                    >
                        <Image source={IMAGES.TABICON} style={styles.tabBtnImg} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main */}
            <View style={styles.chatContentContainer}>
                <ChatContainer chatList={chatList} />
            </View>

            {/* Footer */}
            <View style={[styles.bottomContainer, { paddingBottom: insets.bottom }]}>
                <ChatInput onsend={handleSendMessage} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: 'lightblue',
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        height: 50,
        borderBottomColor: '#ddd',
        backgroundColor: 'lightblue',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
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
        paddingBottom: 10,
    },
    bottomContainer: {
        position: 'absolute',
        width: '100%',
        height: 90,
        bottom: 0,
        padding: 10,
        backgroundColor: '#F9FAFB',
    },
});

export default HomeScreen;