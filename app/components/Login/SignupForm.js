import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  isValidEmail,
  isValidObjField,
  updateError,
} from "../../utils/methods";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { StackActions } from "@react-navigation/native";
import AccountService from "../../service/account.service";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "Invalid name!")
    .required("Name is required!"),
  email: Yup.string().email("Invalid email!").required("Email is required!"),
  username: Yup.string().required("Username is required!"),
  password: Yup.string()
    .trim()
    .min(8, "Password is too short!")
    .required("Password is required!"),
});

const SignupForm = ({ navigation }) => {
  const userInfo = {
    email: "",
    fullName: "",
    password: "",
    username: "",
  };

  const [error, setError] = useState("");

  const { email, fullName, password, username } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);
    // if valid name with 3 or more characters
    if (!fullName.trim() || fullName.length < 3)
      return updateError("Invalid name!", setError);
    // only valid email id is allowed
    if (!isValidEmail(email)) return updateError("Invalid email!", setError);
    // password must have 8 or more characters
    if (!password.trim() || password.length < 5)
      return updateError("Password is less then 8 characters!", setError);

    return true;
  };

  const sumbitForm = () => {
    if (isValidForm()) {
      // submit form
      console.log(userInfo);
    }
  };

  const signUp = async (values, formikActions) => {
    console.log(values);
    try {
      AccountService.register({ ...values }).then((response) => {
        var userLogin = {
          password: values.password,
          username: values.username,
        };

        // AccountService.login({ userLogin }).then((response) => {
        //   alert("ok la");
        //   navigation.dispatch(
        //     StackActions.replace("ImageUpload", {
        //       token: response.data.token,
        //     })
        //   );
        // });
      });
    } catch (error) {
      console.log(error);
    }
    formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { email, fullName, username, password } = values;
          return (
            <>
              <FormInput
                value={fullName}
                error={touched.fullName && errors.fullName}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                label="Full Name"
                placeholder="John Smith"
              />
              <FormInput
                value={email}
                error={touched.email && errors.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                label="Email"
                placeholder="example@email.com"
              />
              <FormInput
                value={username}
                error={touched.username && errors.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                autoCapitalize="none"
                label="Username"
                placeholder="thangngo"
              />
              <FormInput
                value={password}
                error={touched.password && errors.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                autoCapitalize="none"
                secureTextEntry
                label="Password"
                placeholder="********"
              />

              <FormSubmitButton
                submitting={isSubmitting}
                onPress={handleSubmit}
                title="Sign up"
              />
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({});

export default SignupForm;
