import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import ListService from "../service/list.service";
import CardItem from "./Card/Card";
const Home = ({ navigation }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    ListService.getAll().then((response) => {
      setList(response.data.content);
      // console.log(response.data.content);
    });
  }, []);

  return (
    <ScrollView>
      {list.map((item, index) => (
        <CardItem key={index} item={item} navigation={navigation} />
      ))}
    </ScrollView>
  );
};

export default Home;
