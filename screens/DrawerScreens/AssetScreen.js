import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, RefreshControl, Image, KeyboardAvoidingView } from 'react-native';
import { Card, Title, Paragraph, Divider, List, IconButton, Searchbar, Chip, FAB, Portal } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon, Button, Overlay, ListItem } from '@rneui/themed';

const AssetScreen = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [userdata, setUserData] = useState('');
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const currentUserData = useSelector(selectUserData);
  const isFocused = useIsFocused();

  const [open, setOpen] = useState(false);
  const onStateChange = ({ open }) => setOpen(open);

  const onModalClick = () => {
    setModalVisible(true);
  }

  const onChangeSearch = (query) => {
    setLoading(true)
    let dataToSend = { search: query };
    let formBody = [];

    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');
    fetch(global.url + 'getAssets.php', {
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
        setLoading(false);
        setAssets(responseJson.data);
        console.log(responseJson);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  const handleSearchQueryChange = (query) => {
    setSearch(query);
    setTimeout(() => {
      onChangeSearch(query);
    }, 1000)
  };

  const getAssets = (sort) => {
    // setLoading(true)
    let dataToSend = { sort: sort };
    let formBody = [];

    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');
    fetch(global.url + 'getAssets.php', {
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
        console.log('rawrasdasd',responseJson)
        setLoading(false);
        setAssets(responseJson.data);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  const onRefresh = () => {
    getAssets();
  };
  // 00cc44 green operational
  // ffcc00 orange in repair
  // e62e00 red disposed
  // useEffect(()=>{
  //   getAssets();
  // }, [])

  const sortDropdown = [
		{ value: "Type", label: "Type"},
		{ value: "Location", label: "Location" },
	]

  
	const onSelectSort = (item) => {
    getAssets(item.value);
		setModalVisible(!modalVisible);
	}

  useFocusEffect(
    React.useCallback(() => {
      getAssets();
    }, []),
  );

  return (
    <View style={{ height: "100%", backgroundColor: '#ffffff' }}>
      <Loader loading={loading} />
      <Portal>
        {isFocused && (
          <FAB.Group
            open={open}
            style={{ top: 0, right: 0, bottom: 50 }}
            containerStyle={{ color: 'red' }}
            icon={open ? 'cog' : 'more'}
            color="white"
            fabStyle={{ backgroundColor: '#fc8953' }}
            actions={[
              {
                icon: 'plus',
                label: 'Add',
                labelTextColor: '#000',
                labelStyle: { backgroundColor: '#fff' },
                style: { backgroundColor: '#fff' },
                onPress: () => navigation.navigate("AddAssetScreen"),
              },
              {
                icon: 'map-marker',
                label: 'Locations',
                labelTextColor: '#000',
                labelStyle: { backgroundColor: '#fff' },
                style: { backgroundColor: '#fff' },
                onPress: () => navigation.navigate("LocationScreen"),
              },
              {
                icon: 'truck',
                label: 'Transfer',
                labelTextColor: '#000',
                labelStyle: { backgroundColor: '#fff' },
                style: { backgroundColor: '#fff' },
                onPress: () => navigation.navigate("AssetTransferScreen"),
              },
              {
                icon: 'qrcode-scan',
                label: 'Scan',
                labelTextColor: '#000',
                labelStyle: { backgroundColor: '#fff' },
                style: { backgroundColor: '#fff' },
                onPress: () => navigation.navigate("TrackerScreen"),
              },
            ]}

            onStateChange={onStateChange}
          />
        )}
      </Portal>
      <View styles={{ flex: 1, padding: 6, alignSelf: 'center', paddingBottom: 50 }}>
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
            <Button buttonStyle={{ marginVertical: 5, marginLeft: 5, borderRadius: 5 }} onPress={() => onModalClick()}>
              <Icon name="sort" color="white" />
            </Button>
          </View>
        </View>
        <ScrollView style={{ paddingHorizontal: 5, marginBottom: 65 }}>
          {assets?.length == 0 ? (
            <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>No results found.</Text>
          ) : (
            assets?.map((item, index) => {
              const imageUri = item.image?.image_location; // Replace with your actual URI or set it to null for local image
              const localImage = require('../../assets/noimage.jpg');
              const statusColor = item.status === 'Active' ? 'green' : item.status === 'Idle' ? 'blue' : item.status === 'Under Repair' ? 'orange' : 'red';
              return (
                <TouchableOpacity style={{
                  marginBottom: 5,
                  backgroundColor: 'white',
                  borderColor: 'lightgrey',
                  borderWidth: 1,
                  elevation: 2,
                  borderRadius: 5
                }} onPress={() => navigation.navigate("AssetDetailsScreen", item.asset_code)}>
                  <View style={{ flexDirection: 'row', padding: 2, minHeight: 90 }}>
                    <View>
                      <Image
                        source={imageUri ? { uri: global.url + imageUri } : localImage}
                        style={{ width: 80, height: 80, margin: 2, alignSelf: 'center', borderRadius: 5 }}
                      />
                    </View>
                    <View>
                      <View style={styles.item}>
                        <View style={{}}>
                          <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 14, fontWeight: '500' }}>Name: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 14, fontWeight: 'bold' }}>{item.asset_name}</Text></Text>
                        </View>
                      </View>
                      <View style={styles.item}>
                        <View style={{}}>
                          <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 14, fontWeight: '500' }}>Type: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 14, fontWeight: 'bold' }}>{item.asset_type}</Text></Text>
                        </View>
                      </View>
                      <View style={styles.item}>
                        <View style={{}}>
                          <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 14, fontWeight: '500' }}>Status: <Text adjustsFontSizeToFit style={{ color: statusColor, fontSize: 14, fontWeight: 'bold' }}>{item.status}</Text></Text>
                        </View>
                      </View>
                      <View style={styles.item}>
                        <View style={{}}>
                          <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 14, fontWeight: '500' }}>Current Value: <Text adjustsFontSizeToFit style={{ color: 'green', fontSize: 14, fontWeight: 'bold' }}>₱ {item.current_price}</Text></Text>
                        </View>
                      </View>
                      <View style={styles.item}>
                        <View style={{}}>
                          <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 14, fontWeight: '500' }}>Current Location: <Text adjustsFontSizeToFit style={{ fontSize: 14, fontWeight: 'bold' }}>{item.loc_name ? item.loc_name : 'N/A'}</Text></Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          )}
          <Overlay isVisible={modalVisible} onBackdropPress={() => setModalVisible(!modalVisible)} overlayStyle={{ height: '50%', width: '80%' }}>
            <Text style={{color: 'black'}}>Sort By</Text>
            <ScrollView>
              {sortDropdown?.map((item, index) => {
                return (
                  <ListItem key={index} bottomDivider style={{ height: 'auto' }} onPress={() => onSelectSort(item)}>
                    <Icon name="location-pin" type="simple-line-icon" size={15} />
                    <ListItem.Content >
                      <ListItem.Title style={{ fontSize: 14 }}>{item.label || "No name"}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                )
              })}
            </ScrollView>
          </Overlay>
        </ScrollView>
      </View>
    </View>
  )
};


export default AssetScreen;

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    height: 450,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  }
});