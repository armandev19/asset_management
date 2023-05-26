import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Button, Modal, ToastAndroid, Alert, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';

import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const AssetScreen = ({navigation, route}) => {

const [loading, setLoading] = useState(false);
const [assets, setAssets] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [userdata, setUserData] = useState('');


const currentUserData = useSelector(selectUserData);

const getAssets = () => {
  setLoading(true)
  fetch(global.url+'getAssets.php', {
    method: 'POST',
    headers: {
      'Content-Type':
      'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLoading(false);
      setAssets(responseJson.data);
    })
    .catch((error) => {
      alert(error);
      setLoading(false);
      console.error(error);
    });
}

useEffect(()=>{
  getAssets();
}, []);

  return (
        <ScrollView styles={{flex: 1}}>
          <View
            style={{
            justifyContent: 'center',
            flex: 1
          }}>
            {assets.map((values, i) => (
              <View>
              <View style={{
                width: '100%',
                backgroundColor: 'white',
                borderColor: '#717275cf',
                borderWidth: 1,
                padding: 5,
                marginTop: 1,
              }} key={i}>
                <Text style={{color: 'black', fontSize: 20}}>{values.asset_name}</Text>
                <Text style={{color: 'black', fontSize: 20}}>{values.asset_description}</Text>
                <Text style={{color: 'black', fontSize: 20}}>{values.current_location}</Text>
              </View>
              <View>
                <Button title='View' onPress={() => navigation.navigate("AssetDetailsScreen", values.id)}></Button>
              </View>
              </View>
            ))}
          </View>
          
          <TouchableOpacity style={styles.TouchableOpacityStyle}>
              <Text>asdasd</Text>
            </TouchableOpacity>
        </ScrollView>
  )
};

 
export default AssetScreen;

const styles = StyleSheet.create({
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
});