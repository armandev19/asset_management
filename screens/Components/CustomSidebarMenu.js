import React, { useState } from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
 
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector, useDispatch } from 'react-redux';

const CustomSidebarMenu = (props) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const dispatch = useDispatch();
  
  const currentUserData = useSelector(selectUserData);

  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          {/* <Icon name="person" size={40}/> */}
        </View>

        {currentUserData ? (
          <Text style={stylesSidebar.profileHeaderText}>
          {currentUserData.firstname} {currentUserData.lastname}
          {`\n`}
          <Text style={{color: 'gray', fontSize: 17, textTransform: 'uppercase', fontStyle: 'italic'}}>{currentUserData.access_level}</Text>
          </Text>
        ) :
        (
          <Text style={stylesSidebar.profileHeaderText}>
            
          </Text>
        )}
          
      </View>
      {/* <View style={stylesSidebar.profileHeaderLine} /> */}
 
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => 
            <View>
              
              <Icon name="account-off" size={20} color="#348ceb" />
            <Text style={{
              color: '#348ceb',
              fontSize: 14,
              fontWeight: '400',
              }}>
              Log out
            </Text>
            
            </View>
          }
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    AsyncStorage.removeItem('user_id');
                    dispatch(setUserData(null));
                    props.navigation.replace('Auth');
                    setUserPassword({})
                    setUserEmail({})
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
};
 
export default CustomSidebarMenu;
 
const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 5,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'black',
    backgroundColor: '#348ceb',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'black',
    alignSelf: 'center',
    textTransform: 'uppercase',
    paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize: 20
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#348ceb',
    marginTop: 15,
  },
});