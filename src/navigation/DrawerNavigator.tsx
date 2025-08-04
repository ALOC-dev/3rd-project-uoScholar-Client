import React from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen, SearchScreen } from "../screens/index";
import SearchInputScreen from "../screens/main/SearchScreen/SearchInputScreen";
import SearchResultScreen from "../screens/main/SearchScreen/SearchResultScreen";
import COLORS from "../constants/colors";

export type DrawerParamList = {
  Home: undefined;
  Search: undefined;
  SearchInput: undefined;
  SearchResult: { keyword: string };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerPosition: "left",
        drawerType: "slide",
        drawerActiveTintColor: "black",
        drawerActiveBackgroundColor: "#EAEAEA",
        swipeEnabled: true,
        swipeEdgeWidth: Dimensions.get("window").width, // 제스처 인식 범위

        drawerLabelStyle: {
          fontSize: 16,
        },

        drawerItemStyle: {
          borderRadius: 20,
          paddingHorizontal: 20,
        },

        drawerStyle: {
          backgroundColor: COLORS.HEADER_BACKGROUND,
          width: "70%",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="SearchInput"
        component={SearchInputScreen}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" }, // 드로어 메뉴에서 숨김
        }}
      />
      <Drawer.Screen
        name="SearchResult"
        component={SearchResultScreen}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" }, // 드로어 메뉴에서 숨김
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
