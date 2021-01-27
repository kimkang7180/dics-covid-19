import React, { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import { Asset } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import { ThemeProvider } from "styled-components/native";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "./styles";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font,
      });
      await Asset.loadAsync([require("./assets/icon.png")]);
      setLoaded(true);
    } catch (e) {
      console.log(e);
    }
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
    if (!isLoggedIn || isLoggedIn === "false") {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    preLoad();
  });
  return loaded ? (
    <ThemeProvider theme={theme}>
      <AuthProvider isLoggedIn={isLoggedIn}>
        <NavController />
      </AuthProvider>
    </ThemeProvider>
  ) : (
    <AppLoading />
  );
}
