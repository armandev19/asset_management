import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Divider, List, IconButton, Searchbar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
import { useFocusEffect } from '@react-navigation/native';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import { Input, Icon, BottomSheet, ListItem, Dialog, Button } from '@rneui/themed';

const UsersScreen = ({ navigation, route }) => {

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
    fetch(global.url + 'getUsers.php', {
      method: 'POST',
      body: formBody,
      headers: {
        "bypass-tunnel-reminder": "true",
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
    setTimeout(() => {
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
    <View style={{ justifyContent: 'center', backgroundColor: '#f2f3f8' }}>
      <Loader loading={loading} />
      <View style={{ padding: 6, borderRadius: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Searchbar
            placeholder="Search"
            onChangeText={handleSearchQueryChange}
            value={search}
            style={{ margin: 2, flex: 1, borderRadius: 5, backgroundColor: 'white' }}
            placeholderTextColor={"black"}
            iconColor='black'
          />
          <Button buttonStyle={{ marginVertical: 5, marginLeft: 5, borderRadius: 5 }} onPress={() => navigation.navigate('AddUsersScreen')}>
            <Icon name="add" color="white" />
          </Button>
        </View>
      </View>
      <ScrollView style={{ padding: 5, paddingBottom: 40, marginBottom: 50 }}>
        {users && users?.map((item, index) => {
          return (
            <TouchableOpacity style={{
              marginBottom: 5,
              backgroundColor: 'white',
              borderColor: 'lightgrey',
              borderWidth: 1,
              elevation: 2,
              borderRadius: 5,
              padding: 5
            }} onPress={() => navigation.navigate("UserDetailsScreen", item.id)}>
              <View>
                <View style={{ flexDirection: 'row', padding: 2 }}>
                  <View style={{ flex: 1 }}>
                    <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 15, fontWeight: "bold", textTransform: 'uppercase' }}>{item.firstname + " " + item.lastname}</Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    {item.status == 'Active' ? (
                      <Text adjustsFontSizeToFit style={{ color: 'green', fontSize: 12, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2 }}>
                        <Icon type="simple-line-icon" name="user-following" size={16} color="green"></Icon> {item.status}</Text>
                    ) : (
                      <Text adjustsFontSizeToFit style={{ color: 'red', fontSize: 12, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2 }}>
                        <Icon type="simple-line-icon" name="user-unfollow" size={16} color="red"></Icon> {item.status}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', }}>ACCESS: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.access_level}</Text></Text>
                </View>
              </View>
              <View style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', }}>ADDRES: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.address}</Text></Text>
                </View>
              </View>
            </TouchableOpacity>
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  }
});