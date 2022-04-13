import * as React from 'react';
import {Component, useState, useEffect} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const icon = require('./globe.png');

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassworrd] = useState('');
  const navigation = useNavigation();

  useEffect(() => {

    const find = async () => {
      let seek = await AsyncStorage.getItem('curUser');
      try{
      if (seek) navigation.navigate('MyDrawer');
      }
      catch(e)
      {
        ToastAndroid.show(
          'Something went wrong',
          ToastAndroid.SHORT,
        );
      }
    };

    find();
  }, []);

  const check = async () => {
    try {
      let data = await AsyncStorage.getItem(username);

      let pass = JSON.parse(data).p;

      if (password != null && password == pass) {
        AsyncStorage.setItem('curUser', username);
        navigation.navigate('MyDrawer');
      } else {
        
        ToastAndroid.show(
          'Wrong credentials, Please check',
          ToastAndroid.SHORT,
        );
      }

    } catch (e) {
      ToastAndroid.show('User not found, Please register', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.lg}>Welcome to NewsApp</Text>

      <View>
        <Image source={icon} style={styles.icon} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={username => setUsername(username)}
        value={username}
      />

      {/* <Text>
                {user ? <Text> USERNAME EXISTS</Text>  : null}
            </Text> */}

      <TextInput
        secureTextEntry={true}
        style={styles.input}
        placeholder="Password"
        onChangeText={password => setPassworrd(password)}
        value={password}
      />

      <View styles={styles.signup}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp', {screen: 'SignUp'})}>
          <Text style={styles.t}>Don't have account? SignUp</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={check}
        activeOpacity={0.5}>
        <Text style={styles.lg1}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000000',
  },

  t: {
    color: '#000000',
  },

  lg: {
    fontSize: 25,
    color: '#000000',
  },

  lg1: {
    fontSize: 20,
    color: '#ffffff',
  },

  input: {
    width: 270,
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
    height: 40,
  },

  button: {
    marginTop: 20,
    width: 150,
    backgroundColor: '#2EB086',
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    fontSize: 15,
    borderRadius: 20,
  },
  icon: {
    height: 80,
    width: 80,
    marginTop: 10,
    borderRadius: 50,
  },
});

export default Login;
