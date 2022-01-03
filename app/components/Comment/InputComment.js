import React, { Component, PropTypes } from "react";
// Import Document Picker
import DocumentPicker from "react-native-document-picker";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState } from "react/cjs/react.development";
import { ScrollView } from "react-native-gesture-handler";

function Inputcomment(props) {
  const uploadImage = async () => {
    // Check if any file is selected or not
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append("name", "Image Upload");
      data.append("file_attachment", fileToUpload);
      // Please change file upload URL
      let res = await fetch("http://127.0.0.1:8080/upload.php", {
        method: "post",
        body: data,
        headers: {
          "Content-Type": "multipart/form-data; ",
        },
      });
      let responseJson = await res.json();
      if (responseJson.status == 1) {
        alert("Upload Successful");
      }
    } else {
      // If no file selected the show alert
      alert("Please Select File first");
    }
  };

  const [singleFile, setSingleFile] = useState(null);

  const [text, setText] = useState("");

  const onChangeText = (text) => setText(text);

  const onSubmitEditing = ({ nativeEvent: { text } }) =>
    setText(text, this.submit);

  const onSubmit = (text) => {
    alert(text);
  };

  const submit = () => {
    if (text.length >= 0) {
      // setText("", () => onSubmit(text));
      onSubmit(text);
    } else {
      alert("Please enter your comment first");
    }
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // Printing the log realted to the file
      console.log("res : " + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert("Canceled");
      } else {
        // For Unknown Error
        alert("Unknown Error: " + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      behavior="position"
      enabled
      keyboardVerticalOffset={props.windowHeight - 150 - props.lenData}
    >
      <ScrollView>
        <View style={styles.container}>
          {/* <View>
            <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={selectFile}>
            <Text style={styles.buttonTextStyle}>Select File</Text>
          </TouchableOpacity>
            </View> */}

          {/* Comment input field */}
          <TextInput
            placeholder="Add a comment..."
            keyboardType="twitter" // keyboard with no return button
            style={styles.input}
            value={text}
            onChangeText={onChangeText} // handle input changes
            onSubmitEditing={onSubmitEditing} // handle submit event
          />

          <TouchableOpacity style={styles.button} onPress={submit}>
            <Text style={[styles.text, !text ? styles.inactive : []]}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    flexDirection: "column",
    borderTopWidth: 1,
    borderColor: "#EEE",
    alignItems: "center",
    paddingLeft: 15,
    paddingTop: 30,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,

    alignItems: "center",
    justifyContent: "center",
  },
  inactive: {
    color: "#CCC",
  },
  text: {
    color: "#3F51B5",
    fontWeight: "bold",
    fontFamily: "Avenir",
    textAlign: "center",
    fontSize: 15,
  },
  buttonStyle: {
    backgroundColor: "#307ecc",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#307ecc",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  keyboard: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default Inputcomment;
