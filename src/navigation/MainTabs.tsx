import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image, StyleSheet } from "react-native";
import IMAGES from "../assets/index";
import NoticeScreen from "../screens/main/SearchScreen/NoticeScreen";

const Tab = createBottomTabNavigator();

const MainTabs = ({ onTabChange }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ focused }) => {
          let iconSource;

          switch (route.name) {
            case "일반 공지":
              iconSource = IMAGES.MEGAPHONE;
              break;
            case "학사 공지":
              iconSource = IMAGES.ACADEMIC;
              break;
            case "학과 공지":
              iconSource = IMAGES.BOOK;
              break;
          }

          return (
            <Image
              source={iconSource}
              style={{
                width: 24,
                height: 24,
                opacity: focused ? 1 : 0.3,
                resizeMode: "contain",
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="학과 공지"
        component={() => <NoticeScreen noticeType="department" />}
        listeners={{
          focus: () => onTabChange("학과 공지"),
        }}
      />
      <Tab.Screen
        name="학사 공지"
        component={() => <NoticeScreen noticeType="academic" />}
        listeners={{
          focus: () => onTabChange("학사 공지"),
        }}
      />
      <Tab.Screen
        name="일반 공지"
        component={() => <NoticeScreen noticeType="general" />}
        listeners={{
          focus: () => onTabChange("일반 공지"),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#fff",
    height: 80,
  },
  tabBarLabelStyle: {
    fontWeight: "bold",
  },
});

export default MainTabs;
