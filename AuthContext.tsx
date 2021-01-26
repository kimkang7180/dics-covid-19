import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderType = { isLoggedIn: Boolean; children: JSX.Element };

type AuthContextType = {
  isLoggedIn: Boolean;
  logUserIn: Function;
  logUserOut: Function;
};

export const AuthProvider = ({
  isLoggedIn: isLoggedInProp,
  children,
}: AuthProviderType) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp);
  const logUserIn = async ({ token }: any) => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      await AsyncStorage.setItem("jwt", token);
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      setIsLoggedIn(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  const { isLoggedIn } = useContext(AuthContext) as AuthContextType;
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext) as AuthContextType;
  return logUserIn;
};

export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext) as AuthContextType;
  return logUserOut;
};
