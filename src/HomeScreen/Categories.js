import React, {Component, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {pic} from '../constant';
import {pic1} from '../constant';
import {pic2} from '../constant';
import {pic3} from '../constant';
import {pic4} from '../constant';
import {pic5} from '../constant';


function Categories() {
  const [topic, setTopic] = useState('');
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.v1}
          onPress={() =>
            navigation.navigate('FindNews', {
              screen: 'FindNews',
              item: 'Business',
            })
          }>
          <View>
            <Image style={styles.img} source={pic} />
          </View>
          <View>
            <Text style={styles.topic}> Business </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.v2}
          onPress={() =>
            navigation.navigate('FindNews', {
              screen: 'FindNews',
              item: 'Entertainment',
            })
          }>
          <View>
            <Image source={pic1} style={styles.img} />
          </View>
          <View>
            <Text style={styles.topic}> Entertainment </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.v1}
          onPress={() =>
            navigation.navigate('FindNews', {
              screen: 'FindNews',
              item: 'Health',
            })
          }>
          <View>
            <Image source={pic2} style={styles.img} />
          </View>
          <View>
            <Text style={styles.topic}> Health </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.v2}
          onPress={() =>
            navigation.navigate('FindNews', {
              screen: 'FindNews',
              item: 'Technology',
            })
          }>
          <View>
            <Image source={pic3} style={styles.img} />
          </View>
          <View>
            <Text style={styles.topic}> Technology </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.v1}
          onPress={() =>
            navigation.navigate('FindNews', {
              screen: 'FindNews',
              item: 'Sports',
            })
          }>
          <View>
            <Image source={pic4} style={styles.img} />
          </View>
          <View>
            <Text style={styles.topic}> Sports </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.v2}
          onPress={() =>
            navigation.navigate('FindNews', {
              screen: 'FindNews',
              item: 'Science',
            })
          }>
          <View>
            <Image source={pic5} style={styles.img} />
          </View>
          <View>
            <Text style={styles.topic}> Science </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  v1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginLeft: 40,
    marginRight: 10,
    marginBottom: 10,
    marginTop: 10,
    height: 180,
    borderRadius: 20,
  },

  v2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginRight: 40,
    marginLeft: 10,
    height: 180,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
  },

  img: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  topic: {
    fontSize: 17.5,
  },
});

export default Categories;
