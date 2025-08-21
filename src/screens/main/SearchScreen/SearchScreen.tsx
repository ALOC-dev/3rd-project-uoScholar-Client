import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { DrawerParamList } from "../../../navigation/DrawerNavigator";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import IMAGES from "../../../assets/index";
import COLORS from "../../../constants/colors";
import MainTabs from "../../../navigation/MainTabs";

type SearchScreenNavigationProp = DrawerNavigationProp<
  DrawerParamList,
  "Search"
>;

export type ChatMessage = {
  message: string;
  sender: "bot" | "client";
};

const SearchScreen = () => {
  const [headerTitle, setHeaderTitle] = useState<string>("Search");
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const insets = useSafeAreaInsets();

  const [chatList, setChatList] = useState<ChatMessage[]>([]);

  const handleSendMessage = (newMessage: ChatMessage) => {
    setChatList((prev) => [...prev, newMessage]);
  };

  return (
    <View style={[styles.root]}>
      {/* Top Safe Area */}
      <View
        style={{
          zIndex: 100,
          height: insets.top,
          backgroundColor: COLORS.HEADER_BACKGROUND,
        }}
      />

      {/* Header */}
      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Image source={IMAGES.TABICON} style={styles.tabBtnImg} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.srchBtn}
          onPress={() => navigation.navigate("SearchInput")}
        >
          <Image source={IMAGES.SEARCHICON} style={styles.tabBtnImg} />
        </TouchableOpacity>

        <Text style={styles.title}>{headerTitle}</Text>
      </View>

      {/* Body */}
      <View style={styles.mainContainer}>
        <MainTabs onTabChange={setHeaderTitle} keyword={undefined} />
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

export default SearchScreen;
