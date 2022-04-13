import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../Profile/Profile';
import HomeScreen from '../HomeScreen/HomeScreen';
const Drawer = createDrawerNavigator();

const MyDrawer = props => {
  console.log('hereee', props);
  return (
    <Drawer.Navigator
    initialRouteName='Profile'
      drawerContent={() => <Profile />}>
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
