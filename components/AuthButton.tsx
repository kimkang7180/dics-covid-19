import React from "react";
import styled from "styled-components/native";
import constants from "../constants";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { CSSObject } from "styled-components";

const Touchable = styled(TouchableOpacity)``;

const Container = styled.View<{ bgColor: CSSObject }>`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : props.theme.blueColor};
  padding: 10px;
  margin: 0px 50px;
  border-radius: 4px;
  width: ${constants.width / 1.7};
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: 600;
`;

type AuthButtonType = {
  text: String;
  onPress: any;
  loading?: boolean;
  bgColor?: any;
};

const AuthButton = ({
  text,
  onPress,
  loading = false,
  bgColor = null,
}: AuthButtonType) => (
  <Touchable disabled={loading} onPress={onPress}>
    <Container bgColor={bgColor}>
      {loading ? <ActivityIndicator color={"white"} /> : <Text>{text}</Text>}
    </Container>
  </Touchable>
);

export default AuthButton;
