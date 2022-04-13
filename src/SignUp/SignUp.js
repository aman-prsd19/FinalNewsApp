import * as React from "react";
import { useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const icon = require("./globe.jpeg");

function SignUp() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const saveData = async () => {
    let cred = { n: name, p: password, e: email, bookMarks: [] };

    try {
      let data = await AsyncStorage.getItem(username);

      var pass = JSON.parse(data).p;
      if (pass)
        ToastAndroid.show("Username already exists", ToastAndroid.SHORT);
    } catch (e) {
      await AsyncStorage.setItem(username, JSON.stringify(cred));
      ToastAndroid.show("Registered, Login Now", ToastAndroid.SHORT);
      navigation.navigate("Login", { screen: "Login" });
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.lg}>Register on NewsApp</Text>

      <View>
        <Image source={icon} style={styles.icon} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(username) => setUsername(username)}
        value={username}
      />

      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(name) => setName(name)}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        onChangeText={(email) => setEmail(email)}
        value={email}
      />

      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Enter Password"
        onChangeText={(password) => setPassword(password)}
        value={password}
      />

      <View styles={styles.signup}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login", { screen: "Login" })}
        >
          <Text style={styles.t}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.lg1} onPress={saveData}>
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00000000",
  },

  lg: {
    fontSize: 25,
    color: "#000000",
  },

  t: {
    color: "#000000",
  },

  lg1: {
    fontSize: 20,
    color: "#ffffff",
  },

  input: {
    width: 270,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginTop: 20,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 20,
    height: 40,
  },

  button: {
    marginTop: 20,
    width: 150,
    backgroundColor: "#2EB086",
    alignItems: "center",
    justifyContent: "center",
    height: 35,
    fontSize: 15,
    borderRadius: 20,
  },
  icon: {
    height: 100,
    width: 100,
    marginTop: 10,
    borderRadius: 50,
  },
});

export default SignUp;
