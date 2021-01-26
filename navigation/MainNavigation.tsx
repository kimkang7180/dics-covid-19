import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";

const MainNavigation = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <MainNavigation.Navigator screenOptions={{ headerShown: false }}>
        <MainNavigation.Screen name="AuthHome" component={Home} />
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
};
