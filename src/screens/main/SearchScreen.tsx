import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const SearchScreen = () => {
    return(
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Search Screen</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Vertical
        alignItems: 'center', // Horizontal
        backgroundColor: '#f0f0f0',
    },
});

export default SearchScreen;