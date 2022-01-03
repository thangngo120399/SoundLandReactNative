import React, { Component } from "react";
import { Dimensions, FlatList, View, Text } from "react-native";
import Comment from "./comment";
import InputComment from "./InputComment";
const windowHeight = Dimensions.get("window").height;
function Comments(props) {
  const { data } = props;
  const lenData = props.data.length * 50;

  return (
    <Text>
      {data.map((item, index) => (
        <Comment key={index} data={item}></Comment>
      ))}
      <InputComment
        windowHeight={windowHeight}
        lenData={lenData}
      ></InputComment>
    </Text>
  );
}

export default Comments;
