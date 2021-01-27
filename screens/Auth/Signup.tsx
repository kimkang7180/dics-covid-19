import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { authService } from "../../fbase";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ navigation, route }: any) => {
  const emailInput = useInput(route.params ? route.params.email : "");
  const passwordInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const handleSingup = async () => {
    const { value: email } = emailInput;
    const { value: password } = passwordInput;
    console.log(emailInput, passwordInput);
    if (email === "") {
      return Alert.alert("Invalid username");
    } else if (password === "") {
      return Alert.alert("Invalid password");
    } else {
      try {
        setLoading(true);
        console.log(email, password);
        authService
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            logIn(email, password);
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
        // To Do : Log User In
      } catch (e) {
        console.log(e);
        Alert.alert("Username taken.", "Log in instead");
        navigation.navigate("Login", { email });
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="Email"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...passwordInput}
          placeholder="Password"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleSingup} text="Sign up" />
      </View>
    </TouchableWithoutFeedback>
  );
};
