import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import IMAGES from "../../../assets/index";

const popularKeywords = [
  "졸업 요건",
  "현장실습",
  "AI 특강",
  "교환학생",
  "장학금",
];

const SearchInputScreen = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [searchText, setSearchText] = useState("");

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* 🔙 수동 뒤로가기 버튼 */}
      <View style={styles.inputContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image source={IMAGES.BACKWARD} style={styles.backButton} />
        </TouchableOpacity>

        {/* 🔍 검색창 */}
        <TextInput
          placeholder="검색어를 입력해주세요."
          style={styles.input}
          autoFocus
          value={searchText} // 👈 입력값 상태 연결
          onChangeText={setSearchText} // 👈 입력 시 상태 갱신
        />
        {/* 지우기 버튼 */}
        <TouchableOpacity onPress={() => setSearchText("")}>
          <Image source={IMAGES.X} style={styles.XButton} />
        </TouchableOpacity>
      </View>

      {/* 🔥 인기 키워드 섹션 */}
      <View style={styles.popularContainer}>
        <Text style={styles.popularTitle}>인기 키워드</Text>
        <View style={styles.keywordList}>
          {popularKeywords.map((keyword, idx) => (
            <TouchableOpacity key={idx} style={styles.keywordBadge}>
              <Text style={styles.keywordText}>{keyword}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  inputContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F5",
    borderRadius: 15,
    paddingHorizontal: 10,
    height: 40,
    width: "95%",
    alignSelf: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  backButton: {
    marginRight: 8,
    width: 20,
    height: 20, // ⬅ 여기서 기존 100을 줄임
    resizeMode: "contain",
  },
  XButton: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  popularContainer: {
    marginTop: 24,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  keywordList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  keywordBadge: {
    backgroundColor: "#eee",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  keywordText: {
    fontSize: 14,
    color: "#555",
  },
});

export default SearchInputScreen;
