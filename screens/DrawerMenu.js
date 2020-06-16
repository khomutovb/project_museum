import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Block, Text, Button } from 'expo-ui-kit';
import { Feather, AntDesign } from '@expo/vector-icons';
import Home from '../screens/home';
import Post from '../screens/postDetails';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Screens = ({ navigation, style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: '300',
          },
        }}>
        <Stack.Screen name="Museum of Art" component={Home} />
        <Stack.Screen
          name="Post"
          component={Post}
          options={({ route }) => ({
            title:
              route.params.titleSearch !== undefined
                ? route.params.titleSearch
                : route.params.picture.title,
          })}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={({ route }) => ({
            title: route.params.nameSearch,
          })}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          screenOptions={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerCustom = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Block>
        <Block margin={10}>
          <Image
            source={{
              uri: 'https://foxtime.ru/wp-content/uploads/2019/12/7-12.jpg',
              height: 50,
              width: 50,
            }}
            style={{ borderRadius: 15, marginVertical: 10 }}
          />
          <Text style={{ color: '#fff' }}>Art&Culture</Text>
          <Text style={{ fontSize: 10, color: '#fff' }}>
            Experience The Met, Anywhere
          </Text>
        </Block>
        <DrawerItem
          label="Home"
          labelStyle={{ marginLeft: -16, width: 150, color: '#fff' }}
          onPress={() => props.navigation.navigate('Museum of Art')}
          icon={() => <Feather name="home" color="#ff6200" size={16} />}
        />
        <DrawerItem
          label="Profile"
          labelStyle={{ marginLeft: -16, width: 150, color: '#fff' }}
          onPress={() => props.navigation.navigate('Profile')}
          icon={() => <Feather name="user" color="#ff6200" size={16} />}
        />
        <DrawerItem
          label="Setting"
          labelStyle={{ marginLeft: -16, width: 150, color: '#fff' }}
          onPress={() => props.navigation.navigate('Home')}
          icon={() => <Feather name="settings" color="#ff6200" size={16} />}
        />
      </Block>
    </DrawerContentScrollView>
  );
};

const DrawerMenu = (route) => {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };
  return (
    <Block style={{ backgroundColor: 'rgba(39, 39, 39, 0.89)' }}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={{ width: '60%', backgroundColor: 'transparent' }}
        contentContainerStyle={{ flex: 1 }}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        drawerContent={(props) => {
          setProgress(props.progress);
          return (
            <DrawerCustom
              {...props}
              initialRoute="Home"
              screenOptions={{
                headerShown: false,
              }}
            />
          );
        }}>
        <Drawer.Screen name="Post">
          {(props) => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </Block>
  );
};
const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    overflow: 'scroll',
    borderRadius: 10,
  },
});
export default DrawerMenu;
