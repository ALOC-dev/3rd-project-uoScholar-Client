import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import IMAGES from "../assets/index";

import GeneralNotice from "../screens/main/SearchScreen/GeneralNotice";
import AcademicNotice from "../screens/main/SearchScreen/AcademicNotice";
import DepartmentNotice from "../screens/main/SearchScreen/DepartmentNotice";

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
        component={DepartmentNotice}
        listeners={{
          focus: () => onTabChange("학과 공지"),
        }}
      />
      <Tab.Screen
        name="학사 공지"
        component={AcademicNotice}
        listeners={{
          focus: () => onTabChange("학사 공지"),
        }}
      />
      <Tab.Screen
        name="일반 공지"
        component={GeneralNotice}
        listeners={{
          focus: () => onTabChange("일반 공지"),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabScreen: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarStyle: {
    backgroundColor: "#fff",
    height: 80,
  },
  tabBarLabelStyle: {
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
});

export default MainTabs;
