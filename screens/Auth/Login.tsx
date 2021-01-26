import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { Alert } from "react-native";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default ({ route, navigation }: any) => {
  const usernameInput = useInput(route.params ? route.params.username : "");
  const passwordInput = useInput("");
  const [loading, setLoading] = useState(false);
  /*
  const requestSecretMutation = useMutation(LOG_IN, {
    variables: {
      email: emailInput.value,
    },
  });*/
  const handleLogin = async () => {
    const { value: username } = usernameInput;
    const { value: password } = passwordInput;
    if (username === "") {
      return Alert.alert("User name can't be empty");
    } else if (password === "") {
      return Alert.alert("Password can't be empty");
    }
    try {
      setLoading(true);
      // To Do: Firebase Log In
      /*const {
        data: { requestSecret },
      } = await requestSecretMutation();
      */
      /*if (requestSecret) {
        // To Do: Navigate User to Home
      } else {*/
      Alert.alert("Account not found");
      navigation.navigate("Signup", { username });
      //}
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
          {...usernameInput}
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
