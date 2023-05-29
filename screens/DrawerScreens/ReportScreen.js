import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Button, Modal, ToastAndroid, Alert, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';

const ReportScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={{color: 'black', textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>Reports View</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});
 
export default ReportScreen;