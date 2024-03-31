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

const UsersScreen = ({navigation, route}) => {

const [loading, setLoading] = useState(false);
const [users, setUsers] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [userdata, setUserData] = useState('');
const [search, setSearch] = useState('');

const currentUserData = useSelector(selectUserData);

const getUsers = () => {
  setLoading(true)
  let dataToSend = { search: search };
  let formBody = [];

  for (let key in dataToSend) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  formBody = formBody.join('&');
  fetch(global.url+'getUsers.php', {
    method: 'POST',
    body: formBody,
    headers: {
      'Content-Type':
      'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      // alert(responseJson)
      setLoading(false);
      setUsers(responseJson.data);
    })
    .catch((error) => {
      alert(error);
      setLoading(false);
      console.error(error);
    });
}

const onRefresh = () => {
  getUsers();
};

const handleSearchQueryChange = (query) => {
  setSearch(query);
  setTimeout(()=>{
    getUsers();
  }, 1000)
  // onChangeSearch(query);
};

useFocusEffect(
  React.useCallback(() => {
    getUsers();
  }, []),
);
  return (
    <View style={{justifyContent: 'center', backgroundColor: '#f2f3f8'}}>
      <Loader loading={loading} />
      <View styles={{flex: 1, padding: 6, alignSelf: 'center'}}>
        <Card style={{ margin: 6, padding: 6}}>
          <View style={{flexDirection: 'row', alignItems: 'center' }}>
            <Searchbar
              placeholder="Search"
              onChangeText={handleSearchQueryChange}
              value={search}
              style={{ marginHorizontal: 5, flex: 6}}
            />
            <Button onPress={()=>navigation.navigate('AddUsersScreen')} style={{marginHorizontal: 5, marginTop: 1, padding: 5}} labelStyle={{fontWeight: 'bold'}} icon="plus" compact="true" mode="contained"/>
          </View>
        </Card>
      </View>
        <ScrollView style={{padding: 5, paddingBottom: 40, marginBottom: 50}}>
        {users && users?.map((item, index)=>{
          return (
            <Card  key={index} style={{ margin: 3, elevation: 1, padding: 5, borderWidth: 1, borderColor: "lightgray" }}>
              <TouchableOpacity onPress={() => navigation.navigate("UserDetailsScreen", item.id)}>
                <View>
                  <View style={{ flexDirection: 'row', padding: 2 }}>
                    <View style={{ flex: 1 }}>
                      <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 15, fontWeight: "bold", textTransform: 'uppercase'}}>{item.firstname+" "+item.lastname}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                    {item.status == 'Active' ? (
                      <Text adjustsFontSizeToFit style={{ color: 'green', fontSize: 12, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}>{item.status}</Text>
                    ) : (
                      <Text adjustsFontSizeToFit style={{ color: 'red', fontSize: 12, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}>{item.status}</Text>
                    )}
                    </View>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={{flex: 1}}>
                    <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>ACCESS: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.access_level}</Text></Text>
                  </View>
                </View>
                <View style={styles.item}>
                  <View style={{flex: 1}}>
                    <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>ADDRES: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.address}</Text></Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Card>
          )
        })}
        </ScrollView>
    </View>
  )
};

 
export default UsersScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 1,
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