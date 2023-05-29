import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, RefreshControl} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';

import { useFocusEffect } from '@react-navigation/native';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const LocationScreen = ({navigation, route}) => {

const [loading, setLoading] = useState(false);
const [locations, setLocations] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [userdata, setUserData] = useState('');
const currentUserData = useSelector(selectUserData);
const [search, setSearch] = useState('');


const onChangeSearch = () => {
  setLoading(true)
  let dataToSend = { search: search };
  let formBody = [];
  for (let key in dataToSend) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  fetch(global.url+'getLocations.php', {
    method: 'POST',
    body: formBody,
    headers: {
      'Content-Type':
      'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      setLoading(false);
      setLocations(responseJson.data);
    })
    .catch((error) => {
      alert(error);
      setLoading(false);
      console.error(error);
    });
}

const handleSearchQueryChange = (query) => {
  setSearch(query);
  onChangeSearch(query);
};

const getLocations = () => {
  setLoading(true)
  fetch(global.url+'getLocations.php', {
    method: 'POST',
    headers: {
      'Content-Type':
      'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.text())
    .then((responseJson) => {
      alert(responseJson)
      setLoading(false);
      // setLocations(responseJson.data);
    })
    .catch((error) => {
      alert(error);
      setLoading(false);
      console.error(error);
    });
}

const onRefresh = () => {
  getLocations();
};

// useEffect(()=>{
// }, []);
useFocusEffect(
  React.useCallback(() => {
    getLocations();
  }, []),
);
  return (
      <View>
        <Card style={{ margin: 6, padding: 6}}>
            <View style={{flexDirection: 'row', alignItems: 'center' }}>
              <Searchbar
                placeholder="Search"
                onChangeText={handleSearchQueryChange}
                value={search}
                style={{ marginHorizontal: 5, flex: 6}}
              />
              <Button style={{marginHorizontal: 5, marginTop: 1, padding: 5}} labelStyle={{fontWeight: 'bold'}} icon="plus" compact="true" mode="contained" onPress={() => navigation.navigate('AddLocationScreen')}>
              </Button>
            </View>
        </Card>
        <ScrollView styles={{flex: 1}}>
          <View
            style={{
            justifyContent: 'center',
            flex: 1
          }}>
            {locations.map((values, i) => (
              <List.Item
              key={i}
              style={{ backgroundColor: 'white', marginTop: 1}}
              title={values.name}
              description={values.address}
              left={props => <List.Icon {...props} icon="folder"
               />}
              onPress={()=> navigation.navigate('UpdateLocationScreen', values.id)}
              refreshControl={
                <RefreshControl
                  refreshing={false}
                  onRefresh={onRefresh}
                />
              }
            />
            ))}
          </View>
        </ScrollView>
      </View>
  )
};

 
export default LocationScreen;

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