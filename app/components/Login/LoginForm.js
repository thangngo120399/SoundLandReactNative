import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import { useLogin } from "../../context/LoginProvider";
import { isValidObjField, updateError } from "../../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import AccountService from "../../service/account.service";
const LoginForm = () => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const [userInfo, setUserInfo] = useState({
    password: "",
    username: "",
  });

  const [error, setError] = useState("");

  const { password, username } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);

    if (!password.trim() || password.length < 5)
      return updateError("Password is too short!", setError);

    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      try {
        AccountService.login({ ...userInfo }).then((response) => {
          setUserInfo({ username: "", password: "" });
          setProfile(response.data);

          setIsLoggedIn(true);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <FormInput
        value={username}
        onChangeText={(value) => handleOnChangeText(value, "username")}
        label="Username"
        placeholder="example@username.com"
        autoCapitalize="none"
      />
      <FormInput
        value={password}
        onChangeText={(value) => handleOnChangeText(value, "password")}
        label="Password"
        placeholder="********"
        autoCapitalize="none"
        secureTextEntry
      />
      <FormSubmitButton onPress={submitForm} title="Login" />
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default LoginForm;
