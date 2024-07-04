import React, {useRef, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AssetScreen from './../DrawerScreens/AssetScreen';
import HomeScreen from './../DrawerScreens/HomeScreen';
import ReportScreen from './../DrawerScreens/ReportScreen';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
 
const Tab = createBottomTabNavigator();


const Navigation = () => {

return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { position: 'absolute' },
          tabBarActiveBackgroundColor: '#348ceb',
          tabBarActiveTintColor: 'white',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} 
          options={({ route }) => ({
            tabBarIcon: () => {
              return <Icon name="home" size={20} />;
            }
          })}
        />
        <Tab.Screen name="Settings" component={AssetScreen} 
          options={({ route }) => ({
            tabBarIcon: () => {
              return <Icon name="home" size={20}/>;
            },
          })}
        />
        <Tab.Screen name="Reports" component={ReportScreen} 
          options={({ route }) => ({
            tabBarIcon: () => {
              return <Icon name="account" size={20} />;
            }
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
)


}


export default Navigation;