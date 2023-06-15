import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, RefreshControl} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const AssetScreen = ({navigation, route}) => {

const [loading, setLoading] = useState(false);
const [assets, setAssets] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [userdata, setUserData] = useState('');
const [search, setSearch] = useState('');

const currentUserData = useSelector(selectUserData);

// const onChangeSearch = () => {
//   setSearchQuery(query);
// }

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

const onRefresh = () => {
  getAssets();
};
// 00cc44 green operational
// ffcc00 orange in repair
// e62e00 red disposed
function RowItem({ key, navigation, asset_code, asset_name, asset_description, current_location, original_location, item_id }) {
  return (
    <Card style={{ margin: 3 }}>
      <TouchableOpacity key={key} style={{marginBottom: 5}} onPress={() => navigation.navigate("AssetDetailsScreen", item_id)}>
        <View>
          <View style={{ flexDirection: 'row', padding: 5, margin: 3, borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
            <View style={{flex: 1}}>
              <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 15, fontWeight: "bold", textTransform: 'uppercase' }}>{asset_code}</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end'}}>
              <View style={{ padding: 3, backgroundColor: '#2eb82e', flexDirection: 'row', borderRadius: 5}}>
                <Icon name='check-circle' size={13} color={'#ffffff'} ></Icon>
                <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> OPERATIONAL</Text>
              </View>
              {/* <View style={{ padding: 3, backgroundColor: '#ff9900', flexDirection: 'row', borderRadius: 5}}>
                <Icon name='report-problem' size={13} color={'#ffffff'} ></Icon>
                <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> IN REPAIR</Text>
              </View>
              <View style={{ padding: 3, backgroundColor: '#e62e00', flexDirection: 'row', borderRadius: 5}}>
                <Icon name='delete' size={13} color={'#ffffff'} ></Icon>
                <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> DISPOSED</Text>
              </View> */}
            {/* {status == 'Active' ? ( */}
             {/* ) : ( */}
             {/* <Text adjustsFontSizeToFit style={{ color: 'red', fontSize: 12, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}>{asset_code}</Text> */}
             {/* )} */}
            </View>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>ASSSET NAME: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{asset_name}</Text></Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>DESCRIPTION: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{asset_description}</Text></Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>LOCATION: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{current_location == null ?(original_location):(current_location)}</Text></Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

useFocusEffect(
  React.useCallback(() => {
    getAssets();
  }, []),
);
  return (
      <View style={{justifyContent: 'center', backgroundColor: '#f2f3f8',}}>
        <View styles={{flex: 1, padding: 6, alignSelf: 'center'}}>
          <Card style={{ margin: 6, padding: 6, backgroundColor: '#f2f3f8', borderWidth: 0}}>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
              <Searchbar
                placeholder="Search"
                onChangeText={handleSearchQueryChange}
                value={search}
                style={{ marginHorizontal: 5, flex: 6}}
              />
              <Button style={{marginHorizontal: 5, marginTop: 1, padding: 5, backgroundColor: '#2eb82e'}} labelStyle={{fontWeight: 'bold'}} icon="plus-circle" compact="true" mode="contained" onPress={() => navigation.navigate('AddAssetScreen')}>
              </Button>
            </View>
          </Card>
          {assets.length == 0 ? (
            <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'center'}}>No results found.</Text>
          ): (
          <FlatList
            data={assets}
            contentContainerStyle={{paddingBottom: 20, padding: 5}}
            initialNumToRender={10}
            windowSize={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={30}
            removeClippedSubviews={false}
            onEndReachedThreshold={0.1}
            renderItem={({ item, i }) =>
              <RowItem
                key={i}
                navigation={navigation}
                asset_code={item.asset_code}
                asset_name={item.asset_name}
                asset_description={item.asset_description}
                current_location={item.loc_name ? item.loc_name : "N/A"}
                original_location={item.original_location}
                item_id={item.item_id}
              />
            }
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={onRefresh}
              />
            }
          />
          )}
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