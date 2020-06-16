import * as React from 'react';
import { Text, View, StyleSheet, Block } from 'react-native';
import Constants from 'expo-constants';
//Navigation
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import Drawer Navigarion
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
//Import files
import Home from './screens/home';
import Post from './screens/postDetails';
import Profile from './screens/Profile';
import DrawerMenu from './screens/DrawerMenu';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <DrawerMenu />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({});
