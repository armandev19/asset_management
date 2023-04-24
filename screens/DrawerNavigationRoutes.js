import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
// Import Navigators from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
// Import Screens
import HomeScreen from './DrawerScreens/HomeScreen';
import AcceptedScreen from './DrawerScreens/AcceptedScreen';
import MyRaisedRequestScreen from './DrawerScreens/MyRaisedRequestScreen';
import DonationHistoryScreen from './DrawerScreens/DonationHistoryScreen';
import PastRequestScreen from './DrawerScreens/PastRequestScreen';
import MapViewScreen from './DrawerScreens/MapViewScreen';
import CustomSidebarMenu from './Components/CustomSidebarMenu';
import ProfileScreen from './DrawerScreens/ProfileScreen';
import UsersScreen from './DrawerScreens/UsersScreen';

import NavigationDrawerHeader from './Components/NavigationDrawerHead';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Dashboard', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: 'skyblue', //Set Header color
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
        name="PastRequest"
        component={PastRequestScreen}
        options={{
          title: 'Assets', //Set Header Title
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
    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Locations', //Set Header Title
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

const AcceptedRequestStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="AcceptedScreen">
      <Stack.Screen
        name="Reports"
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

const MyRaisedRequestStack = ({navigation, route}) => {
  return (
    <Stack.Navigator initialRouteName="MyRaisedRequestScreen">
      <Stack.Screen
        name="MyRaisedRequest"
        component={MyRaisedRequestScreen}
        options={{
          title: 'My Raised Request', //Set Header Title
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

const MapViewStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="MapView">
      <Stack.Screen
        name="MapView"
        component={MapViewScreen}
        options={{
          title: 'Map View', //Set Header Title
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

const UsersScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="UsersScreen">
      <Stack.Screen
        name="Users List"
        component={UsersScreen}
        options={{
          title: 'Users List', //Set Header Title
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

const DrawerNavigatorRoutes = ({navgiation, route}) => {
  const[user_data, setUserData] = useState({});
  
  useFocusEffect(
    React.useCallback(() => {
        setTimeout(async () => {

            try {
                const userData = await AsyncStorage.getItem('user_id');
                if (userData !== null) {
                    let userDataArray = JSON.parse(userData);
                    setUserData(userDataArray);
                }
            } catch (e) {
                console.log(e);
            }
        });
    }, [])
  );
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
        options={{drawerLabel: 'Dashboard', drawerIcon: (({focused}) => <Icon name="home" size={30} color="#900" />)}}
        component={HomeScreenStack}
        initialParams={{ params : user_data}}
      />
      <Drawer.Screen
        name="MapViewScreen"
        options={{drawerLabel: 'Assets', drawerIcon: (({focused}) => <Icon name="map" size={30} color="#900" />)}}
        component={MapViewStack}
      />
      {/* <Drawer.Screen
        name="MyProfileStack"
        options={{drawerLabel: 'My Profile', drawerIcon: (({focused}) => <Icon name="user" size={30} color="#900" />)}}
        component={MyProfileStack}
      /> */}
      <Drawer.Screen
        name="AcceptedScreen"
        options={{drawerLabel: 'Locations', drawerIcon: (({focused}) => <Icon name="check-circle-outline" size={30} color="#900" />)}}
        component={AcceptedRequestStack}
        initialParams={{ params: user_data }}
      />
      <Drawer.Screen
        name="MyRaisedRequestScreen"
        options={{drawerLabel: 'Reports', drawerIcon: (({focused}) => <Icon name="playlist-add" size={30} color="#900" />)}}
        component={MyRaisedRequestStack}
        initialParams={{ params: user_data }}
      />
      <Drawer.Screen
        name="DonationHistoryScreen"
        options={{drawerLabel: 'Logs', drawerIcon: (({focused}) => <Icon name="history" size={30} color="#900" />)}}
        component={DonationHistoryStack}
        initialParams={{ params: user_data }}
      />
      <Drawer.Screen
        name="MyProfileStack"
        options={{drawerLabel: 'User Profile', drawerIcon: (({focused}) => <Icon name="account-box" size={30} color="#900" />)}}
        component={MyProfileStack}
        initialParams={{ params: user_data }}
      />
     {(() => {
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
    })()}
       
    </Drawer.Navigator>
  );
};
 
export default DrawerNavigatorRoutes;
