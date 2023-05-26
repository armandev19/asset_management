import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, Button} from 'react-native';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import Moment from 'moment';

const AssetDetailsScreen = ({route, navigation}) => {
  
  const params = route.params
    console.log(params.id);
};
 
export default AssetDetailsScreen;