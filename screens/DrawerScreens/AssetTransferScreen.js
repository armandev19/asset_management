import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, RefreshControl} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';

import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const AssetTransferScreen = ({navigation, route}) => {

const [loading, setLoading] = useState(false);
const [assets, setAssets] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [userdata, setUserData] = useState('');


const currentUserData = useSelector(selectUserData);

const getAssets = () => {
  setLoading(true)
  fetch(global.url+'getAssetsTransfer.php', {
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

function RowItem({ navigation, asset_code, asset_name, asset_description, original_location, id }) {
  return (
    <Card style={{ margin: 5 }}>
      <TouchableOpacity onPress={() => navigation.navigate("AssetDetailsScreen", id)}>
        <View>
          <View style={{ flexDirection: 'row', padding: 5 }}>
            <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 15, fontWeight: "bold", textTransform: 'uppercase', width: '35%' }}>{asset_code}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>ASSSET NAME: </Text>
          <View style={{ }}>
            <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{asset_name}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>DESCRIPTION: </Text>
          <View style={{ }}>
            <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{asset_description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );
}

useEffect(()=>{
  getAssets();
}, []);

  return (
      <View style={{justifyContent: 'center', backgroundColor: '#f2f3f8',}}>
        <View styles={{flex: 1, padding: 6, alignSelf: 'center'}}>
          <Card style={{ margin: 6, padding: 6}}>
            <View style={{flexDirection: 'row', alignItems: 'center' }}>
              <Searchbar
                placeholder="Search"
                // onChangeText={onChangeSearch}
                // value={searchQuery}
                style={{ marginHorizontal: 5, flex: 6}}
              />
              <Button style={{marginHorizontal: 5, marginTop: 1, padding: 5}} labelStyle={{fontWeight: 'bold'}} icon="plus" compact="true" mode="contained" onPress={() => navigation.navigate('AddAssetTransferScreen')}>
              </Button>
            </View>
          </Card>
          <FlatList
            data={assets}
            contentContainerStyle={{paddingBottom: 20}}
            initialNumToRender={10}
            windowSize={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={30}
            removeClippedSubviews={false}
            onEndReachedThreshold={0.1}
            renderItem={({ item }) =>
              <RowItem
                navigation={navigation}
                asset_code={item.asset_code}
                asset_name={item.asset_name}
                original_location={item.original}
                asset_description={item.asset_description}
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

 
export default AssetTransferScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 3,
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