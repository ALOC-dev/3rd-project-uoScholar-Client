import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen, SearchScreen } from "../screens/index";
import RegisterScreen from "../screens/auth/RegisterScreen";
import SearchInputScreen from "../screens/main/SearchScreen/SearchInputScreen";
import SearchResultScreen from "../screens/main/SearchScreen/SearchResultScreen";
import COLORS from "../constants/colors";
import { useCollegeStore } from "../store/use-college-store";
import LoadingScreen from "../components/LoadingScreen";

export type DrawerParamList = {
  Register: undefined;
  Home: undefined;
  Search: undefined;
  SearchInput: undefined;
  SearchResult: { keyword: string };
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
  const { selectedCollegeCodes } = useCollegeStore();
  const [hasHydrated, setHasHydrated] = useState(false);
  const [initialRoute, setInitialRoute] = useState<keyof DrawerParamList | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = useCollegeStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    // 이미 hydrated된 상태라면 즉시 true로 설정
    if (useCollegeStore.persist.hasHydrated()) {
      setHasHydrated(true);
    }

    // 3초 후에도 hydration이 완료되지 않으면 강제로 완료 처리
    const timeout = setTimeout(() => {
      setHasHydrated(true);
    }, 3000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (hasHydrated) {
      // 선택된 대학이 있으면 Home, 없으면 Register를 초기 라우트로 설정
      const route: keyof DrawerParamList = selectedCollegeCodes.length > 0 ? "Home" : "Register";
      setInitialRoute(route);
    }
  }, [hasHydrated, selectedCollegeCodes.length]);

  // 아직 hydration이 완료되지 않았거나 초기 라우트가 결정되지 않았으면 로딩 화면 표시
  if (!hasHydrated || !initialRoute) {
    return <LoadingScreen />;
  }

  return (
    <Drawer.Navigator
      initialRouteName={initialRoute}
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
        options={{
          headerShown: false,
          drawerLabel: "홈",
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          drawerLabel: "공지사항",
        }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
          drawerLabel: "마이페이지",
        }}
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
