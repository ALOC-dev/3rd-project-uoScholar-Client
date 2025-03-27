import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./navigation/RootNavigation";

const App = () => {
    return (
        <NavigationContainer>
            <Navigator />
        </NavigationContainer>
    );
}

export default App;