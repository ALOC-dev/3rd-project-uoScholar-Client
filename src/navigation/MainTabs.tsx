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

const Tab = createBottomTabNavigator();

const GeneralNotice = () => {
  const [blockNotices, setBlockNotices] = useState<string[]>([]);
  const [cardNotices, setCardNotices] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dummyBlockNotices = [
          "📢 수강 정정 일정 안내",
          "📌 졸업 요건 변경 안내",
          "🛠 시스템 점검 예정 공지",
        ];
        const dummyCardNotices = [
          "📎 교내 행사 일정 공지",
          "💡 수업 방식 변경 안내",
          "🚨 긴급 알림: 서버 점검",
        ];
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setBlockNotices(dummyBlockNotices);
        setCardNotices(dummyCardNotices);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollContainer}
    >
      {loading ? (
        <ActivityIndicator size="large" color="gray" />
      ) : (
        <>
          {cardNotices.map((notice, idx) => (
            <View key={`card-${idx}`} style={styles.noticeCard}>
              <Text style={styles.noticeText}>{notice}</Text>
              <Text style={styles.noticeSubText}>2025년 6월 6일 · 학사팀</Text>
            </View>
          ))}

          {blockNotices.map((notice, idx) => (
            <View key={`block-${idx}`} style={styles.noticeBlock}>
              <Text style={styles.noticeText}>{notice}</Text>
              <Text style={styles.noticeSubText}>
                2025년 6월 6일 · 공지관리자
              </Text>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

const AcademicNotice = () => (
  <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.tabScreen}>
    <Text>학사 공지 내용</Text>
  </ScrollView>
);

const DepartmentNotice = () => (
  <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.tabScreen}>
    <Text>학과 공지 내용</Text>
  </ScrollView>
);

type MainTabsProps = {
  onTabChange: (title: string) => void;
};

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
            // default:
            //   iconSource = noticeIcon;
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
        name="일반 공지"
        component={GeneralNotice}
        listeners={{
          focus: () => onTabChange("일반 공지"),
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
        name="학과 공지"
        component={DepartmentNotice}
        listeners={{
          focus: () => onTabChange("학과 공지"),
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
  noticeBlock: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  noticeText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
  noticeCard: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noticeSubText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});

export default MainTabs;
