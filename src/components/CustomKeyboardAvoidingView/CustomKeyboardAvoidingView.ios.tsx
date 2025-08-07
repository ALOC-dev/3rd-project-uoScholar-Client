import React, { useEffect, useState } from 'react';
import {
    View,
    Animated,
    Keyboard,
    Platform,
} from 'react-native';
import {
    useSafeAreaInsets
} from "react-native-safe-area-context";
import COLORS from '../../constants/colors';

const CustomKeyboardAvoidingView = ({ children, style }) => {
    const insets = useSafeAreaInsets();
    const [translateY] = useState(new Animated.Value(0));
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSub = Keyboard.addListener(showEvent, (e) => {
            setKeyboardVisible(true);
            const height = e.endCoordinates.height;
            Animated.timing(translateY, {
                toValue: -height,
                duration: e.duration ?? 250,
                useNativeDriver: true,
            }).start();
        });

        const hideSub = Keyboard.addListener(hideEvent, (e) => {
            setKeyboardVisible(false);
            Animated.timing(translateY, {
                toValue: 0,
                duration: e.duration ?? 250,
                useNativeDriver: true,
            }).start();
        });

        return () => {
            showSub.remove();
            hideSub.remove();
        };
    }, []);

    return (
        <Animated.View style={[{ flex: 1, transform: [{ translateY }] }, style]}>
            {children}
            {!keyboardVisible && (
                <View style={{ height: insets.bottom, backgroundColor: COLORS.FOOTER_BACKGROUND }} />
            )}  
        </Animated.View>
    );
};

export default CustomKeyboardAvoidingView;