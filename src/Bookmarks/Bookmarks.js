import AsyncStorage from "@react-native-async-storage/async-storage";
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
} from "react-native";
import dayjs from "dayjs";
import {select} from "../constant"
import {unselect} from "../constant"

// const select = require('../HomeScreen/selected.png');
// const unselect = require('../HomeScreen/unselected.png');

//----------------------------------------------

function Bookmarks() {
  var relativeTime = require("dayjs/plugin/relativeTime");
  dayjs.extend(relativeTime);

  const [savedNews, setSavednews] = useState([]);

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
        ToastAndroid.show(
          'Something went wrong',
          ToastAndroid.SHORT,
        );
      }
    };
    createArray();
  }, []);



  const findBookmarks = ({item}) => {
    for (let i = 0; i < savedNews.length; i++) {
      if (savedNews[i].url == item.url) {
        return true;
      }
    }
    return false;
  };

  const saveNews = async ({item}) => {
    try {
      let present = 1;
      const user = await AsyncStorage.getItem('curUser');
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
      ToastAndroid.show(
        'Something went wrong',
        ToastAndroid.SHORT,
      );
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
          <View style={{ margin: 20 }}>
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
          <View style={{ flex: 1 }}>
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
      {savedNews.length==0 ? 
      (<View style={styles.message}>
        <Text style={styles.messageText}>
          No saved news !!
        </Text>
        </View>):
        (<FlatList data={savedNews.reverse()} renderItem={article} />)}
      
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#00000000",
    alignItems:'center',
    justifyContent:'center'
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
    marginRight:10,
    marginBottom:10
  },
  messageText:{
    fontSize:18
  }
});

export default Bookmarks;
