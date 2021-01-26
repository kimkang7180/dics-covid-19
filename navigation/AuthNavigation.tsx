import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/Auth/Signup";
import AuthHome from "../screens/Auth/AuthHome";
import Login from "../screens/Auth/Login";

const AuthNavigation = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <AuthNavigation.Navigator screenOptions={{ headerShown: false }}>
        <AuthNavigation.Screen name="AuthHome" component={AuthHome} />
        <AuthNavigation.Screen name="Login" component={Login} />
        <AuthNavigation.Screen name="Signup" component={Signup} />
      </AuthNavigation.Navigator>
    </NavigationContainer>
  );
};
