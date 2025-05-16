import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen, SearchScreen } from "../screens/index";

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Search"
                component={SearchScreen}
                options={{
                headerShown: false,
                animation: 'slide_from_right',     // 👈 오른쪽에서 슬라이드
                presentation: 'transparentModal',              // 👈 모달처럼 덮기
                }}
            />
        </Stack.Navigator>
    );
};

export default MainStack;