import React from "react";
import styled from "styled-components/native";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 10px;
`;

type AuthInputType = {
  placeholder: String;
  value: String;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  onChange: Function;
  returnKeyType?: "done" | "go" | "next" | "search" | "send";
  onSubmitEditing?: Function;
  autoCorrect?: Boolean;
};

const TextInput = styled.TextInput<any>`
  width: ${constants.width / 1.7};
  padding: 10px;
  background-color: ${(props) => props.theme.greyColor};
  border: 0.5px solid ${(props) => props.theme.darkGreyColor};
  border-radius: 4px;
`;

const AuthInput = ({
  placeholder,
  value,
  keyboardType = "default",
  autoCapitalize = "none",
  returnKeyType = "done",
  onChange,
  onSubmitEditing = () => null,
  autoCorrect = true,
}: AuthInputType) => (
  <Container>
    <TextInput
      onChangeText={onChange}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      onSubmitEditing={onSubmitEditing}
      autoCorrect={autoCorrect}
      value={value}
    />
  </Container>
);

export default AuthInput;
