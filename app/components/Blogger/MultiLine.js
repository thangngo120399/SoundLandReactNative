import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";

const MultiLine = (props) => {
  const { placeholder, label, error } = props;

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{label}</Text>
        {error ? (
          <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
        ) : null}
      </View>
      <View style={styles.textAreaContainer}>
        <TextInput
          {...props}
          style={styles.textArea}
          underlineColorAndroid="transparent"
          placeholder="Type something"
          placeholderTextColor="grey"
          numberOfLines={20}
          multiline={true}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "#1b1b33",
    borderWidth: 1,
    padding: 5,
    marginBottom: 0,
    borderRadius: 10,
  },
  textArea: {
    height: 250,
    justifyContent: "flex-start",
  },
});

export default MultiLine;
