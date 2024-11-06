import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, RefreshControl, KeyboardAvoidingView} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar, TextInput} from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './Components/loader';

import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';

import DateTimePicker from '@react-native-community/datetimepicker';
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
const [modalEditVisible, setModalEditVisible] = useState(false);
const [assetId, setAssetId] = useState('');
const [description, setDescription] = useState('');
const [estimatedCost, setEstimatedCost] = useState('');
const [schedule, setSchedule] = useState('');
const [startDate, setStartDate] = useState('');
const [endDate, setEndDate] = useState('');
const [technician, setTechnician] = useState('');


const [schedDate, setSchedDate] = useState(new Date(Date.now()));
const [dateStart, setDateStart] = useState(new Date(Date.now()));
const [dateEnd, setDateEnd] = useState(new Date(Date.now()));

const [isPickerShow, setIsPickerShow] = useState(false);
const [isPickerShowStart, setIsPickerShowStart] = useState(false);
const [isPickerShowEnd, setIsPickerShowEnd] = useState(false);
const showPicker = () => {
  setIsPickerShow(true);
};

const showPickerStart = () => {
  setIsPickerShowStart(true);
};
const showPickerEnd = () => {
  setIsPickerShowEnd(true);
};
const onChangeSchedDate = (event, value) => {
  setIsPickerShow(false);
  setDate(value);
};
const onChangeSchedStartDate = (event, value) => {
  setIsPickerShowStart(false);
  setDateStart(value);
};
const onChangeSchedEndDate = (event, value) => {
  setIsPickerShowEnd(false);
  setDateEnd(value);
};

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
    headers: { "bypass-tunnel-reminder": "true",
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
  let dataToSend = { asset_id: params.id };
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
    headers: { "bypass-tunnel-reminder": "true",
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
    asset_id: params.id,
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
    headers: { "bypass-tunnel-reminder": "true",
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

const updateMaintenance = (description, cost, schedule, start_date, end_date, status, technician) => {
  setDescription(description);
  setEstimatedCost(cost);
  setSchedule(schedule);
  setStartDate(start_date);
  setEndDate(end_date);
  setTechnician(technician)
  setModalEditVisible(true);
}

const onRefresh = () => {
  getAssetsMaintenance();
};

const LeftActions = () => {
  return (
    <View style={styles.leftAction}>
      <Text style={styles.actionText}>Left Action</Text>
    </View>
  );
};

const RightActions = () => {
  return (
    <View style={styles.rightAction}>
      <Text style={styles.actionText}>Right Action</Text>
    </View>
  );
};

function RowItem({ key, navigation, description, cost, schedule, status, start_date, end_date, technician}) {
  return (
    <Swipeable
        renderLeftActions={LeftActions}
        renderRightActions={RightActions}
      >
      <View style={{marginBottom: 5, borderWidth: 1, borderColor: 'lightgrey', elevation: 2, borderRadius: 5, backgroundColor: 'white', }}>
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
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>Start: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{start_date}</Text></Text>
          </View>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>End: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{end_date}</Text></Text>
          </View>
        </View>
        <View style={styles.item}>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>Status: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{status}</Text></Text>
          </View>
          <View style={{flex: 1}}>
            <Text adjustsFontSizeToFit style={{color: '#404040', fontSize: 12, textTransform: 'uppercase',}}>Technician: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{technician}</Text></Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 10}}>
          <Button style={{marginHorizontal: 2, marginTop: 1}} labelStyle={{fontWeight: 'bold'}} icon="pencil" compact="true" mode="contained" onPress={()=>updateMaintenance(description, cost, schedule, start_date, end_date, status, technician)}>
          </Button>
          <Button style={{marginHorizontal: 2, marginTop: 1, backgroundColor: '#e62e00'}} labelStyle={{fontWeight: 'bold'}} icon="delete" compact="true" mode="contained" onPress={()=>setModalVisible(true)}>
          </Button>
        </View>
      </View>
    </Swipeable>
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
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
              <Searchbar
                placeholder="Search"
                placeholderTextColor={"white"}
                onChangeText={handleSearchQueryChange}
                value={search}
                style={{ marginHorizontal: 5, flex: 6, backgroundColor: 'lightgrey'}}
              />
              <Button style={{marginHorizontal: 5, marginTop: 1, padding: 5, backgroundColor: '#00cc44'}} labelStyle={{fontWeight: 'bold'}} icon="plus" compact="true" mode="contained" onPress={()=>setModalVisible(true)}>
              </Button>
            </View>
            <View style={{justifyContent: 'center', alignItems: "flex-start", padding: 5}}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>Asset: {params.asset_name}</Text>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>Code: {params.asset_code}</Text>
            </View>
          {assets.length == 0 ? (
            <Text style={{color: 'black', fontSize: 20, textAlign: 'center', marginTop: 5}}>NO DATA FOUND.</Text>
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
                start={item.start_date}
                end={item.end_date}
                technician={item.technician}
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
        {isPickerShow && (
          <DateTimePicker
            value={schedDate}
            mode={'date'}
            onChange={onChangeSchedDate}
            style={styles.datePicker}
            format='MM DD YYYY'
          />
        )}
        {isPickerShowStart && (
          <DateTimePicker
            value={dateStart}
            mode={'date'}
            onChange={onChangeSchedStartDate}
            style={styles.datePicker}
            format='MM DD YYYY'
          />
        )}
        {isPickerShowEnd && (
          <DateTimePicker
            value={dateEnd}
            mode={'date'}
            onChange={onChangeSchedEndDate}
            style={styles.datePicker}
            format='MM DD YYYY'
          />
        )}
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
                right={<TextInput.Icon name="calendar" onPress={showPicker} />}
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

        <Modal
          animationType="slide"
          transparent={true}
          centeredView={true}
          visible={modalEditVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalEditVisible);
          }}>
          <View style={styles.centeredView}>
          <KeyboardAvoidingView enabled style={styles.modalView}>
            <View style={{padding: 20}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Icon name='report' size={25} color={'#404040'} ></Icon>
                <Text style={{color: '#404040', fontSize: 20, fontWeight: 'bold'}}>EDIT ASSET MAINTENANCE</Text>
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
                right={<TextInput.Icon name="calendar" onPress={showPicker} />}
							/>
              <TextInput
                style={{width: '100%'}}
								mode="outlined"
                label="End Date"
								activeOutlineColor='#348ceb'
                right={<TextInput.Icon name="calendar" onPress={showPicker} />}
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
								<Button style={{margin: 5}} icon="check" color='green' mode="contained" onPress={() => updateMaintenance()}>
									SAVE
								</Button>
                <Button style={{margin: 5}} icon="close" color='red' mode="contained" onPress={()=>setModalEditVisible(!modalEditVisible)}>
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