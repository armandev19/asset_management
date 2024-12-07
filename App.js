import { GestureHandlerRootView } from 'react-native-gesture-handler';
// Import React and Component
import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Import Navigators from React Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
 
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import * as firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import RootStackNavigation from './screens/RootStackNavigation';
// import { selectUserData, setUserData } from './screens/redux/navSlice';

import { Provider as ReduxProvider, useSelector } from 'react-redux';
import { store } from './screens/redux/store';

import { API_URL, APP_ENV } from '@env';

const Stack = createStackNavigator();


const App = () => {
  global.url = "https://www.app-ams.online/asset_management/";
  global.backendUrl = "";
  // global.url = API_URL+"/";
  // global.url = "http://192.168.192.35/asset_management/";
  // global.url = "http://153.92.4.169/asset_management/"
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  global.serverkey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDaT+j/s+f9pKP7\nObSieH1Z77ENtVlanTl5J/YoeSXR+2nO7IeXhhwhyqZrE9PVpXtCmKhqfQQgevD6\nCM/x6lLBQEl2aLM5PBQgxtpogZvYkHzFLI3R6XoaDrkt4KS3AtWEB9cuGP4aT9JE\nQTYpsao7Q8MsDWZOO3VwHZeZFBn4ilMFtAgMqwxcp2zi1p8qLOoz7tmz6bzFmjjh\nnAUVAjmfQTTyguQq4+r3PJnT4SeDbNKe1JztPrRHYx+Ch1BRBXbnMoT3iaGQOuKV\nP2YXM03wHFo2xZk7CJjgUmr8hpYWZMJPMz2y2vYdeIDEoOqQFfYMhqzo6cgN6GNk\nz+owJh/RAgMBAAECggEAHripEra3+lcdZmCX/VcUWMAku8ed4+UFLfoEJ2zo+BQ3\nrxFVAWszcUPpyF65bDLF1jjSVm3yUznJyH3N+X6el6hazilssyyzrmsdWCCJFGA8\n1qhu6q++6YTR5VVcCI8DCfnqe4ez1nMOJWHB4/sm+AEQqZXXJEI0xAq+ByIvh2x5\nHj5byL9nqIPMrs7pGkLP5wd6qw9uZ3uw1Hg1Z5Yx7W6K0MGrCnPt6gebfBuBkT37\nMhbdG5OIA5lhUb4NAQCtVqg5B1U64AXu+lbNsHRaXnHNPYqW900IPFhd/ExcgJAB\n4Ul6MnzzkBTQ3Chx+v41Uabfouva5foqNo0Wv5+DEwKBgQD6VwZQjZE3D0tEdVdW\nS++w8P3MMmjiIJGQzantqegEpwNmSk8KsthnXdjDBjAZrnV6QO4khBxK34+Alp8n\nu0XimhcO6EU6sj5iLMeC7yyw0ZocK+F4aU7y41w2YGhdWWUa3peUl2qd00Jhmjea\nd6tNUgekh5rn1gCiUGIaao0c8wKBgQDfP4H0iKiKbTpCec4tCSfb9OqmJameNBxe\nvH4NQ7l/OCfQ3pFC7s8r4mhHrR4cdB3R3MuUwONbQleV5Y3I7cAuNg1pDan2mx9E\nyi7pBSHyVB512tGSVuUsF2YIu8C1tTLFutLUl2OTH1sqrBNJT2oNuwg7x7VWHLNT\n2/JOm2lxKwKBgHEvbZR4HWL2kEJYh29mD+5BV46+b/tlXEtLIXxqKJQJ6xiRmmEs\n8XjyznGG17KU1Vq8BrAN5zjXEWvDLhxpqLRGlQxRahOayWfb9Sy29M7RRctc76lg\ne6iHsYaIWkdyhqr6XzB4sWTAQrAcaO13E8V2xCvYf+o4MLsyetiUuk6PAoGAfCzR\n9xdQT/bjcfhYcvplvlXjctj+GK45nYRQxMYH1riAhRBXUhiNCYbcpAmp9v+rWoDq\nh+omTCuBljHiBIIh5FJScT2VbULpSJUBNMGTGTwq2TkGWtSUkkrNiUwNq8SG4i7B\neFhgnYPSbNDbxWozvkFrGf1CYwyBvsJXa9vL8ZMCgYEAySdj7n+r8OrfPinU6O0Y\np1oZ+mwKqZ87uTJtqBviFmJKal6T5Z3qPSI7Wik4R8R+K1Yn009Xl+B673T/m9cL\nyO9vEe2WngRIGBKuYE8g2Wklqo4mhgQRgqGhXzEIrBszr7trpLghQXb0sBORnuRe\niJC7XJwB7wna/UzugPREJHg=';
  
  
// console.log(`API URL: ${API_URL}`);
// console.log(`Environment: ${APP_ENV}`);
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
        // console.log('App has come to the foreground!');
      }else{
        AsyncStorage.removeItem('user_id');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      // console.log('AppState', appState.current);
    });
    requestUserPermission();
    messageSubscription();
    testFunction();
    // return () => {
    //   subscription.remove();
    //   messageSubscription();
    // };
  }, []);
  
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      // console.log('User granted messaging permissions');
    } else {
      console.log('User denied messaging permissions');
    }
  }

  PushNotification.createChannel(
    {
      channelId: 'AMS-Channel1', // (required)
      channelName: 'AMS Notifications', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    // (created) => 
    //   console.log(`createChannel returned adasdasd '${created}'`)
    // , // (optional) callback returns whether the channel was created, false means it already existed.
  );
  

  const messageSubscription = messaging().onMessage(async remoteMessage => {
    const notificationData = remoteMessage.notification; // Extract notification data
    if (notificationData) {
      const title = notificationData.title;
      const body = notificationData.body;
      PushNotification.localNotification({
        title: title,
        message: body,
        channelId: 'test123', // Specify the channel ID for the notification
      });
    }
  });

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Background notification received:', remoteMessage);
    // Similar handling here
  });

  const testFunction = async () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }

  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <RootStackNavigation />
      </PaperProvider>
    </ReduxProvider>
  );
};
 
export default App;