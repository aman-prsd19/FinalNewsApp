import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from './src/HomeScreen/HomeScreen';
import FindNews from './src/HomeScreen/FindNews';
import SearchNews from './src/SearchNews/SearchNews';
import Login from './src/Login/Login';
import SignUp from './src/SignUp/SignUp';
import Profile from './src/Profile/Profile';
import Bookmarks from './src/Bookmarks/Bookmarks';
import 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={() => <Profile />}  >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen name="FindNews" component={FindNews} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MyDrawer"
          component={MyDrawer}
          options={{headerShown: false}}
        />

        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Bookmarks" component={Bookmarks} />
        <Stack.Screen name="SearchNews" component={SearchNews} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

export default App;
