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
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

//const greet = require('./greet.png');
const emailpic = require("./emailpicnew.png");
const saved = require("./saved.png");
const logout = require("./logout.png");

function Profile() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        let username = await AsyncStorage.getItem("curUser");
        if (username) {
          let data = await AsyncStorage.getItem(username);
          const parsedData = JSON.parse(data);
          setName(parsedData.n);
          setEmail(parsedData.e);
        }
      } catch (e) {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    };

    fetchdata();
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.pic}>
        <Text style={styles.firstLetter}>{name[0]}</Text>
      </View>
      <View style={styles.greetName}>
        <Text style={styles.hi}>Hi, {name} </Text>
      </View>

      <View style={{ alignItems: "center" }}>
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            width: 250,
          }}
        ></View>
      </View>

      <View style={styles.greet}>
        <View>
          <Image source={emailpic} style={styles.icon} />
        </View>
        <View>
          <Text style={styles.lg2}>{email} </Text>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            width: 250,
          }}
        ></View>
      </View>

      <View style={styles.greet}>
        <View>
          <Image source={saved} style={styles.icon} />
        </View>
        <View>
          <TouchableOpacity style={styles.button2}>
            <Text
              style={styles.lg2}
              onPress={() => {
                navigation.navigate("Bookmarks", { screen: "Bookmarks" });
              }}
            >
              My Bookmarks
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ alignItems: "center" }}>
        <View
          style={{
            borderBottomColor: "grey",
            borderBottomWidth: 1,
            width: 250,
          }}
        ></View>
      </View>

      <View style={styles.greet}>
        <View>
          <Image source={logout} style={styles.icon} />
        </View>
        <View>
          <TouchableOpacity style={styles.button2} activeOpacity={0.2}>
            <Text
              style={styles.lg2}
              onPress={() => {
                AsyncStorage.removeItem("curUser");
                navigation.navigate("Login", { screen: "Login" });
              }}
            >
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    //backgroundColor:"#D4F1F4"
  },
  button2: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    //backgroundColor:"#D4F1F4"
  },
  greet: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 20,
    marginBottom: 10,
    height: 35,
    //backgroundColor:"#D4F1F4"
  },
  lg2: {
    fontSize: 14,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 20,
    marginRight: 10,
    padding: 10,
  },
  pic: {
    width: 70,
    height: 70,
    backgroundColor: "#D4F1F4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 40,
    marginLeft: 20,
  },
  firstLetter: {
    fontSize: 40,
  },
  greetName: {
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  hi: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
