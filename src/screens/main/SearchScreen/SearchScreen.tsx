import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import IMAGES from '../../../assets/index';

const { width } = Dimensions.get('window');
const insets = useSafeAreaInsets();

const SearchScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.overlay}>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <View style={styles.leftDimmedArea} />
            </TouchableWithoutFeedback>

            <View style={[styles.panel, {paddingTop: insets.top}]}>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                        <Image source={IMAGES.BACKWARD} style={styles.backBtnImg} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Search</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        zIndex: 100,
        backgroundColor: 'transparent',
    },
    leftDimmedArea: {
        width: width * 0.3,
        // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    panel: {
        width: width * 0.7,
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
    },
    backBtn: {
        position: 'absolute',
        left: 5,
        padding: 10,
    },
    backBtnImg: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
});

export default SearchScreen;