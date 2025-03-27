import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const RegisterScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Register Screen</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Vertical
        alignItems: 'center', // Horizontal
        backgroundColor: '#f0f0f0',
    },
});

export default RegisterScreen;