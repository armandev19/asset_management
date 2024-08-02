import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, RefreshControl, Image} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar, Chip, FAB, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const AssetScreen = ({navigation, route}) => {

const [loading, setLoading] = useState(false);
const [assets, setAssets] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [userdata, setUserData] = useState('');
const [search, setSearch] = useState('');

const currentUserData = useSelector(selectUserData);
const isFocused = useIsFocused();

const [open, setOpen] = useState(false);
const onStateChange = ({ open }) => setOpen(open);
// const onChangeSearch = () => {
//   setSearchQuery(query);
// }

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
  fetch(global.url+'getAssets.php', {
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
  setTimeout(()=>{
    onChangeSearch(query);
  }, 1000)
};

const getAssets = () => {
  setLoading(true)
  fetch(global.url+'getAssets.php', {
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
useEffect(()=>{
  getAssets();
}, [])

  return (
      <View style={{justifyContent: 'center', backgroundColor: '#ffffff', marginTop: 40}}>
        <Loader loading={loading} />
        <Portal>
          {isFocused && (
            <FAB.Group
              open={open}
              style={{ top: 0, right: 0, bottom: 50}}
              containerStyle={{color: 'red'}}
              icon={open ? 'cog' : 'more'}
              color="white"
              fabStyle={{backgroundColor: '#f5571d'}}
              actions={[
                {
                  icon: 'plus',
                  label: 'Add',
                  labelTextColor: '#fff',
                  labelStyle: { backgroundColor: '#f5571d'},
                  style: { backgroundColor: '#f5571d' },
                  onPress: () => navigation.navigate("AddAssetScreen"),
                },
                {
                  icon: 'truck',
                  label: 'Transfer',
                  labelTextColor: '#fff',
                  labelStyle: { backgroundColor: '#f5571d'},
                  style: { backgroundColor: '#f5571d' },
                  onPress: () => navigation.navigate("AssetTransferScreen"),
                },
                {
                  icon: 'qrcode-scan',
                  label: 'Scan',
                  labelTextColor: '#fff',
                  labelStyle: { backgroundColor: '#f5571d'},
                  style: { backgroundColor: '#f5571d' },
                  onPress: () => navigation.navigate("TrackerScreen"),
                },
              ]}
              
              onStateChange={onStateChange}
            />
          )}
        </Portal>
        <View styles={{flex: 1, padding: 6, alignSelf: 'center', paddingBottom: 50}}>
          <View style={{ padding: 6, borderRadius: 20}}>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
              <Searchbar
                placeholder="Search"
                onChangeText={handleSearchQueryChange}
                value={search}
                style={{ margin: 2, flex: 1, borderRadius: 5, backgroundColor: 'lightgray'}}
              />
            </View>
          </View>
          <ScrollView style={{paddingHorizontal: 5, marginBottom: 65}}>
          {assets?.length == 0 ? (
            <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'center'}}>No results found.</Text>
          ): (
            assets?.map((item, index)=>{
              return (
                <TouchableOpacity style={{
                  marginBottom: 5, 
                  backgroundColor: 'white', 
                  borderColor: 'lightgrey', 
                  borderWidth: 1, 
                  elevation: 2, 
                  borderRadius: 5
                  }} onPress={() => navigation.navigate("AssetDetailsScreen", item.asset_code)}>
                  <View style={{flexDirection: 'row', padding: 2}}>
                    <View>
                      <Image
                        source={require('../../assets/noimage.jpg')}
                        style={{width: 50, height: 50, margin: 2, alignSelf: 'center', borderRadius: 5}}
                      />
                    </View>
                    <View>
                    <View style={styles.item}>
                      <View style={{}}>
                        <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, fontWeight: '500'}}>Name: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, fontWeight: 'bold' }}>{item.asset_name}</Text></Text>
                      </View>
                    </View>
                    <View style={styles.item}>
                      <View style={{}}>
                        <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, fontWeight: '500'}}>Description: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, fontWeight: 'bold' }}>{item.asset_description}</Text></Text>
                      </View>
                    </View>
                    <View style={styles.item}>
                      <View style={{}}>
                        <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, fontWeight: '500'}}>Type: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, fontWeight: 'bold' }}>{item.type }</Text></Text>
                      </View>
                    </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })
          )}
          </ScrollView>
        </View>
      </View>
  )
};

 
export default AssetScreen;

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