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
const [search, setSearch] = useState('');
const currentUserData = useSelector(selectUserData);

const getAssets = () => {
  setLoading(true)
  let dataToSend = { search: search };
  let formBody = [];

  for (let key in dataToSend) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  fetch(global.url+'getAssetsTransfer.php', {
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
        "bypass-tunnel-reminder": "true",
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

const deleteTransfer = (id) => {
  setLoading(true);
  console.log("id", id)
		let dataToSend = { id: id};
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url+'deleteTransfer.php', {
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

const handleSearchQueryChange = (query) => {
  setSearch(query);
  setTimeout(()=>{
    getAssets();
  }, 1000)
};

const handleLongPress = (id) => {
  Alert.alert(
    "Delete?",
    "Are you sure you want to delete this data?",
    [
      {
        text: "Delete",
        onPress: () => deleteTransfer(id),
        style: "cancel"
      },
      {
        text: "Cancel", 
        onPress: () => {
        }
      }
    ],
    { cancelable: false }
  );
};

useFocusEffect(
  React.useCallback(() => {
    getAssets();
  }, []),
);

  return (
      <View style={{justifyContent: 'center', backgroundColor: '#f2f3f8',}}>
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
              <Button style={{marginHorizontal: 5, marginTop: 1, padding: 5}} labelStyle={{fontWeight: 'bold'}} icon="plus" compact="true" mode="contained" onPress={() => navigation.navigate('AddAssetTransferScreen')}>
              </Button>
            </View>
          </View>
          <ScrollView style={{padding: 5}}>
            {assets && assets?.map((item, index)=>{
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: 'white', 
                    borderColor: 'lightgrey', 
                    borderWidth: 1, 
                    elevation: 2, 
                    borderRadius: 5,
                    marginVertical: 2
                  }}
                onLongPress={()=>handleLongPress(item.ref_no)}
                onPress={
                  item.status !== 'DELIVERED' ?
                  () =>  updateTransferStatus(item.id) : ''}
                >
                  <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 1 }}>
                    <View style={{ flexDirection: 'row', padding: 5, marginLeft: 3 }}>
                      <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 15, fontWeight: "bold", textTransform: 'uppercase', width: '35%' }}>{item.ref_no}</Text>
                      <View style={{ flex: 1, alignItems: 'flex-end'}}>
                        {item.transfer_status === 'DELIVERED' ? 
                          <View style={{ padding: 3, backgroundColor: '#2eb82e', flexDirection: 'row', borderRadius: 5}}>
                            <Icon name='check-circle' size={13} color={'#ffffff'} ></Icon>
                            <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> {item.transfer_status}</Text>
                          </View>
                          :
                          <View style={{ padding: 3, backgroundColor: '#ffcc00', flexDirection: 'row', borderRadius: 5}}>
                            <Icon name='check-circle' size={13} color={'#ffffff'} ></Icon>
                            <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> {item.transfer_status}</Text>
                          </View>
                        }
                      </View>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View style={{flex: 1}}>
                      <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>ASSSET NAME: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.asset_name}</Text></Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View style={{flex: 1}}>
                      <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>REMARKS: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.remarks}</Text></Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View style={{flex: 1}}>
                      <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>FROM: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.from}</Text></Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>TO: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.to}</Text></Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
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
                <Button compact="true" mode="contained" width={'40%'} color={"#2eb82e"} style={{marginTop: 10}} onPress={() => updateStatus()}><Text>Yes</Text></Button>
                <Button compact="true" mode="contained" width={'40%'} color={"#fc4747"} style={{marginTop: 10}} onPress={() => setModalVisible(false)}><Text>Cancel</Text></Button>
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