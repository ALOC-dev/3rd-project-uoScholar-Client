import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.MAIN_BACKGROUND,
  },
});

export default LoadingScreen;