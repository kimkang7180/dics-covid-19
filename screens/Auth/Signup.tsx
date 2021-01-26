import React, { useState } from "react";
import styled from "styled-components/native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { Alert } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FBContainer = styled.View`
  margin-top: 25px;
  padding-top: 25px;
  border-top-width: 1px;
  border-color: ${(props) => props.theme.lightGreyColor};
  border-style: solid;
`;

const GoogleContainer = styled.View`
  margin-top: 20px;
`;

export default ({ navigation, route }: any) => {
  const usernameInput = useInput(route.params ? route.params.username : "");
  const passwordInput = useInput("");
  const [loading, setLoading] = useState(false);
  /*const createAccountMutation = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: usernameInput.value,
      email: emailInput.value,
      firstName: fNameInput.value,
      lastName: lNameInput.value,
    },
  });*/
  const handleSingup = async () => {
    const { value: username } = usernameInput;
    const { value: password } = passwordInput;
    if (username === "") {
      return Alert.alert("Invalid username");
    }
    try {
      setLoading(true);
      // Firebase 회원가입 적용 예정
      /*const {
        data: { createAccount },
      } = await createAccountMutation();*/
      // To Do : Log User In
    } catch (e) {
      console.log(e);
      Alert.alert("Username taken.", "Log in instead");
      navigation.navigate("Login", { username });
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <AuthInput
          {...usernameInput}
          placeholder="Username"
          returnKeyType="send"
          autoCorrect={false}
        />
        <AuthButton loading={loading} onPress={handleSingup} text="Sign up" />
      </View>
    </TouchableWithoutFeedback>
  );
};
