import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, RefreshControl, KeyboardAvoidingView} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar, TextInput} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './Components/loader';

import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';

import { useFocusEffect } from '@react-navigation/native';

const AssetMaintenanceScreen = ({navigation, route}) => {
const params = route.params;
const [loading, setLoading] = useState(false);
const [assets, setAssets] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [userdata, setUserData] = useState('');
const [search, setSearch] = useState('');

const currentUserData = useSelector(selectUserData);
const [modalVisible, setModalVisible] = useState(false);

const [assetId, setAssetId] = useState('');
const [description, setDescription] = useState('');
const [estimatedCost, setEstimatedCost] = useState('');
const [schedule, setSchedule] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [technician, setTechnician] = useState('');

const onChangeSearch = () => {
  setLoading(true)
  let dataToSend = { assetId: assetId };
  let formBody = [];
  for (let key in dataToSend) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  fetch(global.url+'getAssetMaintenance.php', {
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

const getAssetsMaintenance = () => {
  setLoading(true);
  let dataToSend = { asset_id: params };
  let formBody = [];
  for (let key in dataToSend) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  fetch(global.url+'getAssetMaintenance.php', {
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
      setAssets(responseJson.data);
      console.log(assets)
    })
    .catch((error) => {
      alert(error);
      setLoading(false);
      console.error(error);
    });
}

const saveMaintenance = () => {
  let dataToSend = {
    asset_id: params,
    description: description,
    cost : estimatedCost,
    schedule : schedule,
    start_date : startDate,
    end_date : endDate,
    technician : technician,
    created_by : currentUserData.id
  };

  let formBody = [];
  for (let key in dataToSend) {
    let encodedKey = encodeURIComponent(key);
    let encodedValue = encodeURIComponent(dataToSend[key]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  fetch(global.url+'saveMaintenance.php', {
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
    getAssetsMaintenance();
    setModalVisible(false);
    // setAssets(responseJson.data);
  })
  .catch((error) => {
    alert(error);
    setLoading(false);
    console.error(error);
  });
}

const onRefresh = () => {
  getAssetsMaintenance();
};

function RowItem({ key, navigation, description, cost, schedule, status}) {
  return (
    <Card style={{ margin: 3 }}>
      <View style={{marginBottom: 5}}>
        <View>
          <View style={{ flexDirection: 'row', padding: 5, marginLeft: 3 }}>
            <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 15, fontWeight: "bold", textTransform: 'uppercase', width: '35%' }}>{description}</Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>COST: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{cost}</Text></Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>SCHEDULE: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{schedule}</Text></Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>Start: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{schedule}</Text></Text>
          </View>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>End: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{schedule}</Text></Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>Status: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{status}</Text></Text>
          </View>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>Technician: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{status}</Text></Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Button style={{marginHorizontal: 2, marginTop: 1}} labelStyle={{fontWeight: 'bold'}} icon="pencil" compact="true" mode="contained" onPress={()=>setModalVisible(true)}>
          </Button>
          <Button style={{marginHorizontal: 2, marginTop: 1, backgroundColor: '#e62e00'}} labelStyle={{fontWeight: 'bold'}} icon="delete" compact="true" mode="contained" onPress={()=>setModalVisible(true)}>
          </Button>
        </View>
      </View>
    </Card>
  );
}
// 00cc44 green operational
// ffcc00 orange in repair
// e62e00 red disposed

useFocusEffect(
  React.useCallback(() => {
    getAssetsMaintenance();
  }, []),
);
  return (
      <View style={{justifyContent: 'center', backgroundColor: '#f2f3f8',}}>
        <View styles={{flex: 1, padding: 6, alignSelf: 'center'}}>
          <Card style={{ margin: 6, padding: 6, backgroundColor: '#f2f3f8'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'transparent' }}>
              <Searchbar
                placeholder="Search"
                onChangeText={handleSearchQueryChange}
                value={search}
                style={{ marginHorizontal: 5, flex: 6}}
              />
              <Button style={{marginHorizontal: 5, marginTop: 1, padding: 5, backgroundColor: '#00cc44'}} labelStyle={{fontWeight: 'bold'}} icon="plus" compact="true" mode="contained" onPress={()=>setModalVisible(true)}>
              </Button>
            </View>
          </Card>
          <Card style={{ marginHorizontal: 8}}>
            <View style={{justifyContent: 'center', alignItems: "flex-start", padding: 5}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>ASSET: {params}</Text>
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
                description={item.maintenance_description}
                cost={item.estimated_cost}
                schedule={item.schedule}
                status={item.status}
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
        <Modal
          animationType="slide"
          transparent={true}
          centeredView={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
          <KeyboardAvoidingView enabled style={styles.modalView}>
            <View style={{padding: 20}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Icon name='report' size={25} color={'#404040'} ></Icon>
                <Text style={{color: '#404040', fontSize: 20, fontWeight: 'bold'}}>ADD ASSET MAINTENANCE</Text>
              </View>
              <TextInput
                style={{width: '100%'}}
								mode="outlined"
                label="Description"
								activeOutlineColor='#348ceb'
                value={description}
                onChangeText={description => setDescription(description)}
							/>
              <TextInput
                style={{width: '100%'}}
								mode="outlined"
                label="Cost"
								activeOutlineColor='#348ceb'
                keyboardType='numeric'
                value={estimatedCost}
                onChangeText={estimatedCost => setEstimatedCost(estimatedCost)}
							/>
              <TextInput
                style={{width: '100%'}}
								mode="outlined"
                label="Schedule"
								activeOutlineColor='#348ceb'
                value={schedule}
                onChangeText={schedule => setSchedule(schedule)}
							/>
              <TextInput
                style={{width: '100%'}}
								mode="outlined"
                label="Start Date"
								activeOutlineColor='#348ceb'
							/>
              <TextInput
                style={{width: '100%'}}
								mode="outlined"
                label="End Date"
								activeOutlineColor='#348ceb'
							/>
              <TextInput
                style={{width: '100%'}}
								mode="outlined"
                label="Technician"
								activeOutlineColor='#348ceb'
                value={technician}
                onChangeText={technician => setTechnician(technician)}
							/>
              {/* <View style={{}}>
                <Button style={{marginTop: 10}} icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                  Image
                </Button>
                <View style={{marginTop: 5}}>

                </View>
              </View> */}
							<View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
								<Button style={{margin: 5}} icon="check" color='green' mode="contained" onPress={() => saveMaintenance()}>
									SAVE
								</Button>
                <Button style={{margin: 5}} icon="close" color='red' mode="contained" onPress={()=>setModalVisible(!modalVisible)}>
									Cancel
								</Button>
							</View>
            </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </View>
  )
};

 
export default AssetMaintenanceScreen;

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
    // alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});