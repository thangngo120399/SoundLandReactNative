import React, { useContext, useEffect, useState, useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import AppForm from "./components/Login/AppForm";
import ImageUpload from "./components/Blogger/ImageUpload";
import UserProfile from "./components/Login/UserProfile";
import DrawerNavigator from "./DrawerNaviagtor";
import { useLogin } from "./context/LoginProvider";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={AppForm} name="AppForm" />
      <Stack.Screen component={ImageUpload} name="ImageUpload" />
      <Stack.Screen component={UserProfile} name="UserProfile" />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const { setIsLoggedIn, isLoggedIn, profile } = useLogin();
  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + profile.token;
  }, []);
  // axios.defaults.headers.common["Authorization"] = "Bearer " + profile.token;
  // const { isLoggedIn } = useLogin();
  return isLoggedIn ? <DrawerNavigator /> : <StackNavigator />;
};
export default MainNavigator;
