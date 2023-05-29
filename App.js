import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Import React and Component
import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 
// Import Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DrawerNavigationRoutes from './screens/DrawerNavigationRoutes';
import DetailScreen from './screens/DetailScreen';
import DonationDetailsScreen from './screens/DonationDetailsScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import UserDetailsScreen from './screens/UserDetailsScreen';
import AssetDetailsScreen from './screens/AssetDetailsScreen';
import AddAssetScreen from './screens/AddAssetScreen';
import AddLocationScreen from './screens/AddLocationScreen';
import UpdateAssetScreen from './screens/UpdateAssetScreen';
import UpdateLocationScreen from './screens/UpdateLocationScreen';
import UpdateUsersScreen from './screens/UpdateUsersScreen';
import AddUsersScreen from './screens/AddUsersScreen';
import AddAssetTransferScreen from './screens/AddAssetTransferScreen';

import { Provider } from 'react-redux';
import { store } from './screens/redux/store';

const Stack = createStackNavigator();
 
const Auth = () => {
  // Stack Navigator for Login and Sign up Screen
  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: 'Register', //Set Header Title
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


const App = () => {
  // global.url = "http://192.168.179.127/asset_management/";
  global.url = "http://asset-management.epizy.com/asset_management/";
  // global.url = "http://192.168.1.10/asset_management/";
  
  // global.url = "https://homeworldconstruction.com/mobile/blood_saver/";
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }else{
        AsyncStorage.removeItem('user_id');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* SplashScreen which will come once for 5 Seconds */}
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          // Hiding header for Splash Screen
          options={{headerShown: false}}
        />
        {/* Auth Navigator: Include Login and Signup */}
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{headerShown: false}}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="DrawerNavigationRoutes"
          component={DrawerNavigationRoutes}
          // Hiding header for Navigation Drawer
          options={{headerShown: false}}
        />
        
        <Stack.Screen
          name="DetailScreen"
          title="Request Details"
          component={DetailScreen}
          options={{title: "Request Details"}}
        />
        <Stack.Screen
          name="DonationDetailsScreen"
          title="Donation Details"
          component={DonationDetailsScreen}
          options={{title: "Donation Details"}}
        />
        <Stack.Screen
          name="EditProfileScreen"
          title="Edit Profile"
          component={EditProfileScreen}
          options={{title: "Edit Profile"}}
        />
        <Stack.Screen
          name="UserDetailsScreen"
          title="User Details"
          component={UserDetailsScreen}
          options={{title: "User Details"}}
        />
        <Stack.Screen
          name="AddAssetScreen"
          title="Add Asset"
          component={AddAssetScreen}
          options={{
            title: "ADD ASSET",
            headerStyle: {
              backgroundColor: '#348ceb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="AddLocationScreen"
          title="Add Asset"
          component={AddLocationScreen}
          options={{
            title: "ADD LOCATION",
            headerStyle: {
              backgroundColor: '#348ceb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="AddUsersScreen"
          title="Add User"
          component={AddUsersScreen}
          options={{
            title: "ADD USER",
            headerStyle: {
              backgroundColor: '#348ceb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="AddAssetTransferScreen"
          title="Add Asset Transfer"
          component={AddAssetTransferScreen}
          options={{
            title: "ADD ASSET TRANSFER",
            headerStyle: {
              backgroundColor: '#348ceb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />

        <Stack.Screen
          name="AssetDetailsScreen"
          title="Asset Details"
          component={AssetDetailsScreen}
          options={{
            title: "ASSET DETAILS",
            headerStyle: {
              backgroundColor: '#348ceb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },}}
        />
        
        <Stack.Screen
          name="UpdateAssetScreen"
          title="Update Asset"
          component={UpdateAssetScreen}
          options={{
            title: "UPDATE ASSET",
            headerStyle: {
              backgroundColor: '#348ceb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },}}
        />
        <Stack.Screen
          name="UpdateLocationScreen"
          title="Update Location"
          component={UpdateLocationScreen}
          options={{
            title: "UPDATE LOCATION",
            headerStyle: {
              backgroundColor: '#348ceb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },}}
        />
        <Stack.Screen
          name="UpdateUsersScreen"
          title="Update User"
          component={UpdateUsersScreen}
          options={{
            title: "UPDATE USER",
            headerStyle: {
              backgroundColor: '#348ceb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};
 
export default App;