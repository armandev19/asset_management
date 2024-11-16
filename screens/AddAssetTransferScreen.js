import React, { useState, useEffect } from 'react';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from "react-native-paper";
import { View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { } from 'react-native-paper';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import DropDown from "react-native-paper-dropdown";
import { Input, Icon, BottomSheet, ListItem, Dialog, Button, Overlay } from '@rneui/themed';
import { TouchableOpacity } from 'react-native';


const AddAssetTransferScreen = ({ route, navigation }) => {
  const currentUserData = useSelector(selectUserData);
  const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownAsset, setShowDropDownAsset] = useState(false);
  const [asset, setAsset] = useState([]);
  const [targetLocation, setTargetLocation] = useState("");
  const [remarks, setRemarks] = useState("");
  const [assetList, setAssetList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([])
  const [visible, setVisible] = useState(false);
  const [visibleLocation, setVisibleLocation] = useState(false);
  const [targetLocationName, setTargetLocationName] = useState('');

  const [selectedItems, setSelectedItems] = useState([]);

  const toggleCheckbox = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(item.value)) {
        // Remove item if it's already selected
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item.value);
      } else {
        // Add item if it's not selected
        return [...prevSelectedItems, item.value];
      }
    });
  };

  const selectedAssetLabels = assetList
    .filter((asset) => selectedItems.includes(asset.value))
    .map((asset) => asset.label);

  const getAssets = () => {
    setLoading(true)
    fetch(global.url + 'getAssetsDropdown.php', {
      method: 'POST',
      headers: {
        "bypass-tunnel-reminder": "true",
        'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setAssetList(responseJson.data);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  const saveAssetTransfer = () => {
    setLoading(true);
    let dataToSend = { asset: JSON.stringify(selectedItems), targetLocation: targetLocation, remarks: remarks, created_by: currentUserData.id };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.url + 'saveAssetTransfer.php', {
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
        // console.log("asdasdasdas", responseJson)
        if (responseJson.status == 'success') {
          alert('Success!');
        } else {
          alert('Failed!');
        }
        setTimeout(function () {
          navigation.goBack();
        }, 1500)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }

  const getLocationDropdown = () => {
    setLoading(true)
    fetch(global.url + 'getLocationDropdown.php', {
      method: 'POST',
      headers: {
        "bypass-tunnel-reminder": "true",
        'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setLocationList(responseJson.data);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  const selectTargetLocation = (item) => {
    setTargetLocation(item.value);
    setTargetLocationName(item.label);
    setVisibleLocation(false);
  }

  useEffect(() => {
    getAssets();
    getLocationDropdown();
  }, [])
  return (
    <Provider theme={DefaultTheme}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Loader loading={loading} />
        <SafeAreaView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <KeyboardAvoidingView enabled style={{ paddingVertical: 20, marginTop: 10 }}>
            {/* <DropDown
								label={"Asset"}
								mode={"outlined"}
								visible={showDropDownAsset}
                style={{alignItems: 'center'}}
								showDropDown={() => setShowDropDownAsset(true)}
								onDismiss={() => setShowDropDownAsset(false)}
								value={asset}
								setValue={setAsset}
								list={assetList}
							/>
							<DropDown
								label={"Transfer To"}
								mode={"outlined"}
								visible={showDropDown}
                style={{alignItems: 'center'}}
								showDropDown={() => setShowDropDown(true)}
								onDismiss={() => setShowDropDown(false)}
								value={targetLocation}
								setValue={setTargetLocation}
								list={locationList}
							/> */}
            <TouchableOpacity onPress={() => setVisible(true)}>
              <Input
                label="Asset"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Select asset"}
                value={selectedAssetLabels?.join(', ')}
                // onChangeText={selectedAssets => setSelectedAssets(selectedAssets)}
                editable={false}
                rightIcon={{ type: 'simple-line-icon', name: 'arrow-down', size: 15 }}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setVisibleLocation(true)}>
              <Input
                label="Transfer To"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Select transfer location"}
                value={targetLocationName}
                editable={false}
                rightIcon={{ type: 'simple-line-icon', name: 'arrow-down', size: 15 }}
              />
            </TouchableOpacity>
            <Input
              label="Remarks"
              labelStyle={styles.label}
              inputContainerStyle={{ ...styles.inputContainer, height: 100 }}
              inputStyle={{ fontSize: 15, textAlignVertical: 'top' }}
              placeholder={"Additional instructions"}
              multiline={true}           // Allows multiple lines
              numberOfLines={4}          // Sets the visible number of lines
              value={remarks}
              onChangeText={remarks => setRemarks(remarks)}
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
                onPress={() => navigation.goBack()}
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
                onPress={() => saveAssetTransfer()}
              />
            </View>
          </KeyboardAvoidingView>
          <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)} overlayStyle={{ height: '50%', width: '80%' }}>
            <Text>Select Asset</Text>
            <ScrollView>
              {assetList?.map((item, index) => {
                return (
                  <ListItem key={index} bottomDivider style={{ height: 'auto' }}>
                    <ListItem.CheckBox checked={selectedItems.includes(item.value)} onPress={() => toggleCheckbox(item)} size={18} />
                    <ListItem.Content >
                      <ListItem.Title style={{ fontSize: 14 }}>{item.label || "No name"}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                )
              })}
            </ScrollView>
          </Overlay>
          <Overlay isVisible={visibleLocation} onBackdropPress={() => setVisibleLocation(false)} overlayStyle={{ height: '50%', width: '80%' }}>
            <Text>Select Location</Text>
            <ScrollView>
              {locationList?.map((item, index) => {
                return (
                  <ListItem key={index} bottomDivider style={{ height: 'auto' }} onPress={() => selectTargetLocation(item)}>
                    <Icon name="location-pin" type="simple-line-icon" size={15} />
                    <ListItem.Content >
                      <ListItem.Title style={{ fontSize: 14 }}>{item.label || "No name"}</ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                )
              })}
            </ScrollView>
          </Overlay>
        </SafeAreaView>
      </View>
    </Provider>
  )
};



export default AddAssetTransferScreen;

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
  selectDropdown: {
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    height: 40,
    borderColor: '#dadae8',
    backgroundColor: 'white',
    width: '100%'
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 5,
  },
  buttonStyle: {
    backgroundColor: '#00b300',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#00b300',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
    backgroundColor: 'white'
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  selectButtonTextStyle: {
    color: '#000000',
    fontSize: 13,
    alignSelf: 'center'
  }
});