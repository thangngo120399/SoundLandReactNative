import React, { useEffect, useState, useCallback } from "react";
import { useRoute } from "@react-navigation/native";

import { SwiperFlatList } from "react-native-swiper-flatlist";
import { LinearGradient } from "expo-linear-gradient";
import Comments from "../Comment/comments";
import {
  ActivityIndicator,
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
function BlogDetail() {
  const route = useRoute();
  const id = route.params.id;
  const [isLoading, setLoading] = useState(true);
  const [data3, setData] = useState([]);
  const [listUrlImage, setListUrlImage] = useState([]);
  const contentWidth = Dimensions.get("window").width;

  useEffect(() => {
    fetch(`https://soulland.herokuapp.com/api/memos/api/memos/id?id=${id}`)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ScrollView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.container}>
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
          {
            data3.urlListImage ? (<View style={styles.sliderCardList_3}>
              <Text style={styles.singleBlogTitle_}>Photos</Text>
              <SwiperFlatList
                autoplay
                autoplayDelay={2}
                autoplayLoop
                index={0}
                data={data3.urlListImage}
                style={styles.sliderCardList}
                renderItem={({ item }) => (
                  <ImageBackground
                    style={styles.sliderCard}
                    source={{ uri: item }}
                    source={ item ? {uri: item } : null}
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
            </View>):(<View><Text>No photos</Text></View>)
          }
          <View style={styles.sliderCardList_3}>
            <Comments data={data3.listContributions} idMemo={id}></Comments>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: "column",
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
