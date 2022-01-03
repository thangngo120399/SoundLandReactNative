import React, { useState, useCallback } from "react";
import {
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import Home from "./components/Home/home";
import Tasks from "./components/Tasks";
import ImageUpload from "./components/Blogger/ImageUpload";
import CreateMemories from "./components/Blogger/CreateMemories";
import MyMemories from "./components/MyMemmories/home";
import { useLogin } from "./context/LoginProvider";

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const { setIsLoggedIn, profile } = useLogin();

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            backgroundColor: "#f6f6f6",
            marginBottom: 20,
          }}
        >
          <View>
            <Text>{profile.username}</Text>
            <Text>{profile.roleName}</Text>
          </View>
          <Image
            source={{
              uri:
                profile.avatar ||
                "https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
            }}
            style={{ width: 60, height: 60, borderRadius: 30 }}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 0,
          left: 0,
          bottom: 50,
          backgroundColor: "#f6f6f6",
          padding: 20,
        }}
        onPress={() => setIsLoggedIn(false)}
      >
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  const [reload, setReload] = useState(true);
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "transparent",
          // elevation: 0,
          // shadowOpacity: 0,
        },
        headerTitle: "",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        component={Home}
        name="Home"
        options={{ headerTitle: "Home" }}
      />
      <Drawer.Screen
        component={MyMemories}
        name="My Memories"
        options={{ headerTitle: "My Memories" }}
      />
      <Drawer.Screen
        component={CreateMemories}
        name="CreateMemories"
        options={{ headerTitle: "Create Memories" }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
