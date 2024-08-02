import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, RefreshControl, Image} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const NotificationiScreen = ({navigation, route}) => {

const [loading, setLoading] = useState(false);
const [notifications, setNotifications] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [userdata, setUserData] = useState('');
const [search, setSearch] = useState('');

const currentUserData = useSelector(selectUserData);

const getNotifications = () => {
  setLoading(true)
  fetch(global.url+'getNotifications.php', {
    method: 'POST',
    // body: formBody,
    headers: {
      'Content-Type':
      'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLoading(false);
      setNotifications(responseJson.data);
    })
    .catch((error) => {
      alert(error);
      setLoading(false);
      console.error(error);
    });
  }

const onRefresh = () => {
  getNotifications();
};
// 00cc44 green operational
// ffcc00 orange in repair
// e62e00 red disposed
useEffect(()=>{
  getNotifications();
}, [])

  return (
        <View styles={{flex: 1, padding: 6, alignSelf: 'center'}}>
          <ScrollView style={{padding: 5}}>
            
          <Loader loading={loading} />
          {notifications?.length == 0 ? (
            <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'center'}}>No new notification.</Text>
          ): (
            notifications?.map((item, index)=>{
              return (
                <TouchableOpacity style={{
                  padding: 10,
                  marginBottom: 5, 
                  backgroundColor: 'white', 
                  borderColor: 'lightgrey', 
                  borderWidth: 1, 
                  borderRadius: 5,
                  elevation: 2
                  }} onPress={() => navigation.navigate("ViewNotifScreen", item.id)}>
                    <View style={{marginLeft: 2}}>
                        {/* title */}
                        <View style={{}}>
                            <Text style={{color: '#404040', fontSize: 15, fontWeight: 'bold'}}>{item.title}</Text>
                        </View>
                        {/* description */}
                        <View style={{}}>
                            <Text style={{color: '#404040', fontSize: 13}}>{item.body}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
              )
            })
          )}
          </ScrollView>
        </View>
  )
};

 
export default NotificationiScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 1,
    marginLeft: 8,
  },
  textTitle: {
    width: '30%',
    color: '#3d3d3d',
    fontWeight: "bold",
    fontSize: 12,
    textTransform: 'uppercase'
  },
  textChild: {
    width: '70%',
    color: '#404040',
    flex: 1,
    fontSize: 12,
    marginLeft: 6,
    textTransform: 'uppercase'
  },
  assetContainer: {
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    color: 'white',
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 5,
  },
  TouchableOpacityStyle: {
    //Here is the trick
    backgroundColor: "red",
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  searchBox: {
    marginTop: 8,
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  }
});