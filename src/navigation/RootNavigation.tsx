import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainStack from "./MainStack";

const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainStack"
                component={MainStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export default Navigator;