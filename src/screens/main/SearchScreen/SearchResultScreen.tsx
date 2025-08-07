// /screens/main/SearchScreen/SearchResultScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerParamList } from "../../../navigation/DrawerNavigator";
import IMAGES from "../../../assets/index";
import COLORS from "../../../constants/colors";
import MainTabs from "../../../navigation/MainTabs";

type SearchScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "SearchResult"
>;

const SearchResultScreen = () => {
  const [headerTitle, setHeaderTitle] = useState<string>("Search Result");
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View
        style={{
          zIndex: 100,
          height: insets.top,
          backgroundColor: COLORS.HEADER_BACKGROUND,
        }}
      />

      <View style={styles.topContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Search")}
          style={styles.backButton}
        >
          <Image source={IMAGES.BACKWARD} style={styles.backButton} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.srchBtn}
          onPress={() => navigation.navigate("SearchInput")}
        >
          <Image source={IMAGES.SEARCHICON} style={styles.tabBtnImg} />
        </TouchableOpacity>

        <Text style={styles.title}>{headerTitle}</Text>
      </View>

      <View style={styles.mainContainer}>
        <MainTabs onTabChange={setHeaderTitle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.HEADER_BACKGROUND,
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    zIndex: 100,
    backgroundColor: COLORS.HEADER_BACKGROUND,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    position: "absolute",
  },
  tabBtn: {
    position: "absolute",
    left: 10,
    padding: 10,
  },
  backButton: {
    left: -85,
    marginRight: 8,
    width: 30,
    height: 30, // ⬅ 여기서 기존 100을 줄임
    resizeMode: "contain",
  },
  srchBtn: {
    position: "absolute",
    right: 10,
    padding: 10,
  },
  tabBtnImg: {
    width: 25,
    height: 25,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.MAIN_BACKGROUND,
  },
});

export default SearchResultScreen;
