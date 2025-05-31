import React from "react";// 반드시 최상단!
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation/RootNavigation";
import 'react-native-gesture-handler';

const App = () => {
    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    );
}

export default App;