import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';
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
      <View>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <Searchbar
            placeholder="Search"
            // onChangeText={onChangeSearch}
            // value={searchQuery}
            style={{marginTop: 5, marginHorizontal: 5, flex: 6}}
          />
          <Button style={{marginHorizontal: 3, marginTop: 4, padding: 5}} labelStyle={{fontWeight: 'bold'}} icon="plus" compact="true" mode="contained" onPress={() => navigation.navigate('AddAssetScreen')}>
            
          </Button>
        </View>
        <ScrollView styles={{flex: 1}}>
          <View
            style={{
            justifyContent: 'center',
            flex: 1
          }}>
            {assets.map((values, i) => (
              <List.Item
              key={i}
              style={{ backgroundColor: 'white', marginTop: 1}}
              title={values.asset_code}
              description={values.asset_name}
              left={props => <List.Icon {...props} icon="folder"
               />}
              onPress={()=> navigation.navigate('AssetDetailsScreen', values.id)}
            />
            ))}
          </View>
        </ScrollView>
      </View>
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