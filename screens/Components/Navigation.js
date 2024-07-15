import React, {useRef, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import AssetScreen from './../DrawerScreens/AssetScreen';
import HomeScreen from './../DrawerScreens/HomeScreen';
import ReportScreen from './../DrawerScreens/ReportScreen';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LinearGradient from 'react-native-linear-gradient';

const Stack = createStackNavigator();
 
const Tab = createMaterialBottomTabNavigator();


const Navigation = () => {
const HomeStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="Assets"
        component={HomeScreen}
        
        options={{
          title: 'Home', //Set Header Title
          // headerLeft: () => (
          //   <NavigationDrawerHeader navigationProps={navigation} />
          // ),
          headerStyle: {
            backgroundColor: '#F05924', //Set Header color
            elevation: 0
          },
          headerTintColor: '#ffffff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AssetStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="AssetScreen">
      <Stack.Screen
        name="Assets"
        component={AssetScreen}
        options={{
          title: 'Assets', //Set Header Title
          // headerLeft: () => (
          //   <NavigationDrawerHeader navigationProps={navigation} />
          // ),
          headerStyle: {
            backgroundColor: '#F05924', //Set Header color
          },
          headerTintColor: '#ffffff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

return (
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#f5571d"
        inactiveColor="gray"
        barStyle={{ backgroundColor: '#fae5d7' }}
      >
        <Tab.Screen name="Home" component={HomeStack} 
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Assets" component={AssetStack} 
          options={{
            tabBarLabel: 'Assets',
            tabBarIcon: ({ color }) => (
              <Icon name="view-list" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Rawr" component={AssetStack} 
          options={{
            tabBarLabel: 'Scan',
            tabBarIcon: ({ color }) => (
              <Icon name="qrcode-scan" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="asdasd" component={AssetScreen} 
          options={{
            tabBarLabel: 'Notifications',
            tabBarIcon: ({ color }) => (
              <Icon name="bell" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen name="Reports" component={ReportScreen} 
          options={{
            tabBarLabel: 'Reports',
            tabBarIcon: ({ color }) => (
              <Icon name="clipboard-file" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
)


}


export default Navigation;