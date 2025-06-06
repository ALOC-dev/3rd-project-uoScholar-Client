// navigation/MainTabs.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

const Tab = createBottomTabNavigator();

const GeneralNotice = () => {
  const [notices, setNotices] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 예시용 더미 fetch (실제 웹사이트 파싱 또는 API 사용 가능)
    const fetchData = async () => {
      try {
        // 이곳에 실제 fetch 코드 삽입 (API 또는 웹 크롤링 결과)
        const dummyNotices = [
          "📢 수강 정정 일정 안내",
          "📌 졸업 요건 변경 안내",
          "🛠 시스템 점검 예정 공지",
        ];
        await new Promise((resolve) => setTimeout(resolve, 1000)); // 시뮬레이션
        setNotices(dummyNotices);
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
        notices.map((notice, idx) => (
          <View key={idx} style={styles.noticeCard}>
            <Text style={styles.noticeText}>{notice}</Text>
          </View>
        ))
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

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="일반 공지" component={GeneralNotice} />
      <Tab.Screen name="학사 공지" component={AcademicNotice} />
      <Tab.Screen name="학과 공지" component={DepartmentNotice} />
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
  //추가된 스타일 vvv
  scrollContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12, // 항목 간 간격 (React Native 0.71 이상 지원)
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
  noticeText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
  },
});

export default MainTabs;
