import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from "react-native-paper";
import { View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card, Title, Paragraph, Divider, TextInput, IconButton } from 'react-native-paper';
import Loader from './Components/loader';
import { selectUserData, setUserData, setAssetData, selectAssetData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import DropDown from "react-native-paper-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
// import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';

import { Input, Icon, Button, Overlay, ListItem } from '@rneui/themed';
import { stat } from 'react-native-fs';

const AddAssetScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownType, setShowDropDownType] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [qty, setQty] = useState(1);
  const [locationList, setLocationList] = useState([]);
  const [assetType, setAssetType] = useState([]);
  const currentUserData = useSelector(selectUserData);
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [selectedFile, setSelectedFile] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [imageName, setImageName] = useState('');
  const [reference, setReference] = useState('');
  const [typeList, setTypeList] = useState([]);
  const [status, setStatus] = useState('');
  const [utilizationPurpose, setUtilizationPurpose] = useState('');

  const assetDeets = useSelector(selectAssetData);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleStatus, setIsVisibleStatus] = useState(false);
  const [isVisibleType, setIsVisibleType] = useState(false);


  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setIsPickerShow(false);
    setDate(value);
  };

  const getTypeList = () => {
    setLoading(true)
    fetch(global.url + 'getTypeDropdown.php', {
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
        setTypeList(responseJson.data);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  const statusList = [
    { id: "Operational", value: "Operational" },
    { id: "Under Repair", value: "Under Repair" },
    { id: "Disposed/Destroyed", value: "Disposed/Destroyed" },
    { id: "Currently Used", value: "Currently Used" }
  ]

  const saveAsset = () => {
    // setLoading(true);
    let dataToSend = { name: name, description: description, qty: qty, type: type, price: price, purchaseDate: date, location: location, created_by: currentUserData.id, utilizationPurpose: utilizationPurpose, status: status, images: JSON.stringify(assetDeets?.images) };
    let formBody = [];

    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');

    fetch(global.url + 'saveAsset.php', {
      method: 'POST',
      body: formBody,
      headers: {
        "bypass-tunnel-reminder": "true",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("responseJson", responseJson)
        dispatch(setAssetData(null));
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
        console.log(error)
      });
  }

  const getLocationDropdown = () => {
    // setLoading(true)
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

  const getRefNumber = () => {
    fetch(global.url + 'generateRefNum.php', {
      method: 'POST',
      headers: {
        'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setReference(responseJson);
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  }

  const getAssetType = () => {
    // setLoading(true)
    fetch(global.url + 'getAssetType.php', {
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
        setAssetType(responseJson.data);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  const captureImage = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,  // Saves image to the gallery
        cameraType: 'back',  // Use the back camera
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else if (response.assets) {
          console.log('Captured image: ', response.assets);
        }
      }
    );
  };

  const pickDocument = async () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        // includeBase64: true,
        saveToPhotos: false,
        selectionLimit: 0,
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const imageData = response.assets;
          console.log("response.assets", imageData)
          dispatch(setAssetData({ name: name, description: description, price: price, purchaseDate: purchaseDate, location: location, type: type, qty: qty, images: imageData }));
          // Save all selected images
          uploadImages(response.assets); // Upload the selected images
        }
      }
    );
  };

  const uploadImages = async (selectedImages) => {
    const formData = new FormData();
    selectedImages.forEach((image, index) => {
      formData.append(`files[]`, {
        uri: image.uri,
        name: image.fileName || `image_${index}.jpg`,
        type: image.type,
      });
    });

    formData.append('meta', JSON.stringify({
      reference: reference,
    }));

    try {
      fetch(global.url + 'upload.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      }).then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error('Error uploading images: ', error);
    }
  };

  const dropdownStatus = [
    { value: "Active", label: "Active", icon: 'control-play', color: 'green' },
    { value: "Idle", label: "Idle", icon: 'control-pause', color: 'blue' },
    { value: "Under Repair", label: "Under Repair", icon: 'wrench', color: 'orange' },
    { value: "Retired/Disposed", label: "Retired/Disposed", icon: 'trash', color: 'red' },
  ]

  const onSelectLocation = (location) => {
    setLocation({ label: location.label, value: location.value })
    setIsVisible(!isVisible);
  }

  const onSelectStatus = (status) => {
    setStatus(status)
    setIsVisibleStatus(!isVisibleStatus);
  }

  const onSelectType = (type) => {
    setType({ label: type.label, value: type.value })
    setIsVisibleType(!isVisibleType);
  }

  useEffect(() => {
    getLocationDropdown();
    getAssetType();
    getRefNumber();
    getTypeList();
  }, [])


  return (
    <Provider theme={DefaultTheme}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Loader loading={loading} />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <KeyboardAvoidingView enabled style={{ padding: 5, marginTop: 20 }}>
            <Overlay isVisible={isVisible} onBackdropPress={() => setIsVisible(!isVisible)} overlayStyle={{ height: '50%', width: '80%' }}>
              <Text>Select Location</Text>
              <ScrollView>
                {locationList?.map((item, index) => {
                  return (
                    <ListItem key={index} bottomDivider style={{ height: 'auto' }} onPress={() => onSelectLocation(item)}>
                      <Icon name="location-pin" type="simple-line-icon" size={15} />
                      <ListItem.Content >
                        <ListItem.Title style={{ fontSize: 14 }}>{item.label || "No name"}</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  )
                })}
              </ScrollView>
            </Overlay>
            <Overlay isVisible={isVisibleStatus} onBackdropPress={() => setIsVisibleStatus(!isVisibleStatus)} overlayStyle={{ height: '50%', width: '80%' }}>
              <Text>Select Status</Text>
              <ScrollView>
                {dropdownStatus?.map((item, index) => {
                  return (
                    <ListItem key={index} bottomDivider style={{ height: 'auto' }} onPress={() => onSelectStatus(item.label)}>
                      <Icon name={item.icon} color={item.color} type="simple-line-icon" size={15} />
                      <ListItem.Content >
                        <ListItem.Title style={{ fontSize: 14 }}>{item.label || "No name"}</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  )
                })}
              </ScrollView>
            </Overlay>
            <Overlay isVisible={isVisibleType} onBackdropPress={() => setIsVisibleType(!isVisibleType)} overlayStyle={{ height: '50%', width: '80%' }}>
              <Text>Select Type</Text>
              <ScrollView>
                {typeList?.map((item, index) => {
                  return (
                    <ListItem key={index} bottomDivider style={{ height: 'auto' }} onPress={() => onSelectType(item)}>
                      <Icon name="flag" type="simple-line-icon" size={15} />
                      <ListItem.Content >
                        <ListItem.Title style={{ fontSize: 14 }}>{item.label || "No name"}</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  )
                })}
              </ScrollView>
            </Overlay>
            <Input
              label="Reference #"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 15 }}
              placeholder={"Select Access Level"}
              value={reference}
              onChangeText={reference => setReference(reference)}
              editable={false}
            />
            <Input
              label="Asset name"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 15 }}
              placeholder={"Enter asset name"}
              value={name ? name : assetDeets?.name}
              onChangeText={name => setName(name)}
            />
            <Input
              label="Description"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 15 }}
              placeholder={"Enter description"}
              value={description ? description : assetDeets?.description}
              onChangeText={description => setDescription(description)}
            />
            <Input
              label="Qty"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 15 }}
              placeholder={"Enter quantity"}
              keyboardType='numeric'
              value={qty ? qty : assetDeets?.qty}
              onChangeText={qty => setQty(qty)}
            />
            <Input
              label="Price"
              labelStyle={styles.label}
              inputContainerStyle={styles.inputContainer}
              inputStyle={{ fontSize: 15 }}
              placeholder={"Enter price"}
              keyboardType='numeric'
              value={price ? price : assetDeets?.price}
              onChangeText={price => setPrice(price)}
            />
            <TouchableOpacity
              onPress={showPicker}>
              <Input
                label="Purcase Date"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Select date"}
                value={date.toDateString()}
                editable={false}
                leftIcon={{ type: 'feather', name: 'calendar', size: 16 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsVisibleType(true)}>
              <Input
                label="Type"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Selecte type"}
                value={type.label}
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsVisible(true)}>
              <Input
                label="Location"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Select Location"}
                value={location.label}
                editable={false}
                rightIcon={{ type: 'feather', name: 'chevron-down', size: 15 }}
                leftIcon={{ type: 'feather', name: 'map-pin', size: 15 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsVisibleStatus(true)}>
              <Input
                label="Status"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Select Status"}
                value={status}
                editable={false}
                rightIcon={{ type: 'feather', name: 'chevron-down', size: 15 }}
                leftIcon={{ type: 'feather', name: 'activity', size: 15 }}
              />
            </TouchableOpacity>
            {status === 'Active' && (
              <Input
                  label="Utilization Purpose"
                  labelStyle={styles.label}
                  inputContainerStyle={styles.inputContainer}
                  inputStyle={{ fontSize: 15 }}
                  placeholder={"Usage Reason"}
                  value={utilizationPurpose}
                />
              )
            }

            {/* The date picker */}
            {isPickerShow && (
              <DateTimePicker
                value={date}
                mode={'date'}
                onChange={onChange}
                style={styles.datePicker}
                format='MM DD YYYY'
              />
            )}
            <View style={{ marginTop: 10 }}>

              <Divider />
              <View style={{ borderColor: 'gray' }}>
                {/* <Button style={{width: '48%'}} icon="camera" mode="contained" onPress={captureImage}>
                      Take Photo
                    </Button> */}

              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {assetDeets?.images?.flat().map((image, index) => {
                  return (
                    <View key={index} style={{ margin: 5 }}>
                      <Image
                        source={{ uri: image.uri }}  // Use the image's uri for the source
                        style={{ width: 100, height: 100 }}
                      />
                      <Text style={{ color: 'black' }}>{image.fileName}</Text>
                    </View>
                  )
                }
                )}
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 20 }}>
              <Button
                title="Upload"
                icon={{
                  name: 'upload',
                  type: 'feather',
                  size: 20,
                  color: 'white',
                }}
                onPress={pickDocument}
                buttonStyle={{ marginTop: 20, marginRight: 10 }}>
              </Button>
              <Button
                title="Cancel"

                icon={{
                  name: 'x-circle',
                  type: 'feather',
                  size: 20,
                  color: 'white',
                }}
                onPress={() => navigation.goBack()}
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)', marginTop: 20, marginRight: 10 }}
              />
              <Button
                title="Save"
                icon={{
                  name: 'check-circle',
                  type: 'feather',
                  size: 20,
                  color: 'white',
                }}
                onPress={() => saveAsset()}
                buttonStyle={{ marginTop: 20, backgroundColor: 'green', marginRight: 10 }}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        {/* end upload */}
      </View>
    </Provider>
  )
};



export default AddAssetScreen;

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
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
    color: 'black'
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    margin: 5,
    alignSelf: 'center'
  },
});