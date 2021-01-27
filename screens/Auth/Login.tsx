import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ route, navigation }: any) => {
  const emailInput = useInput(route.params ? route.params.email : "");
  const passwordInput = useInput("");
  const logIn = useLogIn();
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    const { value: email } = emailInput;
    const { value: password } = passwordInput;
    if (email === "") {
      return Alert.alert("User name can't be empty");
    } else if (password === "") {
      return Alert.alert("Password can't be empty");
    }
    try {
      setLoading(true);
      logIn(email, password);
      console.log("Good");
    } catch (e) {
      console.log(e);
      Alert.alert("Can't log in now");
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...emailInput}
          placeholder="Name"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthInput
          {...passwordInput}
          placeholder="Password"
          keyboardType="email-address"
          returnKeyType="send"
          onSubmitEditing={handleLogin}
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleLogin} text="Log In" />
      </View>
    </TouchableWithoutFeedback>
  );
};
