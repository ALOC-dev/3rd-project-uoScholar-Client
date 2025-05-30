import React, { useEffect, useState } from 'react';
import {
    Animated,
    Keyboard,
    Platform,
} from 'react-native';

const CustomKeyboardAvoidingView = ({ children, style }) => {
    const [translateY] = useState(new Animated.Value(0));

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const showSub = Keyboard.addListener(showEvent, (e) => {
            const height = e.endCoordinates.height;
            Animated.timing(translateY, {
                toValue: -height,
                duration: e.duration ?? 250,
                useNativeDriver: true,
            }).start();
        });

        const hideSub = Keyboard.addListener(hideEvent, (e) => {
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
        </Animated.View>
    );
};

export default CustomKeyboardAvoidingView;