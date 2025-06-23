// /screens/main/SearchScreen/SearchInputScreen.tsx
import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import IMAGES from "../../../assets/index"; // ← 뒤로가기 아이콘이 여기에 있다고 가정

const SearchInputScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 🔙 수동 뒤로가기 버튼 */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Image source={IMAGES.BACKWARD} style={styles.backIcon} />
      </TouchableOpacity>

      {/* 🔍 검색창 */}
      <TextInput
        placeholder="검색어를 입력하세요..."
        style={styles.input}
        autoFocus
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  input: {
    marginTop: 60, // 뒤로가기 버튼과 간격
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    padding: 8,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 100,
    resizeMode: "contain",
  },
});

export default SearchInputScreen;
