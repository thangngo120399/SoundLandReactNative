import React, { Component } from "react";
import { View } from "react-native";
import {
  ActivityIndicator,
  FlatList,
  Button,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";

function Comment(props) {
  const { data } = props;
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        {true && (
          <Image
            resizeMode="contain"
            style={styles.avatar}
            source={{
              uri: "https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg",
            }}
          />
        )}
      </View>
      <View style={styles.contentContainer}>
        <Text>
          <Text style={[styles.text, styles.name]}>
            {props.data.object.name}
          </Text>{" "}
          <Text style={styles.text}>{props.data.object.mess}</Text>
        </Text>
        {/* <Text style={[styles.text, styles.created]}>{moment(created).fromNow()}</Text> */}
        <Text style={[styles.text, styles.created]}>11-04-2020</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
  },
  avatarContainer: {
    alignItems: "center",
    marginLeft: 5,
    paddingTop: 10,
    width: 40,
  },
  contentContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#EEE",
    padding: 5,
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 13,
    width: 26,
    height: 26,
  },
  text: {
    color: "#000",
    fontFamily: "Avenir",
    fontSize: 15,
  },
  name: {
    fontWeight: "bold",
  },
  created: {
    color: "#BBB",
  },
});

export default Comment;
