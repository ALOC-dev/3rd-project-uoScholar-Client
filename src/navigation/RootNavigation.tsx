import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigator from "./DrawerNavigator";

export type RootStackParamList = {
    Main: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Main"
                component={DrawerNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default Navigator;