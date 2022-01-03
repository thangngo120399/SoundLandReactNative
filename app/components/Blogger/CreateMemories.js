import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import CreateMemoriesForm from "./CreateMemoriesForm";
const CreateMemories = ({ navigation }) => {
  return (
    <ScrollView style={{ width: "100%" }}>
      <CreateMemoriesForm navigation={navigation} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  uploadImageForm: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#eee",
    borderStyle: "dashed",
    borderWidth: 2,
    borderRadius: 5,
    position: "relative",
    height: 200,
    backgroundColor: "#bfc3c9",
  },
  imageStyle: {
    height: "100%",
    width: "100%",
    alignSelf: "stretch",
    justifyContent: "center",
    borderRadius: 5,
  },
  cardStyle: {
    marginTop: 20,
    borderBottomWidth: 0,
  },
  gradientContainer: {
    borderWidth: 1,
    borderColor: "transparent",
    width: "50%",
    borderRadius: 25,
    marginBottom: 20,
  },
  gradientWrapper: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  textStyle: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10,
  },
});
export default CreateMemories;
