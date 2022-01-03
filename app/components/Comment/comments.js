import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  Text,
  View, TouchableOpacity, Dimensions
} from 'react-native';
import Comment from "./comment";
import JustComment from "./JustComment";
import React, { Component, PropTypes } from 'react';
import { useState } from 'react/cjs/react.development';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';


const windowHeight = Dimensions.get('window').height;


function Comments(props) {
  
  const [data,setData] = useState(props.data);
  const [justCommentData,setJustCommentData] = useState([]);
  const lenData = props.data.length*50;

  const uploadImage = async () => {
      // Check if any file is selected or not
      if (singleFile != null) {
        // If file selected then create FormData
        const fileToUpload = singleFile;
        const data1 = new FormData();
        data1.append('name', 'Image Upload');
        data1.append('file_attachment', fileToUpload);
        // Please change file upload URL
        let res = await fetch(
          'http://127.0.0.1:8080/upload.php',
          {
            method: 'post',
            body: data1,
            headers: {
              'Content-Type': 'multipart/form-data; ',
            },
          }
        );
        let responseJson = await res.json();
        if (responseJson.status == 1) {
          alert('Upload Successful');
        }
      } else {
        // If no file selected the show alert
        alert('Please Select File first');
      }
    };

      const [singleFile, setSingleFile] = useState(null);

      const [text,setText] = useState("");

      const onChangeText = (text) => setText(text);

      const onSubmitEditing = ({ nativeEvent: { text } }) => setText(text, this.submit);



      const onSubmit = async (text) => {
          try {
            var bodyFormData = new FormData();
            bodyFormData.append('idMemo', props.idMemo);
            bodyFormData.append('textComment', text);
              const response = await axios
                  .post("https://soulland.herokuapp.com/api/user/commentflower" , bodyFormData ,
                  );
                  
              setJustCommentData([...justCommentData,response.data]);
              return response;
          } catch (error) {
              alert("Error comments");
          }
        };

      const submit = () => {
      if (text.length > 0) {
          
          onSubmit(text)
      } else 
      {
        alert('Please enter your comment first');
      }
    };

    const selectFile = async () => {
      // Opening Document Picker to select one file
      try {
        const res = await DocumentPicker.pick({
          // Provide which type of file you want user to pick
          type: [DocumentPicker.types.allFiles],
          // There can me more options as well
          // DocumentPicker.types.allFiles
          // DocumentPicker.types.images
          // DocumentPicker.types.plainText
          // DocumentPicker.types.audio
          // DocumentPicker.types.pdf
        });
        // Printing the log realted to the file
        // console.log('res : ' + JSON.stringify(res));
        // Setting the state to show single file attributes
        setSingleFile(res);
      } catch (err) {
        setSingleFile(null);
        // Handling any exception (If any)
        if (DocumentPicker.isCancel(err)) {
          // If user canceled the document selection
          alert('Canceled');
        } else {
          // For Unknown Error
          alert('Unknown Error: ' + JSON.stringify(err));
          throw err;
        }
      }
    };
  
return (
  <View>
  {
       data.map((item,index)=>(
          <Comment key={index} data={item}></Comment>
       ))
  }
  {
    justCommentData.map((item,index)=>(
      <JustComment key={index} data={item}></JustComment>
   ))
  }


<KeyboardAvoidingView
      style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="position" enabled   keyboardVerticalOffset={windowHeight-150-lenData}
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
          <TextInput
            placeholder="Add a comment..."
            keyboardType="twitter" // keyboard with no return button
            style={styles.input}
            value={text}
            onChangeText={onChangeText} // handle input changes
            onSubmitEditing={onSubmitEditing} // handle submit event
          />

          <TouchableOpacity
            style={styles.button}
            onPress={submit}
          >
            <Text style={[styles.text, !text ? styles.inactive : []]}>Post</Text>
          </TouchableOpacity>
          
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
  
  </View>
  
);
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flexDirection: 'column',
    borderTopWidth: 1,
    borderColor: '#EEE',
    alignItems: 'center',
    paddingLeft: 15,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  button: {
    height: 40,
    paddingHorizontal: 20,
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactive: {
    color: '#CCC',
  },
  text: {
    color: '#3F51B5',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
    fontSize: 15,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  keyboard: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
 }
});

export default Comments;
