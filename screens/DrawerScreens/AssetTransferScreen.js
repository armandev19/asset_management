import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, RefreshControl, KeyboardAvoidingView} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';

import { useFocusEffect } from '@react-navigation/native';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

const AssetTransferScreen = ({navigation, route}) => {

const [loading, setLoading] = useState(false);
const [assets, setAssets] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [userdata, setUserData] = useState('');
const [modalVisible, setModalVisible] = useState(false);
const [selectedReference, setSelectedReference] = useState('');

const currentUserData = useSelector(selectUserData);

const getAssets = () => {
  setLoading(true)
//   fetch('http://192.168.1.6:5000/api/asset-transfer', {
//     method: 'POST',
//     headers: {
//       'Content-Type':
//       'application/x-www-form-urlencoded;charset=UTF-8',
//     },
//   })
//   .then((response) => response.json())
//   .then((responseJson) => {
//     setLoading(false);
//     setAssets(responseJson);
//     console.log(responseJson);
//   })
//   .catch((error) => {
//     alert(error);
//     setLoading(false);
//     console.error(error);
//   });
// }
fetch(global.url+'getAssetsTransfer.php', {
  method: 'POST',
  headers: {
    'Content-Type':
    'application/x-www-form-urlencoded;charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((responseJson) => {
    // alert(responseJson)
    setLoading(false);
    setAssets(responseJson.data);
  })
  .catch((error) => {
    alert(error);
    setLoading(false);
    console.error(error);
  });
}

console.log(assets)

const onRefresh = () => {
  getAssets();
};

const updateTransferStatus = (id) => {
  setSelectedReference(id)
  setModalVisible(true)
}

const updateStatus = () => {
  setLoading(true);
		let dataToSend = { selectedReference: selectedReference};
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url+'updateTransferStatus.php', {
			method: 'POST',
			body: formBody,
			headers: {
				'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8',
			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if(responseJson.status == 'success'){
				alert('Success!');
        setModalVisible(false);
			}else{
				alert('Failed!');
        setModalVisible(false);
			}
		  setLoading(false);
      getAssets();
		})
		.catch((error) => {
      
      console.log(error);
			setLoading(false);
		});
}

function RowItem({ key_id, navigation, ref_no, asset_name, remarks, original_location, from, to, transfer_status }) {
  console.log(key_id)
  return (
    <View key={key_id}>
    <Card style={{ margin: 3, paddingBottom: 5, elevation: 3 }} >
      <TouchableOpacity
      onPress={() => updateTransferStatus(key_id)}
      >
        <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
          <View style={{ flexDirection: 'row', padding: 5, marginLeft: 3 }}>
            <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 15, fontWeight: "bold", textTransform: 'uppercase', width: '35%' }}>{ref_no}</Text>
            <View style={{ flex: 1, alignItems: 'flex-end'}}>
              {transfer_status === 'DELIVERED' ? 
                 <View style={{ padding: 3, backgroundColor: '#2eb82e', flexDirection: 'row', borderRadius: 5}}>
                  <Icon name='check-circle' size={13} color={'#ffffff'} ></Icon>
                  <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> {transfer_status}</Text>
                </View>
                :
                <View style={{ padding: 3, backgroundColor: '#ffcc00', flexDirection: 'row', borderRadius: 5}}>
                  <Icon name='check-circle' size={13} color={'#ffffff'} ></Icon>
                  <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> {transfer_status}</Text>
                </View>
              }
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
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>REMARKS: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{remarks}</Text></Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>FROM: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{from}</Text></Text>
          </View>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>TO: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{to}</Text></Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
    </View>
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
            contentContainerStyle={{paddingBottom: 20, padding: 5}}
            initialNumToRender={10}
            windowSize={5}
            maxToRenderPerBatch={5}
            updateCellsBatchingPeriod={30}
            removeClippedSubviews={false}
            onEndReachedThreshold={0.1}
            renderItem={({ item, i }) =>
              <RowItem
                key_id={item.reference_no}
                navigation={navigation}
                ref_no={item.reference_no}
                asset_name={item.asset_name}
                original_location={item.original}
                remarks={item.remarks}
                from={item.from}
                to={item.to}
                transfer_status={item.transfer_status}
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
        <Modal
          animationType="fade"
          transparent={true}
          centeredView={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <KeyboardAvoidingView enabled style={styles.modalView}>
              <View style={{padding: 10}}>
                <View style={{alignSelf: 'center', marginTop: 10}}>
                  <Text style={{color: 'black', fontSize: 20, textAlign: 'center'}}>Do you want to update transfer status to Delivered?</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <Button icon="check" compact="true" mode="contained" color={"#2eb82e"} style={{marginTop: 10}} onPress={() => updateStatus()}><Text>Yes</Text></Button>
                <Button icon="close" compact="true" mode="contained" color={"#fc4747"} style={{marginTop: 10}} onPress={() => setModalVisible(false)}><Text>Cancel</Text></Button>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </View>
  )
};

 
export default AssetTransferScreen;

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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20,
  },
});