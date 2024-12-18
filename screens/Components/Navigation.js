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
  TextInput,
  Alert
} from 'react-native';

import { FAB, Portal } from 'react-native-paper';
import AssetScreen from './../DrawerScreens/AssetScreen';
import HomeScreen from './../DrawerScreens/HomeScreen';
import ReportScreen from './../DrawerScreens/ReportScreen';
import UsersScreen from './../DrawerScreens/UsersScreen';
import DetailScreen from '../DetailScreen';
import AssetDetailsScreen from '../AssetDetailsScreen';
import AssetMaintenanceScreen from '../AssetMaintenanceScreen';
import NotificationiScreen from '../DrawerScreens/NotificationScreen';
import TrackerScreen from '../DrawerScreens/TrackerScreen';
import AssetTransferScreen from '../DrawerScreens/AssetTransferScreen';
import UpdateAssetScreen from '../UpdateAssetScreen';
import AddAssetScreen from '../AddAssetScreen';
import AddAssetTransferScreen from '../AddAssetTransferScreen';
import ViewNotifScreen from '../ViewNotifScreen';
import UserDetailsScreen from '../UserDetailsScreen';
import UpdateUsersScreen from '../UpdateUsersScreen';
import AddUsersScreen from '../AddUsersScreen';
import AddLocationScreen from '../AddLocationScreen';
import LocationScreen from '../DrawerScreens/LocationsScreen';
import UpdateLocationScreen from '../UpdateLocationScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector, useDispatch } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Stack = createStackNavigator();
 
const Tab = createMaterialBottomTabNavigator();


const Navigation = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatch = useDispatch();
  
  const currentUserData = useSelector(selectUserData);

  const showAlert = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Logout", 
          onPress: () => {
            AsyncStorage.removeItem('user_id');
            dispatch(setUserData(null));
            setUserPassword({})
            setUserEmail({})
          }
        }
      ],
      { cancelable: false }
    );
  };

  const HomeStack = ({navigation}) => {
    return (
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#fc8953',
              elevation: 0
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Assets"
          component={AssetScreen}
          options={{
            title: 'Assets',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AssetDetailsScreen"
          component={AssetDetailsScreen}
          options={{
            title: 'Assets Details',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
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
            title: 'Reports',
            headerStyle: {
              backgroundColor: '#fc8953',
              elevation: 0
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
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
          name="Users"
          component={UsersScreen}
          options={{
            title: 'Users',
            headerStyle: {
              backgroundColor: '#fc8953',
              elevation: 0
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="UserDetailsScreen"
          component={UserDetailsScreen}
          options={{
            title: 'User Details',
            headerStyle: {
              backgroundColor: '#fc8953',
              elevation: 0
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="UpdateUsersScreen"
          component={UpdateUsersScreen}
          options={{
            title: 'Update User Details',
            headerStyle: {
              backgroundColor: '#fc8953',
              elevation: 0
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AddUsersScreen"
          component={AddUsersScreen}
          options={{
            title: 'Add User',
            headerStyle: {
              backgroundColor: '#fc8953',
              elevation: 0
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    );
  };

  const NotificationStack = ({navigation}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Notifications"
          component={NotificationiScreen}
          
          options={{
            title: 'Notifications',
            headerStyle: {
              backgroundColor: '#fc8953',
              elevation: 0
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="ViewNotifScreen"
          component={ViewNotifScreen}
          
          options={{
            title: 'Notifications',
            headerStyle: {
              backgroundColor: '#fc8953',
              elevation: 0
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
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
            title: 'Assets',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AssetDetailsScreen"
          component={AssetDetailsScreen}
          options={{
            title: 'Assets Details',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AssetMaintenanceScreen"
          component={AssetMaintenanceScreen}
          options={{
            title: 'Assets Maintenance',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="LocationScreen"
          component={LocationScreen}
          options={{
            title: 'Locations',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AddLocationScreen"
          component={AddLocationScreen}
          options={{
            title: 'Add Location',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="UpdateLocationScreen"
          component={UpdateLocationScreen}
          options={{
            title: 'Update Location',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="UpdateAssetScreen"
          component={UpdateAssetScreen}
          options={{
            title: 'Update Asset',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AddAssetScreen"
          component={AddAssetScreen}
          options={{
            title: 'Add Asset',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AssetTransferScreen"
          component={AssetTransferScreen}
          options={{
            title: 'Transfer Asset',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="AddAssetTransferScreen"
          component={AddAssetTransferScreen}
          options={{
            title: 'Transfer Asset',
            headerStyle: {
              backgroundColor: '#fc8953',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
        <Stack.Screen
          name="TrackerScreen"
          component={TrackerScreen}
          options={{
            title: 'Track Asset',
            headerStyle: {
              backgroundColor: '#fc8953', 
            },
            headerTintColor: '#ffffff', 
            headerTitleStyle: {
              fontWeight: 'bold', 
            },
          }}
        />
      </Stack.Navigator>
    );
  };
  
  return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#fff"
          inactiveColor="#573f34"
          barStyle={{ backgroundColor: '#fc8953' }}
        >
          <Tab.Screen name="Home" component={HomeStack} 
            options={{
              tabBarLabel: 'Home',
              tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="AssetsScreen" component={AssetStack} 
            options={{
              tabBarLabel: 'Assets',
              tabBarIcon: ({ color }) => (
                <Icon name="view-list" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="ReportsScreen" component={ReportStack} 
            options={{
              tabBarLabel: 'Reports',
              tabBarIcon: ({ color }) => (
                <Icon name="clipboard-file" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen name="NotificationsScreen" component={NotificationStack} 
            options={{
              headerShown: false,
              tabBarLabel: 'Notifications',
              tabBarIcon: ({ color }) => (
                <Icon name="bell" color={color} size={26} />
              ),
            }}
          />
          {currentUserData.access_level == 'Admin' || currentUserData == 'Manager' ?
          <Tab.Screen name="UsersScreen" component={UsersStack} 
            options={{
              headerShown: false,
              tabBarLabel: 'Users',
              tabBarIcon: ({ color }) => (
                <Icon name="account" color={color} size={26} />
              ),
            }}
          />
          : null }
          <Tab.Screen name="Logout"
            listeners={({ navigation }) => ({
              tabPress: e => {
                e.preventDefault();
                showAlert();
              },
            })}
            options={{
              tabBarLabel: 'Logout',
              tabBarIcon: ({ color }) => (
                <Icon name="logout" color={color} size={26} />
              ),
            }}>
            {() => <View />}
            </Tab.Screen>
        </Tab.Navigator>
  )



}


export default Navigation;