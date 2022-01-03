import React, { useEffect, useState, useCallback } from "react";
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
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useRoute } from "@react-navigation/native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { LinearGradient } from "expo-linear-gradient";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Comments from "../Comment/comments";
import BlogDetail from "./EditMyMemories";
const { width } = Dimensions.get("window");

// LogBox.ignoreLogs(["Warning: ..."]);

//Ignore all log notifications
// LogBox.ignoreAllLogs();

function HomeScreen({ navigation: { navigate } }) {
  const [isLoading, setLoading1] = useState(true);
  const [data, setData1] = useState([]);

  const [isLoading2, setLoading] = useState(true);
  const [data2, setData] = useState([]);

  const [content, setContent] = useState([]);

  const contentWidth = Dimensions.get("window").width;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetch("https://soulland.herokuapp.com/api/memos?page=0&size=15")
      .then((response) => response.json())
      .then((json) => setData1(json.content))
      .catch((error) => console.error(error))
      .finally(() => setLoading1(false));
    fetch("https://soulland.herokuapp.com/api/memos?page=0&size=15")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [refreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        {isLoading2 ? (
          <ActivityIndicator />
        ) : (
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={1}
            data={data2.content}
            style={styles.sliderCardList}
            renderItem={({ item }) => (
              <ImageBackground
                style={styles.sliderCard}
                source={{ uri: item.avatar }}
              >
                <TouchableOpacity
                  style={styles.sliderCardContent}
                  onPress={() => navigate("Blog", { id: item.id })}
                >
                  <LinearGradient
                    style={styles.sliderCardContent}
                    colors={["#ffffff2e", "#ffffff2e", "#07090ef2"]}
                  >
                    <Text style={styles.sliderCardTitle}>{item.fullName}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </ImageBackground>
            )}
          />
        )}

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigate("Blog", { id: item.id })}
            >
              <View style={styles.blogCard}>
                <Image
                  style={styles.blogCardImage}
                  source={{ uri: item.avatar }}
                />
                <Text style={styles.blogCardTitle}>{item.fullName}</Text>
                <Text numberOfLines={2} style={styles.blogCardDetail}>
                  {item.biography}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const Stack = createStackNavigator();

// function HeaderLogo() {
//   return (
//     <Image
//       style={styles.logo}
//       source="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
//     />
//   );
// }

const Tab = createBottomTabNavigator();

function HomescreenNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SoulLand"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Blog" component={BlogDetail} />
    </Stack.Navigator>
  );
}

function home({ navigation }) {
  return (
    <HomescreenNavigator />

    // <NavigationContainer>
    //   <Tab.Navigator
    //     screenOptions={({ route }) => ({
    //       tabBarIcon: ({ focused, color, size }) => {
    //         let iconName;

    //         if (route.name === "Home") {
    //           iconName = focused ? "ios-home" : "ios-home-outline";
    //         } else if (route.name === "Settings") {
    //           iconName = focused ? "person-circle" : "person-circle-outline";
    //         }

    //         // You can return any component that you like here!
    //         return <Ionicons name={iconName} size={size} color={color} />;
    //       },
    //       tabBarActiveTintColor: "tomato",
    //       tabBarInactiveTintColor: "gray",
    //     })}
    //   >
    //     <Tab.Screen
    //       name="Home"
    //       options={{ headerShown: false }}
    //       component={HomescreenNavigator}
    //     />
    //     <Tab.Screen name="Settings" component={SettingsScreen} />
    //   </Tab.Navigator>
    // </NavigationContainer>
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

export default home;
