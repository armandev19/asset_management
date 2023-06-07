import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, Dimensions} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';

const ReportScreen = ({navigation, route}) => {
  return (
    <SafeAreaView style={{flex: 1, flexDirection: 'row', justifyContent: 'center', padding: 15, margin: 15, }}>
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
      <TouchableOpacity onPress={() => alert('asdasd')} 
        style={{
          width: 150,
          height: 100,
          marginHorizontal: 5,
          marginVertical: 20,
          borderWidth: 1,
          borderColor: "lightgray",
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10
        }}>
        <View>
          <View style={{ padding: 1, marginLeft: 3 }}>
            <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 25, fontWeight: "bold", textTransform: 'uppercase'}}>Usability Report</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('asdasd')} 
        style={{
          width: 150,
          height: 100,
          marginHorizontal: 5,
          marginVertical: 20,
          borderWidth: 1,
          borderColor: "blue",
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10
        }}>
        <View>
          <View style={{ padding: 1, marginLeft: 3 }}>
            <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 25, fontWeight: "bold", textTransform: 'uppercase'}}>Transfer Report</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('asdasd')}
        style={{
          width: 150,
          height: 100,
          marginHorizontal: 5,
          marginVertical: 20,
          borderWidth: 1,
          borderColor: "lightgray",
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10
        }}>
        <View>
          <View style={{ padding: 1, marginLeft: 3 }}>
            <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 25, fontWeight: "bold", textTransform: 'uppercase'}}>Activity Report</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => alert('asdasd')}
        style={{
          width: 150,
          height: 100,
          marginHorizontal: 5,
          marginVertical: 20,
          borderWidth: 1,
          borderColor: "lightgray",
          backgroundColor: 'skyblue',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10
      }}>
          <View style={{ padding: 1}}>
            <Text style={{ color: '#404040', fontSize: 25, fontWeight: "bold", textTransform: 'uppercase'}}>Maintenance Report</Text>
          </View>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
});
 
export default ReportScreen;