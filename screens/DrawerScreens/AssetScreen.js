import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Button, Modal, ToastAndroid, Alert, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';

import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';

const AssetScreen = ({navigation, route}) => {

const [loading, setLoading] = useState(false);
const [requests, setRequests] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [userdata, setUserData] = useState('');


const currentUserData = useSelector(selectUserData);

  const getAllApprovedRequest = () => {
    setLoading(true)
    let postDataApproved = {userAccess: userdata.access, userID: currentUserData.id};
    let formBody = [];
    for (let key in postDataApproved) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(postDataApproved[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.url+'fetchApprovedRequest.php', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setRequests(responseJson.data);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  useEffect(()=>{
    getAllApprovedRequest();
  }, [])
const renderItem = ({ item }) => {
      const backgroundColor = item.id === selectedId ? "#f2f2f2" : "white";
      const color = item.id === selectedId ? 'black' : 'black';
      
      return (
            <Item
            item={item}
            onPress={() => setSelectedId(item.id)}
            backgroundColor={{ backgroundColor }}
            textColor={{ color }} 
            />
      );
};

return (
      <SafeAreaView style={{flex: 1}}>
      <Loader loading={loading} />
            <FlatList
                  data={requests}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  extraData={selectedId}
                  style={{marginBottom: 15}}
            />
      </SafeAreaView>
)
};

 
export default AssetScreen;