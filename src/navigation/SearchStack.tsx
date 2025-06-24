import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/main/SearchScreen/SearchScreen";
import SearchInputScreen from "../screens/main/SearchScreen/SearchInputScreen";

export type SearchStackParamList = {
  Search: undefined;
  SearchInput: undefined;
};

const Stack = createNativeStackNavigator<SearchStackParamList>();
const SearchStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchInput"
        component={SearchInputScreen}
        options={{ title: "검색" }}
      />
    </Stack.Navigator>
  );
};

export default SearchStack;
