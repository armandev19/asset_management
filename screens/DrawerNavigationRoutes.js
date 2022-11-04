import React from 'react';
 
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
 
// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import SettingsScreen from './DrawerScreens/ProfileScreen';
import AcceptedScreen from './DrawerScreens/AcceptedScreen';
import MyRaisedRequestScreen from './DrawerScreens/MyRaisedRequestScreen';
import MyProfileScreen from './DrawerScreens/ProfileScreen';
import DonationHistoryScreen from './DrawerScreens/DonationHistoryScreen';
import PastRequestScreen from './DrawerScreens/PastRequestScreen';


import CustomSidebarMenu from './Components/CustomSidebarMenu';
import NavigationDrawerHeader from './Components/NavigationDrawerHead';
 
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
 
const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'HOME', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
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

const PastRequestStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="PastRequestScreen">
      <Stack.Screen
        name="PastRequestScreen"
        component={PastRequestScreen}
        options={{
          title: 'Past Request', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
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

const SettingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#ff3333', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
};

const AcceptedRequestStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="AcceptedScreen">
      <Stack.Screen
        name="AcceptedRequest"
        component={AcceptedScreen}
        options={{
          title: 'Accepted Requests', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
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

const MyRaisedRequestStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="MyRaisedRequestScreen">
      <Stack.Screen
        name="MyRaisedRequest"
        component={MyRaisedRequestScreen}
        options={{
          title: 'My Raised Requests', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
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

const DonationHistoryStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="DonationHistoryScreen">
      <Stack.Screen
        name="DonationHistory"
        component={DonationHistoryScreen}
        options={{
          title: 'Donation History', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
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

const MyProfileStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="MyProfile">
      <Stack.Screen
        name="MyRaisedRequestScreen"
        component={MyProfileScreen}
        options={{
          title: 'Profile', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#ff3333', //Set Header color
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
 
const DrawerNavigatorRoutes = (props) => {
  return (
    <Drawer.Navigator
      // drawerContentOptions={{
      //   textColor: 'yellow',
      //   activeTintColor: 'red',
      //   activeBackgroundColor: 'white',
      //   inactiveTintColor: 'blue',
      //   inactiveBackgroundColor: 'white',
      //   itemStyle: {marginVertical: 5, color: 'red'},
      //   backgroundColor: '#cc0000'
      // }}
      screenOptions={{headerShown: false, color: 'red', textColor: 'yellow',
        activeTintColor: 'red',
        activeBackgroundColor: 'white',
        inactiveTintColor: 'blue',
        inactiveBackgroundColor: 'white',
        itemStyle: {marginVertical: 5, color: 'red'},
        backgroundColor: '#cc0000'}}
      drawerContent={CustomSidebarMenu}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{drawerLabel: 'Home'}}
        component={HomeScreenStack}
      />
      <Drawer.Screen
        name="MyProfileStack"
        options={{drawerLabel: 'My Profile'}}
        component={MyProfileStack}
      />
      <Drawer.Screen
        name="AcceptedScreen"
        options={{drawerLabel: 'Accepted Request'}}
        component={AcceptedRequestStack}
      />
      <Drawer.Screen
        name="MyRaisedRequestScreen"
        options={{drawerLabel: 'My Raised Request'}}
        component={MyRaisedRequestStack}
      />
      <Drawer.Screen
        name="DonationHistoryScreen"
        options={{drawerLabel: 'Donation History'}}
        component={DonationHistoryStack}
      />
      <Drawer.Screen
        name="PastRequestScreen"
        options={{drawerLabel: 'Past Requests'}}
        component={PastRequestStack}
      />
       
    </Drawer.Navigator>
  );
};
 
export default DrawerNavigatorRoutes;
