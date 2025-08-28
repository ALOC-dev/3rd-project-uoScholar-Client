// /screens/main/SearchScreen/SearchResultScreen.tsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, DrawerActions, useRoute, RouteProp } from "@react-navigation/native";
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
  const route = useRoute<RouteProp<DrawerParamList, "SearchResult">>();
  const { keyword } = route.params;

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
          style={styles.backButtonContainer}
        >
          <Image source={IMAGES.BACKWARD} style={styles.backButtonImage} />
        </TouchableOpacity>
        
        <Text style={styles.title}>{headerTitle}</Text>
        
        <TouchableOpacity
          style={styles.srchBtn}
          onPress={() => navigation.navigate("SearchInput")}
        >
          <Image source={IMAGES.SEARCHICON} style={styles.tabBtnImg} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <MainTabs onTabChange={setHeaderTitle} keyword={keyword} />
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
    justifyContent: "space-between",
    height: 50,
    zIndex: 100,
    backgroundColor: COLORS.HEADER_BACKGROUND,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  backButtonContainer: {
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonImage: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  srchBtn: {
    padding: 10,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
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