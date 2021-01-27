import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authService } from "./fbase";

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
  const logUserIn = async ({ email, password }: any) => {
    try {
      authService
        .signInWithEmailAndPassword(email, password)
        .then(async (user) => {
          setIsLoggedIn(true);
          await AsyncStorage.setItem("isLoggedIn", "true");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      authService
        .signOut()
        .then(async () => {
          await AsyncStorage.setItem("isLoggedIn", "false");
          setIsLoggedIn(false);
        })
        .catch((error) => {
          console.log(error);
        });
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
