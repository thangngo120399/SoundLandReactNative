import { View } from "react-native";
import React, { useState, useEffect } from "react";
import {
    ActivityIndicator,
    FlatList,
    Button,
    Text,
    StyleSheet,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions
  } from 'react-native';

function Comment(props) {
    // Pull comment object out of props
    // const { comment } = props.data;
    // Pull data needed to display a comment out of comment object
    // const { content, created, user } = props.data;
    // Pull user name and avatar out of user object
    // const { name, avatar } = user;
    return (
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            {true && <Image
              resizeMode='contain'
              style={styles.avatar}
              source={{ uri: 'https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg' }}
            />}
          </View>
          <View style={styles.contentContainer}>
            <Text>
              <Text style={[styles.text, styles.name]}>{props.data.username}</Text>
              {' '}
              <Text style={styles.text}>{props.data.textComment}</Text>
            </Text>
            {/* <Text style={[styles.text, styles.created]}>{moment(created).fromNow()}</Text> */}
            <Text style={[styles.text, styles.created]}>Just now</Text>
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
    },
    avatarContainer: {
      alignItems: 'center',
      marginLeft: 5,
      paddingTop: 10,
      width: 40,
    },
    contentContainer: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: '#EEE',
      padding: 5,
    },
    avatar: {
      borderWidth: 1,
      borderColor: '#EEE',
      borderRadius: 13,
      width: 26,
      height: 26,
    },
    text: {
      color: '#000',
      fontFamily: 'Avenir',
      fontSize: 15,
    },
    name: {
      fontWeight: 'bold',
    },
    created: {
      color: '#BBB',
    },
  });

export default Comment;