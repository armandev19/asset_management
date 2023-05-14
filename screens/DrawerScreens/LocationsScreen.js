import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Button, Modal, ToastAndroid, Alert, TextInput} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';

const LocationsScreen = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState({modalVisible: false});
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState();
  const [purpose, setPurpose] = useState();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [userdata, setUserData] = useState('');

  const currentUserData = useSelector(selectUserData);

  const [items, setItems] = useState([
    {label: "A", value: 'A'},
    {label: "B", value: 'B'},
    {label: "AB", value: 'AB'},
    {label: "O", value: 'O'},
    {label: "A+", value: 'A+'},
    {label: "A-", value: 'A-'},
    {label: "B+", value: 'B+'},
    {label: "B-", value: 'B-'},
    {label: "AB+", value: 'AB+'},
    {label: "AB-", value: 'AB-'},
    {label: "O+", value: 'O+'},
    {label: "O-", value: 'O-'},
  ]);
  const [requests, setRequests] = useState([]);

  const getAllApprovedRequest = () => {
    setLoading(true)
    let postDataApproved = {userAccess: userdata.access, userID: currentUserData.id};
    let formBody = [];
    for (let key in postDataApproved) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(postDataApproved[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.url+'fetchApprovedRequest.php', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setRequests(responseJson.data);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  useEffect(()=>{
    getAllApprovedRequest();
  }, [])

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#f2f2f2" : "white";
    const color = item.id === selectedId ? 'black' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }} 
      />
    );
  };

  const tempDescription = (description, bloodtype, qty) => {
    var temp = "QTY: "+qty+"\nBLOODTYPE: "+bloodtype
    return temp
  }
  const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <List.Item
      style={[styles.item, backgroundColor]}
      title={item.request_number}
      description={tempDescription(item.purpose, item.bloodtype, item.qty)}
      left={props => <List.Icon icon='checkbox-marked-outline' color="green"/>}
      right={props => 
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'green', marginTop: 20, marginRight: 10, textTransform: 'uppercase', fontWeight: 'bold'}}>Approved</Text>
        </View>
      }
      onPress={() => navigation.navigate('DetailScreen', item)}
    />
  );
  

  return (
    <SafeAreaView style={{flex: 1}}>
      <Loader loading={loading} />
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
        style={{marginBottom: 15}}
      />
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
          backdropOpacity={0.9}
          style={{height: 100}}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>NEW BLOOD DONATION REQUEST</Text>
              <View style={styles.SectionStyle}>
                <DropDownPicker
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}
                  containerStyle={{ width: "100%" }}
                  placeholder="Select Blood Type"
                />
                <TextInput placeholder="Qty" placeholderTextColor={'black'} keyboardType="numeric" style={styles.inputStyle} onChangeText={(qty) =>
                    setQty(qty)
                  }>
                </TextInput>
                <TextInput 
                  placeholder="Needed Date" 
                  placeholderTextColor={'black'} 
                  style={styles.inputStyle}
                  
                />
                <TextInput multiline numberOfLines={4} placeholder="Purpose" placeholderTextColor={'black'} style={styles.inputStyle} onChangeText={(purpose) =>
                    setPurpose(purpose)
                  }>
                </TextInput>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1}}>
                  <View style={{flex: 1, padding: 10, margin: 0}}>
                    <Button
                      onPress={() => saveBloodRequest()}
                      title="Save"
                    />  
                  </View>
                  <View style={{flex: 1, padding: 10, margin: 0}}>
                    <Button
                      onPress={() => setModalVisible(!modalVisible)}
                      title="Cancel"
                    />  
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 8,
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 1,
  },
  modalView: {
    height: "50%",
    width: "90%",
    marginTop: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modalText: {
    marginTop: 15,
    marginBottom: 15,
    textAlign: "center",
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  selectDropdown: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 30,
    height: 40,
    borderColor: '#dadae8',
    backgroundColor: 'white',
    width: '80%'
  },
  inputStyle: {
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    marginTop: 10,
    flex: 1
  },
  SectionStyle: {
    flex: 1,
    margin: 20,
  },
  viewButtons: {
    flexDirection: 'row',
    marginVertical: 5
  }
});
 
export default LocationsScreen;