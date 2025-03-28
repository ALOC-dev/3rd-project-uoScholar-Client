import React, { use } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import IMAGES from '../../assets';

const SearchScreen = () => {
    const navigation = useNavigation();

    return(
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                    <Image source={IMAGES.BACKWARD} style={styles.backBtnImg} />
                </TouchableOpacity>
                <Text style={styles.title}>Search</Text>                
            </View>
        </SafeAreaView>
    );
}

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
    backBtn: {
        position: 'absolute',
        left: 5,
        padding: 10,
    },
    backBtnImg: {
        width: 30,
        height: 30,
        resizeMode: 'contain', // 이미지의 비율을 유지한 크기 조정.
    },
});

export default SearchScreen;