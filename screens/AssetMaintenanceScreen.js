import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, RefreshControl, KeyboardAvoidingView } from 'react-native';
import { Divider, Searchbar, TextInput } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';

import { Input, Icon, Button, Overlay, ListItem } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './Components/loader';

import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';

import DateTimePicker from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';



const AssetMaintenanceScreen = ({ navigation, route }) => {
  const params = route.params;
  console.log("params", params)
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
  const [technician, setTechnician] = useState('');
  const [maintenanceStatus, setMaintenanceStatus] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  const [schedDate, setSchedDate] = useState(new Date(Date.now()));


  const [maintenance_id, setMaintenanceId] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editEstimatedCost, setEditEstimatedCost] = useState('');
  const [editTechnician, setEditTechnician] = useState('');
  const [editMaintenanceStatus, setEditMaintenanceStatus] = useState('');
  const [editFormattedDate, setEditFormattedDate] = useState('');
  const [editSchedDate, setEditSchedDate] = useState(new Date(Date.now()));

  const [isPickerShow, setIsPickerShow] = useState(false);
  const [isPickerEditShow, setIsPickerEditShow] = useState(false);
  const [isPickerStatusShow, showPickerStatus] = useState(false);

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
      text2: ''
    });
  }

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const showEditPicker = () => {
    setIsPickerEditShow(true);
  };

  const onChangeSchedDate = (event, value) => {
    setIsPickerShow(false);
    if (value) {
      setSchedDate(value);
      const formatted = value.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
      setFormattedDate(formatted);
    }
  };

  const onChangeEditSchedDate = (event, value) => {
    setIsPickerEditShow(false);
    if (value) {
      setEditSchedDate(value);
      const formatted = value.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
      });
      setEditFormattedDate(formatted);
    }
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
    fetch(global.url + 'getAssetMaintenance.php', {
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
    fetch(global.url + 'getAssetMaintenance.php', {
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

  const saveMaintenance = () => {
    const formattedDate = new Date(schedDate).toISOString().split('T')[0];
    let dataToSend = {
      asset_id: params.id,
      description: description,
      cost: estimatedCost,
      schedule: formattedDate,
      technician: technician,
      created_by: currentUserData.id
    };

    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(global.url + 'saveMaintenance.php', {
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
        getAssetsMaintenance();
        setModalVisible(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  const updateMaintenance = () => {
    const formattedDate = new Date(editSchedDate).toISOString().split('T')[0];
    let dataToSend = {
      maintenance_id: maintenance_id,
      description: editDescription,
      cost: editEstimatedCost,
      schedule: formattedDate,
      technician: editTechnician,
      status: editMaintenanceStatus
    };

    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(global.url + 'updateMaintenance.php', {
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
        console.log(responseJson)
        setLoading(false);
        showToast('success', 'Data updated successfully');
        getAssetsMaintenance();
        setModalEditVisible(false);
      })
      .catch((error) => {
        alert(error);
        showToast('error', 'Error adding data.');
        setLoading(false);
        console.error(error);
      });
  }

  const setUpdateMaintenanceData = (description, cost, schedule, technician, status, maintenance_id) => {
    const formattedDate = new Date(schedule).toISOString().split('T')[0];
    setEditDescription(description);
    setEditEstimatedCost(cost);
    setEditFormattedDate(formattedDate);
    setEditTechnician(technician)
    setEditMaintenanceStatus(status);
    setModalEditVisible(true);
    setMaintenanceId(maintenance_id)
  }

  const onRefresh = () => {
    getAssetsMaintenance();
  };

  const archiveMaintenance = (item_id) => {
    let dataToSend = {
      maintenance_id: item_id,
    };

    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch(global.url + 'archiveMaintenance.php', {
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
        showToast('success', 'Data archived successfully!')
        getAssetsMaintenance();
        setModalEditVisible(false);
      })
      .catch((error) => {
        showToast('error', 'Error archiving data.')
        setLoading(false);
        console.error(error);
      });
  }

  const maintenanceStatusDropdown = [
    { label: "Pending", value: 'Pending', icon: 'ban', color: 'red' },
    { label: "Ongoing", value: 'Ongoing', icon: 'refresh', color: 'orange' },
    { label: "Completed", value: 'Completed', icon: 'check', color: 'green' },
  ];

  const selectMaintenanceStatus = (item) => {
    showPickerStatus(false);
    setEditMaintenanceStatus(item.label)
  }

  useFocusEffect(
    React.useCallback(() => {
      getAssetsMaintenance();
    }, []),
  );
  return (
    <View style={{ justifyContent: 'center', backgroundColor: '#ffffff', height: '100%'}}>
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
          <Button buttonStyle={{ marginVertical: 5, marginLeft: 5, borderRadius: 5 }} onPress={() => setModalVisible(true)}>
            <Icon name="add" color="white" />
          </Button>
        </View>
      </View>
      <View style={{ justifyContent: 'center', alignItems: "flex-start", padding: 10, backgroundColor: '#fff', elevation: 5, marginHorizontal: 8, borderRadius: 5, marginBottom: 5 }}>
        <Text style={{ color: 'black', fontWeight: '500', fontSize: 14 }}>Asset Name: {params.asset_name}</Text>
        <Text style={{ color: 'black', fontWeight: '500', fontSize: 14 }}>Status: {params.maintenance_status}</Text>
      </View>
      <ScrollView style={{ paddingHorizontal: 5, marginTop: 5 }}>
        {assets?.length == 0 ? (
          <Text style={{ color: 'black', fontWeight: 'bold', textAlign: 'center' }}>No results found.</Text>
        ) : (
          assets?.map((item, index) => {
            console.log("", params.maintenance_status)
            const statusColor = item.status === 'Completed' ? 'green' : item.status === 'Pending' ? 'red' : 'orange';
            console.log(statusColor)
            return (
              <TouchableOpacity style={{
                marginBottom: 5,
                backgroundColor: 'white',
                borderColor: 'lightgrey',
                borderWidth: 1,
                elevation: 2,
                borderRadius: 5
              }}>
                <View >
                  <View style={styles.item}>
                    <View style={{ flex: 1 }}>
                      <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', }}>Description: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.maintenance_description}</Text></Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                    <View style={{ flex: 1 }}>
                      <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', }}>Cost: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.estimated_cost}</Text></Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', }}>Technician: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.technician}</Text></Text>
                    </View>
                  </View>
                  <View style={styles.item}>
                  </View>
                  <View style={styles.item}>
                    <View style={{ flex: 1 }}>
                      <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', }}>Schedule: <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.schedule}</Text></Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text adjustsFontSizeToFit style={{ color: '#404040', fontSize: 12, textTransform: 'uppercase', }}>Status: <Text adjustsFontSizeToFit style={{ color: statusColor, fontSize: 12, textTransform: 'uppercase', fontWeight: 'bold' }}>{item.status}</Text></Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingVertical: 5, paddingRight: 10 }}>
                    <Button size="xs" buttonStyle={{ marginHorizontal: 2, marginTop: 1, borderRadius: 5 }} onPress={() => setUpdateMaintenanceData(item.maintenance_description, item.estimated_cost, item.schedule, item.technician, item.status, item.id)}>
                      <Icon type="feather" name="edit" color="white" style={{ padding: 3 }} />
                    </Button>
                    <Button size="xs" buttonStyle={{ marginHorizontal: 2, marginTop: 1, backgroundColor: '#e62e00', borderRadius: 5 }} onPress={() => archiveMaintenance(item.id)}>
                      <Icon type="feather" name="trash" color="white" style={{ padding: 3 }} />
                    </Button>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        )}
      </ScrollView>
      {isPickerShow && (
        <DateTimePicker
          value={schedDate}
          mode={'date'}
          onChange={onChangeSchedDate}
          style={styles.datePicker}
          format='YYYY-MM-DD'
        />
      )}
      {isPickerEditShow && (
        <DateTimePicker
          value={editSchedDate}
          mode={'date'}
          onChange={onChangeEditSchedDate}
          style={styles.datePicker}
          format='YYYY-MM-DD'
        />
      )}


      {/* Add Maintenance Modal */}
      <Overlay isVisible={modalVisible} overlayStyle={{ height: '50%', width: '80%' }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="info" type="simple-line-icon" size={15} /><Text> Maintenance Details</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Input
              label="Description"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 15 }}
              placeholder={"enter details here"}
              value={description}
              onChangeText={description => setDescription(description)}
            />
            <Input
              label="Cost"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 15 }}
              placeholder={"Cost"}
              keyboardType='numeric'
              value={estimatedCost}
              onChangeText={estimatedCost => setEstimatedCost(estimatedCost)}
            />
            <TouchableOpacity onPress={() => showPicker(true)}>
              <Input
                label="Schedule"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Enter schedule"}
                value={formattedDate}
                editable={false}
              />
            </TouchableOpacity>
            <Input
              label="Technician"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 15 }}
              placeholder={"enter text here"}
              value={technician}
              onChangeText={technician => setTechnician(technician)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10 }}>
              <Button
                title="Cancel"
                icon={{
                  name: 'x-circle',
                  type: 'feather',
                  size: 20,
                  color: 'white',
                }}
                onPress={() => setModalVisible(false)}
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)', borderRadius: 5, marginRight: 10 }}
              />
              <Button
                title="Save"
                icon={{
                  name: 'check-circle',
                  type: 'feather',
                  size: 20,
                  color: 'white',
                }}
                buttonStyle={{ backgroundColor: '#20ab3f', borderRadius: 5 }}
                onPress={() => saveMaintenance()}
              />
            </View>
          </View>
        </ScrollView>
      </Overlay>

      {/* Edit Maintenance Modal */}
      <Overlay isVisible={modalEditVisible} overlayStyle={{ height: '60%', width: '80%' }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="info" type="simple-line-icon" size={15} /><Text> Edit Maintenance Details</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Input
              label="Description"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 15 }}
              placeholder={"enter details here"}
              value={editDescription}
              onChangeText={description => setEditDescription(description)}
            />
            <Input
              label="Cost"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 15 }}
              placeholder={"Cost"}
              keyboardType='numeric'
              value={editEstimatedCost}
              onChangeText={estimatedCost => setEditEstimatedCost(estimatedCost)}
            />
            <TouchableOpacity onPress={() => showEditPicker(true)}>
              <Input
                label="Schedule"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Enter schedule"}
                value={editFormattedDate}
                editable={false}
              />
            </TouchableOpacity>
            <Input
              label="Technician"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 15 }}
              placeholder={"enter text here"}
              value={editTechnician}
              onChangeText={technician => setEditTechnician(technician)}
            />
            <TouchableOpacity onPress={() => showPickerStatus(true)}>
              <Input
                label="Status"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Enter schedule"}
                value={editMaintenanceStatus}
                editable={false}
              />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10 }}>
              <Button
                title="Cancel"
                icon={{
                  name: 'x-circle',
                  type: 'feather',
                  size: 20,
                  color: 'white',
                }}
                onPress={() => setModalEditVisible(false)}
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)', borderRadius: 5, marginRight: 10 }}
              />
              <Button
                title="Save"
                icon={{
                  name: 'check-circle',
                  type: 'feather',
                  size: 20,
                  color: 'white',
                }}
                buttonStyle={{ backgroundColor: '#20ab3f', borderRadius: 5 }}
                onPress={() => updateMaintenance()}
              />
            </View>
          </View>
        </ScrollView>
      </Overlay>
      <Overlay isVisible={isPickerStatusShow} onBackdropPress={() => showPickerStatus(false)} overlayStyle={{ height: '25%', width: '80%' }}>
        <Text>Select Maintenance Status</Text>
        <ScrollView>
          {maintenanceStatusDropdown?.map((item, index) => {
            return (
              <ListItem key={index} bottomDivider style={{ height: 'auto' }} onPress={() => selectMaintenanceStatus(item)}>
                <Icon name={item.icon} color={item.color} type="simple-line-icon" size={16} />
                <ListItem.Content >
                  <ListItem.Title style={{ fontSize: 14, color: item.color }}>{item.label || "No name"}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )
          })}
        </ScrollView>
      </Overlay>
      <Toast/>
    </View>
  )
};


export default AssetMaintenanceScreen;

const styles = StyleSheet.create({
  label: {
    fontWeight: '400',
    fontSize: 13,
    marginTop: -15,
    color: '#0d0c0c'
  },
  inputContainer: {
    height: 35,
    padding: 5,
    borderColor: 'grey',
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRadius: 8,
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