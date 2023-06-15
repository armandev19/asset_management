import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, Dimensions} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const ReportScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 15, margin: 15, }}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => alert('asdasd')} 
        style={{
          width: '100%',
          marginHorizontal: 5,
          marginVertical: 10,
          backgroundColor: '#348ceb',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5
        }}>
        <View style={{ flexDirection:'row', padding: 5 }}>
          <Icon name='database-plus' size={23} color={'#FFFFFF'} style={{marginTop: 2}}></Icon>
          <Text adjustsFontSizeToFit style={{ color: '#FFFFFF', fontSize: 25, fontWeight: "bold"}}> Transfer Report</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('asdasd')} 
        style={{
          width: '100%',
          marginHorizontal: 5,
          marginVertical: 10,
          backgroundColor: '#348ceb',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5
        }}>
        <View style={{ flexDirection:'row', padding: 5 }}>
          <Icon name='file-check' size={23} color={'#FFFFFF'} style={{marginTop: 2}}></Icon>
          <Text adjustsFontSizeToFit style={{ color: '#FFFFFF', fontSize: 25, fontWeight: "bold"}}> Transfer Report</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('asdasd')}
        style={{
          width: '100%',
          marginHorizontal: 5,
          marginVertical: 10,
          backgroundColor: '#348ceb',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5
        }}>
        <View style={{ flexDirection:'row', padding: 5 }}>
          <Icon name='truck-delivery' size={23} color={'#FFFFFF'} style={{marginTop: 2}}></Icon>
          <Text adjustsFontSizeToFit style={{ color: '#FFFFFF', fontSize: 25, fontWeight: "bold"}}> Transfer Report</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('asdasd')}
        style={{
          width: '100%',
          marginHorizontal: 5,
          marginVertical: 10,
          backgroundColor: '#348ceb',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5
        }}>
      <View style={{ flexDirection:'row', padding: 5 }}>
        <Icon name='hammer-wrench' size={23} color={'#FFFFFF'} style={{marginTop: 2}}></Icon>
        <Text adjustsFontSizeToFit style={{ color: '#FFFFFF', fontSize: 25, fontWeight: "bold"}}> Maintenance Report</Text>
      </View>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});
 
export default ReportScreen;