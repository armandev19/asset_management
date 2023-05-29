import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import AssetScreen from './DrawerScreens/AssetScreen';
import LocationsScreen from './DrawerScreens/LocationsScreen';
import ReportScreen from './DrawerScreens/ReportScreen';
import LogsScreen from './DrawerScreens/LogsScreen';
import UsersScreen from './DrawerScreens/UsersScreen';
import TrackerScreen from './DrawerScreens/TrackerScreen';
import AssetTransferScreen from './DrawerScreens/AssetTransferScreen';

import CustomSidebarMenu from './Components/CustomSidebarMenu';

import NavigationDrawerHeader from './Components/NavigationDrawerHead';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { color } from 'react-native-reanimated';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="Dashboard"
        component={HomeScreen}
        options={{
          title: 'DASHBOARD', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#348ceb', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
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
          title: 'ASSETS', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#348ceb', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const LocationsStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="LocationsScreen">
      <Stack.Screen
        name="Locations"
        component={LocationsScreen}
        options={{
          title: 'LOCATIONS', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#348ceb', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const AssetTransferStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="AssetTransferScreen">
      <Stack.Screen
        name="Asset Transfer"
        component={AssetTransferScreen}
        options={{
          title: 'ASSET TRANSFER', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#348ceb', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const ReportStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="ReportScreen">
      <Stack.Screen
        name="Reports"
        component={ReportScreen}
        options={{
          title: 'REPORTS', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#348ceb', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const LogsStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="LogsScreen">
      <Stack.Screen
        name="Logs"
        component={LogsScreen}
        options={{
          title: 'LOGS', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#348ceb', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const UsersStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="UsersScreen">
      <Stack.Screen
        name="Logs"
        component={UsersScreen}
        options={{
          title: 'USERS', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#348ceb', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const TrackerStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="TrackerScreen">
      <Stack.Screen
        name="TRACK ASSET"
        component={TrackerScreen}
        options={{
          title: 'TRACK ASSET', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#348ceb', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = ({navgiation, route}) => {
  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false, color: 'red', textColor: 'yellow',
        activeTintColor: 'red',
        activeBackgroundColor: 'white',
        inactiveTintColor: 'blue',
        inactiveBackgroundColor: 'white',
        itemStyle: {marginVertical: 5, color: 'red'},
        backgroundColor: '#cc0000'}}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{drawerLabel: 'DASHBOARD', drawerLabelStyle: {color: '#348ceb'}, drawerIcon: (({focused}) => <Icon name="home" size={30} color="#348ceb" />)}}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="AssetScreen"
        options={{drawerLabel: 'ASSETS', drawerLabelStyle: {color: '#348ceb'}, drawerIcon: (({focused}) => <Icon name="settings" size={30} color="#348ceb" />)}}
        component={AssetStack}
      />
      <Drawer.Screen
        name="LocationsScreen"
        options={{drawerLabel: 'LOCATIONS', drawerLabelStyle: {color: '#348ceb'}, drawerIcon: (({focused}) => <Icon name="location-on" size={30} color="#348ceb" />)}}
        component={LocationsStack}
      />
      <Drawer.Screen
        name="AssetTransferScreen"
        options={{drawerLabel: 'ASSET TRANSFER', drawerLabelStyle: {color: '#348ceb'}, drawerIcon: (({focused}) => <Icon name="send" size={30} color="#348ceb" />)}}
        component={AssetTransferStack}
      />
      <Drawer.Screen
        name="ReportScreen"
        options={{drawerLabel: 'REPORTS', drawerLabelStyle: {color: '#348ceb'}, drawerIcon: (({focused}) => <Icon name="list" size={30} color="#348ceb" />)}}
        component={ReportStack}
      />
      <Drawer.Screen
        name="LogsSreen"
        options={{drawerLabel: 'LOGS', drawerLabelStyle: {color: '#348ceb'}, drawerIcon: (({focused}) => <Icon name="info" size={30} color="#348ceb" />)}}
        component={LogsStack}
      />
      <Drawer.Screen
        name="UsersScreen"
        options={{drawerLabel: 'USERS', drawerLabelStyle: {color: '#348ceb'}, drawerIcon: (({focused}) => <Icon name="person" size={30} color="#348ceb" />)}}
        component={UsersStack}
      />
      {/* <Drawer.Screen
        name="TrackerScreen"
        options={{drawerLabel: 'TRACK ASSET', drawerLabelStyle: {color: '#348ceb'}, drawerIcon: (({focused}) => <Icon name="qrcode" size={30} color="#348ceb" />)}}
        component={TrackerStack}
      /> */}

     {/* {(() => {
        if (user_data.access == 'Admin') {
            return (
            <Drawer.Screen
              name="UsersScreenStack"
              options={{drawerLabel: 'Users', drawerIcon: (({focused}) => <Icon name="people" size={30} color="#900" />)}}
              component={UsersScreenStack}
              initialParams={{ params: user_data }}
            />
        );
      }
    })()} */}
       
    </Drawer.Navigator>
  );
};
 
export default DrawerNavigatorRoutes;
