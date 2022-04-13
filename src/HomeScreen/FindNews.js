import React, { Component, useEffect, useState, useRef } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Linking,
  FlatList,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { apikey } from "../constant";

import { select } from "../constant";
import { unselect } from "../constant";

let currentCount = 0;
let totalNews = 0;

function FindNews(props) {
  const page = useRef(1);

  const [news, setNews] = useState([]);
  const [savedNews, setSavednews] = useState([]);
  const navigation = useNavigation();

  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  var heading;
  var url;

  props.route.params.item
    ? (heading = `${props.route.params.item}`)
    : (heading = `Top news related to : ${props.route.params.searchItem.query}`);

  useEffect(() => {
    const createArray = async () => {
      try {
        const user = await AsyncStorage.getItem("curUser");
        if (user) {
          let data = await AsyncStorage.getItem(user);
          const parsedData = JSON.parse(data);
          let userBookmarks = parsedData.bookMarks;
          setSavednews(userBookmarks);
        }
      } catch (e) {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    };
    createArray();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: heading,
    });

    props.route.params.item
      ? (url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}&category=${props.route.params.item}&pageSize=5&page=${page.current}`)
      : (url = `https://newsapi.org/v2/everything?q=${props.route.params.searchItem.query}&from=${props.route.params.from}&to=${props.route.params.to}&sortBy=publishedAt&apiKey=${apikey}&pageSize=5&page=${page.current}`);

    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        totalNews = response.totalResults;
        setNews([...news, ...response.articles]);
        currentCount = page.current * 5;
        page.current += 1;
      })
      .catch((error) => {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      });
  }, []);

  const fetching = () => {
    
    props.route.params.item
      ? (url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}&category=${props.route.params.item}&pageSize=5&page=${page.current}`)
      : (url = `https://newsapi.org/v2/everything?q=${props.route.params.searchItem.query}&from=${props.route.params.from}&to=${props.route.params.to}&sortBy=publishedAt&apiKey=${apikey}&pageSize=5&page=${page.current}`);
    
    fetch(url)
      .then((res) => res.json())
      .then((response) => {
        setNews([...news, ...response.articles]);
        currentCount = page.current * 5;
        page.current += 1;
      })
      .catch((error) => {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      });
  };

  const findBookmarks = ({ item }) => {
    for (let i = 0; i < savedNews.length; i++) {
      if (savedNews[i].url == item.url) {
        //setSaved(true);
        return true;
      }
    }
    return false;
  };

  const saveNews = async ({ item }) => {
    try {
      let present = 1;
      const user = await AsyncStorage.getItem("curUser");
      if (!user) return;
      let data = await AsyncStorage.getItem(user);
      const parsedData = JSON.parse(data);
      let userBookmarks = parsedData.bookMarks;

      for (let i = 0; i < userBookmarks.length; i++) {
        if (userBookmarks[i].url == item.url) {
          userBookmarks.splice(i, 1);
          present = 0;
        }
      }
      if (present) {
        userBookmarks.push(item);
      }

      parsedData.bookMarks = userBookmarks;

      setSavednews(userBookmarks);
      await AsyncStorage.setItem(user, JSON.stringify(parsedData));
    } catch (e) {
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }
  };

  const article = ({ item }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            Linking.canOpenURL(item.url).then((supported) => {
              Linking.openURL(item.url);
            });
          }}
        >
          <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
            <Image source={{ uri: `${item.urlToImage}` }} style={styles.img} />
            <Text style={styles.desc}>{item.title}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginLeft: 20,
          }}
        >
          <View style={{ flex: 1, marginTop: 7 }}>
            <Text>{dayjs(item.publishedAt).fromNow()}</Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              marginRight: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                saveNews({ item });
              }}
            >
              {findBookmarks({ item }) ? (
                <Image source={select} style={styles.bookmark} />
              ) : (
                <Image source={unselect} style={styles.bookmark} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <View
            style={{
              borderBottomColor: "grey",
              borderBottomWidth: 1,
              width: 350,
            }}
          ></View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.body}>
      {news.length === 0 ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <FlatList
          data={news}
          renderItem={article}
          onEndReached={fetching}
          ListFooterComponent={
            currentCount < totalNews ? (
              <ActivityIndicator color="black" />
            ) : (
              <View style={styles.end}>
                <Text style={styles.tEnd}>
                  Great,You have read all the news !!
                </Text>
              </View>
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#00000000",
  },

  txt: {
    textAlign: "center",
    padding: 10,
    backgroundColor: "#16796F",
    color: "#ffffff",
    fontSize: 22,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 10,
  },

  img: {
    height: 200,
    width: 350,
    borderRadius: 10,
  },

  desc: {
    width: 350,
    marginTop: 7,
    fontSize: 18,
    color: "#323232",
    textAlign: "justify",
  },

  end: {
    flex: 1,
    color: "#000000",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  tEnd: {
    fontSize: 20,
    fontFamily: "sans-serif-light",
  },
  bookmark: {
    width: 20,
    height: 30,
    marginRight: 10,
    marginBottom: 20,
  },
});


// props.route.params.item
    //   ? ((heading = `${props.route.params.item}`),
    //     (url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apikey}&category=${props.route.params.item}&pageSize=5&page=${page.current}`))
    //   : ((heading = `Top news related to : ${props.route.params.searchItem.query}`),
    //     (url = `https://newsapi.org/v2/everything?q=${props.route.params.searchItem.query}&from=${props.route.params.from}&to=${props.route.params.to}&sortBy=publishedAt&apiKey=${apikey}&pageSize=5&page=${page.current}`));

export default FindNews;
