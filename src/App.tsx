import React from "react";
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