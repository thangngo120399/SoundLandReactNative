import React, { useEffect, useState, useCallback } from "react";
import { useRoute } from "@react-navigation/native";

import FormContainer from "../Login/FormContainer";
import FormInput from "../Login/FormInput";
import FormSubmitButton from "../Login/FormSubmitButton";
import MultiLine from "../Blogger/MultiLine";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { LinearGradient } from "expo-linear-gradient";
import ImageUpload from "./ImageUpload";
import ImageUploadMulti from "./ImageUploadMulti";
import Comments from "../Comment/comments";
import {
  ActivityIndicator,
  Picker,
  FlatList,
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  LogBox,
  RefreshControl,
} from "react-native";
const { width } = Dimensions.get("window");
const BlogDetail = () => {
  const [files, setFiles] = useState();
  const [multiFile, setMultiFile] = useState();
  const route = useRoute();
  const id = route.params.id;
  const [isLoading, setLoading] = useState(true);
  const [data3, setData] = useState();
  const [listUrlImage, setListUrlImage] = useState([]);
  const contentWidth = Dimensions.get("window").width;
  const [userInfo, setUserInfo] = useState({
    fullName: "",
    gender: "",
    causeOfDeath: "",
    ralationship: "",
    biography: "",
    privacyType: 1,
  });

  const [moreInformation, setMoreInformation] = useState({
    location: "",
    nickName: "",
    birthDate: "",
    deathDate: "",
  });

  const {
    fullName,
    gender,
    causeOfDeath,
    ralationship,
    biography,
    privacyType,
  } = userInfo;

  const { location, nickName, birthDate, deathDate } = moreInformation;

  const [error, setError] = useState("");
  const handleOnChangeText = (value, fieldName) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const handleOnChangeTextMoreInformation = (value, fieldName) => {
    setMoreInformation({ ...moreInformation, [fieldName]: value });
  };
  useEffect(() => {
    fetch(`https://soulland.herokuapp.com/api/memos/api/memos/id?id=${id}`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setUserInfo(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const submitForm = () => {};
  const submitFormMoreInformation = () => {
    console.log(moreInformation.location);
  };
  return (
    <ScrollView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <View style={styles.container}>
            <FormContainer style={{ marginLeft: 0 }}>
              {error ? (
                <Text
                  style={{ color: "red", fontSize: 18, textAlign: "center" }}
                >
                  {error}
                </Text>
              ) : null}
              <ImageUpload setFiles={setFiles} files={data3.urlImage} />
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
                onChangeText={(value) =>
                  handleOnChangeText(value, "causeOfDeath")
                }
                label="Cause Of Death"
                placeholder="Accident"
                autoCapitalize="none"
              />
              <FormInput
                value={ralationship}
                onChangeText={(value) =>
                  handleOnChangeText(value, "ralationship")
                }
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Privacy Type</Text>
                </View>
                <Picker
                  style={{ marginTop: -70 }}
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
          </View>

          <View style={styles.moreInformation}>
            <FormContainer style={{ marginLeft: 0 }}>
              {error ? (
                <Text
                  style={{ color: "red", fontSize: 18, textAlign: "center" }}
                >
                  {error}
                </Text>
              ) : null}
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <ImageUploadMulti setMultiFile={setMultiFile} />
                <ImageUploadMulti setMultiFile={setMultiFile} />
                <ImageUploadMulti setMultiFile={setMultiFile} />
              </View>
              <FormInput
                value={location}
                onChangeText={(value) =>
                  handleOnChangeTextMoreInformation(value, "location")
                }
                label="Location"
                placeholder="Los Angeles"
                autoCapitalize="none"
              />
              <FormInput
                value={nickName}
                onChangeText={(value) =>
                  handleOnChangeTextMoreInformation(value, "nickName")
                }
                label="Nickname"
                placeholder="Tome"
                autoCapitalize="none"
              />

              <FormSubmitButton
                onPress={submitFormMoreInformation}
                title="Add"
              />
            </FormContainer>
          </View>
          <View>
            <View style={styles.singleBlog}>
              <Text style={styles.singleBlogCategory}>{data3.fullName}</Text>
              <Text style={styles.singleBlogTitle}>{data3.nickName}</Text>
              <Image
                style={styles.singleBlogImage}
                source={{ uri: data3.urlImage }}
              />
              {/* <Text style={styles.singleBlogDetail} source={{ html: data3.biography }} contentWidth={contentWidth} /> */}
              <Text style={styles.singleBlogDetail} contentWidth={contentWidth}>
                {data3.biography}
              </Text>
            </View>
            <View style={styles.sliderCardList_3}>
              <Text style={styles.singleBlogTitle_}>Photos</Text>
              <SwiperFlatList
                autoplay
                autoplayDelay={2}
                autoplayLoop
                index={1}
                data={data3.urlListImage}
                style={styles.sliderCardList}
                renderItem={({ item }) => (
                  <ImageBackground
                    style={styles.sliderCard}
                    source={{ uri: item }}
                  >
                    <TouchableOpacity style={styles.sliderCardContent}>
                      <LinearGradient
                        style={styles.sliderCardContent}
                        colors={["#ffffff2e", "#ffffff2e", "#07090ef2"]}
                      >
                        {/* <Text style={styles.sliderCardTitle}></Text> */}
                      </LinearGradient>
                    </TouchableOpacity>
                  </ImageBackground>
                )}
              />
            </View>
            <View style={styles.sliderCardList_3}>
              <Comments data={data3.listContributions}></Comments>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    shadowColor: "#00000003",
    margin: 5,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#1b1b33",
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 8,
  },
  moreInformation: {
    flex: 1,
    backgroundColor: "white",
    shadowColor: "#00000003",
    margin: 5,
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#1b1b33",
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 8,
  },
  logo: {
    width: 200,
    height: 40,
    justifyContent: "center",
  },
  blogCard: {
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "#00000003",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 15,
  },
  blogCardImage: {
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  blogCardTitle: {
    fontSize: 16,
    marginBottom: 6,
  },
  blogCardDetail: {
    fontSize: 15,
    color: "#b1b1b1",
  },
  singleBlog: {
    flex: 1,
    padding: 15,
  },

  singleBlogCategory: {
    color: "#595DAF",
    marginBottom: 10,
  },

  singleBlogTitle: {
    fontSize: 25,
    marginBottom: 15,
  },

  singleBlogTitle_: {
    fontSize: 25,
    padding: 15,
  },

  singleBlogImage: {
    height: 250,
    borderRadius: 15,
    marginBottom: 15,
  },

  singleBlogDetail: {
    color: "#b1b1b1",
    fontSize: 18,
  },

  sliderCard: {
    width: width - 30,
    height: 250,
  },
  sliderCardContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  sliderCardTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    padding: 15,
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
  sliderCardContainer: {
    marginBottom: 5,
    padding: 15,
  },
  sliderCardList: {
    borderRadius: 15,
    width: width - 30,
    height: 250,
    marginBottom: 15,
  },
  sliderCardList_2: {
    borderRadius: 15,
    width: width - 60,
    height: 250,
    marginTop: 100,
  },
  sliderCardList_3: {
    marginTop: 20,
  },
});
export default BlogDetail;
