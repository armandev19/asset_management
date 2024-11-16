import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, RefreshControl} from 'react-native';
import {Card, Title, Paragraph, Divider, List, IconButton, Searchbar} from 'react-native-paper';

import { Icon, Button } from '@rneui/themed';
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

const getLocations = () => {
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
    headers: { "bypass-tunnel-reminder": "true",
      'Content-Type':
      'application/x-www-form-urlencoded;charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      // alert(responseJson)
      setLoading(false);
      setLocations(responseJson.data);
      console.log(locations)
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

const handleSearchQueryChange = (query) => {
  setSearch(query);
  setTimeout(()=>{
    getLocations();
  }, 1000)
};


function RowItem({ navigation, name, address, id }) {
  return (
    <Card style={{ margin: 3, paddingBottom: 5, elevation: 3 }}>
      <TouchableOpacity 
      onPress={() => navigation.navigate("UpdateLocationScreen", id)}
      >
        <View>
          <View style={{ flexDirection: 'row', padding: 5, marginLeft: 3 }}>
            <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 15, fontWeight: "bold"}}>{name}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12}}>Address: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, fontWeight: 'bold' }}>{address}</Text></Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

console.log("search", search)
// useEffect(()=>{
// }, []);
useFocusEffect(
  React.useCallback(() => {
    getLocations();
  }, []),
);
  return (
    <View style={{justifyContent: 'center', backgroundColor: '#f2f3f8',}}>
      <Loader loading={loading} />
      <View styles={{flex: 1, padding: 6, alignSelf: 'center'}}>
        <View style={{ padding: 6, borderRadius: 20}}>
          <View style={{flexDirection: 'row'}}>
            <Searchbar
              placeholder="Search"
              onChangeText={handleSearchQueryChange}
              value={search}
              style={{ margin: 2, flex: 1, borderRadius: 5, backgroundColor: 'white'}}
              placeholderTextColor={"black"}
              iconColor='black'
            />
            <Button buttonStyle={{ marginVertical: 5, marginLeft: 5, borderRadius: 5}} onPress={() => navigation.navigate('AddLocationScreen')}>
              <Icon name="add" color="white" />
            </Button>
          </View>
        </View>
        <FlatList
          data={locations}
          contentContainerStyle={{paddingBottom: 20, padding: 5}}
          initialNumToRender={10}
          windowSize={5}
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={30}
          removeClippedSubviews={false}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) =>
            <RowItem
              navigation={navigation}
              name={item.name}
              address={item.address}
              id={item.id}
            />
          }
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </View>
  )
};

 
export default LocationScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 1,
    marginLeft: 8,
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