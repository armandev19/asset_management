import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Import React and Component
import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 
// Import Screens
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import DrawerNavigationRoutes from './screens/DrawerNavigationRoutes';
import DetailScreen from './screens/DetailScreen';
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
import AssetMaintenanceScreen from './screens/AssetMaintenanceScreen';
import CameraScreen from './screens/CameraScreen';
import * as firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

// import { selectUserData, setUserData } from './screens/redux/navSlice';

import { Provider, useSelector } from 'react-redux';
import { store } from './screens/redux/store';
import SmsAndroid from 'react-native-get-sms-android';

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
    </Stack.Navigator>
  );
};


const App = () => {
  global.url = "http://192.168.1.7/asset_management/";
  // global.url = "https://91a5-2001-4454-1d5-2900-7945-4d6f-8f8b-12f3.ngrok-free.app/asset_management/"
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  global.serverkey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDaT+j/s+f9pKP7\nObSieH1Z77ENtVlanTl5J/YoeSXR+2nO7IeXhhwhyqZrE9PVpXtCmKhqfQQgevD6\nCM/x6lLBQEl2aLM5PBQgxtpogZvYkHzFLI3R6XoaDrkt4KS3AtWEB9cuGP4aT9JE\nQTYpsao7Q8MsDWZOO3VwHZeZFBn4ilMFtAgMqwxcp2zi1p8qLOoz7tmz6bzFmjjh\nnAUVAjmfQTTyguQq4+r3PJnT4SeDbNKe1JztPrRHYx+Ch1BRBXbnMoT3iaGQOuKV\nP2YXM03wHFo2xZk7CJjgUmr8hpYWZMJPMz2y2vYdeIDEoOqQFfYMhqzo6cgN6GNk\nz+owJh/RAgMBAAECggEAHripEra3+lcdZmCX/VcUWMAku8ed4+UFLfoEJ2zo+BQ3\nrxFVAWszcUPpyF65bDLF1jjSVm3yUznJyH3N+X6el6hazilssyyzrmsdWCCJFGA8\n1qhu6q++6YTR5VVcCI8DCfnqe4ez1nMOJWHB4/sm+AEQqZXXJEI0xAq+ByIvh2x5\nHj5byL9nqIPMrs7pGkLP5wd6qw9uZ3uw1Hg1Z5Yx7W6K0MGrCnPt6gebfBuBkT37\nMhbdG5OIA5lhUb4NAQCtVqg5B1U64AXu+lbNsHRaXnHNPYqW900IPFhd/ExcgJAB\n4Ul6MnzzkBTQ3Chx+v41Uabfouva5foqNo0Wv5+DEwKBgQD6VwZQjZE3D0tEdVdW\nS++w8P3MMmjiIJGQzantqegEpwNmSk8KsthnXdjDBjAZrnV6QO4khBxK34+Alp8n\nu0XimhcO6EU6sj5iLMeC7yyw0ZocK+F4aU7y41w2YGhdWWUa3peUl2qd00Jhmjea\nd6tNUgekh5rn1gCiUGIaao0c8wKBgQDfP4H0iKiKbTpCec4tCSfb9OqmJameNBxe\nvH4NQ7l/OCfQ3pFC7s8r4mhHrR4cdB3R3MuUwONbQleV5Y3I7cAuNg1pDan2mx9E\nyi7pBSHyVB512tGSVuUsF2YIu8C1tTLFutLUl2OTH1sqrBNJT2oNuwg7x7VWHLNT\n2/JOm2lxKwKBgHEvbZR4HWL2kEJYh29mD+5BV46+b/tlXEtLIXxqKJQJ6xiRmmEs\n8XjyznGG17KU1Vq8BrAN5zjXEWvDLhxpqLRGlQxRahOayWfb9Sy29M7RRctc76lg\ne6iHsYaIWkdyhqr6XzB4sWTAQrAcaO13E8V2xCvYf+o4MLsyetiUuk6PAoGAfCzR\n9xdQT/bjcfhYcvplvlXjctj+GK45nYRQxMYH1riAhRBXUhiNCYbcpAmp9v+rWoDq\nh+omTCuBljHiBIIh5FJScT2VbULpSJUBNMGTGTwq2TkGWtSUkkrNiUwNq8SG4i7B\neFhgnYPSbNDbxWozvkFrGf1CYwyBvsJXa9vL8ZMCgYEAySdj7n+r8OrfPinU6O0Y\np1oZ+mwKqZ87uTJtqBviFmJKal6T5Z3qPSI7Wik4R8R+K1Yn009Xl+B673T/m9cL\nyO9vEe2WngRIGBKuYE8g2Wklqo4mhgQRgqGhXzEIrBszr7trpLghQXb0sBORnuRe\niJC7XJwB7wna/UzugPREJHg=';
  
  // BackgroundFetch.configure({
  //   minimumFetchInterval: 15, // Fetch interval in minutes (Android)
  //   stopOnTerminate: false, // Continue background fetch when the app is terminated (Android)
  //   startOnBoot: true, // Start background fetch on device boot (Android)
  // }, async (taskId) => {
  //   // This callback will be invoked periodically when a background fetch event occurs
  //   console.log('[BackgroundFetch] TaskId:', taskId);
  
  //   // Perform any background tasks here, such as fetching data or syncing
  //   // Example:
  //   // await fetchAndUpdateData();
    
  //   // You must call BackgroundFetch.finish(taskId) at the end of your task
  //   BackgroundFetch.finish(taskId);
  // });
  

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
    requestUserPermission();
    messageSubscription();
    testFunction();
    return () => {
      subscription.remove();
      messageSubscription();
    };
  }, []);
  
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User granted messaging permissions');
    } else {
      console.log('User denied messaging permissions');
    }
  }

  PushNotification.createChannel(
    {
      channelId: 'rawr123', // Unique ID for the channel
      channelName: 'Default Channel', // Display name of the channel
      channelDescription: 'A default channel for notifications', // Description of the channel
      soundName: 'default', // Sound to play for notifications (optional)
      importance: 4, // Importance level of the channel (0-4, with 4 being highest)
      vibrate: true, // Whether to enable vibration for notifications (optional)
    },
    (created) => console.log(`Channel created: ${created}`)
  );

  const messageSubscription = messaging().onMessage(async remoteMessage => {
    const notificationData = remoteMessage.notification; // Extract notification data
    if (notificationData) {
      const title = notificationData.title;
      const body = notificationData.body;
      PushNotification.localNotification({
        title: title,
        message: body,
        channelId: 'rawr123', // Specify the channel ID for the notification
      });
    }
  });

  const testFunction = async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }

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
          name="EditProfileScreen"
          title="Edit Profile"
          component={EditProfileScreen}
          options={{title: "Edit Profile"}}
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
          name="AssetMaintenanceScreen"
          title="ASSET MAINTENANCE"
          component={AssetMaintenanceScreen}
          options={{
            title: "ASSET MAINTENANCE",
            headerStyle: {
              backgroundColor: '#348ceb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },}}
        />

        <Stack.Screen
          name="CameraScreen"
          title="CAMERA"
          component={CameraScreen}
          options={{
            title: "CAMERA",
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
        
        <Stack.Screen
          name="UserDetailsScreen"
          title="User Details"
          component={UserDetailsScreen}
          options={{
            title: "USER DETAILS",
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