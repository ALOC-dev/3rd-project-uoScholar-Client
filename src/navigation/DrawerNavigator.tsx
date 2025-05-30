import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen, SearchScreen } from "../screens/index";
import COLORS from "../constants/colors";

export type DrawerParamList = {
    Home: undefined;
    Search: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamList>();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
                drawerPosition: 'left',
                drawerType: 'slide',
                drawerActiveTintColor: 'white',
                drawerActiveBackgroundColor: '#3366FF',
                swipeEnabled: true,
                swipeEdgeWidth: 100, // 제스처 인식 범위
                drawerStyle: {
                    backgroundColor: COLORS.HEADER_BACKGROUND,
                    width: '70%',
                },
            }}
        >
            <Drawer.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Drawer.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;