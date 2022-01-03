import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Picker,
} from "react-native";
import { useLogin } from "../../context/LoginProvider";
import { isValidObjField, updateError } from "../../utils/methods";
import FormContainer from "../Login/FormContainer";
import FormInput from "../Login/FormInput";
import FormSubmitButton from "../Login/FormSubmitButton";
import MemoriesService from "../../service/memories.services";
import ImageUpload from "./ImageUpload";
import MultiLine from "./MultiLine";
const CreateMemoriesForm = ({ navigation }) => {
  const { setIsLoggedIn, setProfile } = useLogin();
  const formData = new FormData();
  const [files, setFiles] = useState();
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    gender: "",
    causeOfDeath: "",
    ralationship: "",
    biography: "",
    privacyType: 1,
  });

  const [error, setError] = useState("");

  const {
    fullName,
    gender,
    causeOfDeath,
    ralationship,
    biography,
    privacyType,
  } = userInfo;

  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", setError);

    return true;
  };

  const submitForm = async () => {
    // if (isValidForm()) {
    formData.append("files", files);
    formData.append("fullName", fullName);
    formData.append("gender", gender);
    formData.append("causeOfDeath", causeOfDeath);
    formData.append("ralationship", ralationship);
    formData.append("biography", biography);
    formData.append("privacyType", 1);

    try {
      MemoriesService.createMemory(formData).then((response) => {
        alert("Added memory success!");
        // setReload(!reload);
        navigation.navigate("Home");
        // setProfile(response.data);

        setIsLoggedIn(true);
      });
    } catch (error) {
      console.log(error);
    }
    // }
  };

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: "red", fontSize: 18, textAlign: "center" }}>
          {error}
        </Text>
      ) : null}
      <ImageUpload setFiles={setFiles} />
      <FormInput
        value={fullName}
        onChangeText={(value) => handleOnChangeText(value, "fullName")}
        label="FullName"
        placeholder="David"
        autoCapitalize="none"
      />
      <FormInput
        value={gender}
        onChangeText={(value) => handleOnChangeText(value, "gender")}
        label="Gender"
        placeholder="Male"
        autoCapitalize="none"
      />

      <FormInput
        value={causeOfDeath}
        onChangeText={(value) => handleOnChangeText(value, "causeOfDeath")}
        label="Cause Of Death"
        placeholder="Accident"
        autoCapitalize="none"
      />
      <FormInput
        value={ralationship}
        onChangeText={(value) => handleOnChangeText(value, "ralationship")}
        label="Relationship"
        placeholder="Father"
        autoCapitalize="none"
      />

      <MultiLine
        underlineColorAndroid="transparent"
        placeholderTextColor="grey"
        numberOfLines={20}
        multiline={true}
        value={biography}
        onChangeText={(value) => handleOnChangeText(value, "biography")}
        label="Biography"
        placeholder="Typing biography ..."
        autoCapitalize="none"
      />
      <View>
        <Picker
          selectedValue={privacyType}
          onValueChange={(value, itemIndex) =>
            handleOnChangeText(value, "privacyType")
          }
        >
          <Picker.Item label="Public" value="1" />
          <Picker.Item label="Private" value="0" />
        </Picker>
      </View>
      <FormSubmitButton onPress={submitForm} title="Submit" />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
  },
});

export default CreateMemoriesForm;
