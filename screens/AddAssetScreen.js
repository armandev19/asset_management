import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from "react-native-paper";
import {View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Card, Title, Paragraph, Divider, TextInput, IconButton, Button} from 'react-native-paper';
import Loader from './Components/loader';
import { selectUserData, setUserData, setAssetData, selectAssetData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import DropDown from "react-native-paper-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
// import DocumentPicker from 'react-native-document-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch } from 'react-redux';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';

const AddAssetScreen = ({route, navigation}) => {
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

  const assetDeets = useSelector(selectAssetData);

	const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setIsPickerShow(false);
    setDate(value);
  };
	
  const statusList = [
    {id:"Operational", value: "Operational"},
    {id:"Under Repair", value: "Under Repair"},
    {id:"Disposed/Destroyed", value: "Disposed/Destroyed"}
  ]

	const saveAsset = () => {
		// setLoading(true);
		let dataToSend = { name: name, description : description, qty: qty, type: type, price: price, purchaseDate: date, location: location, created_by: currentUserData.id, images: JSON.stringify(assetDeets?.images) };
		let formBody = [];

		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}

		formBody = formBody.join('&');
    
		fetch(global.url+'saveAsset.php', {
			method: 'POST',
			body: formBody,
			headers: { "bypass-tunnel-reminder": "true",
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
      dispatch(setAssetData(null));
			if(responseJson.status == 'success'){
				alert('Success!');
			}else{
				alert('Failed!');
			}
			setTimeout(function(){
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
		fetch(global.url+'getLocationDropdown.php', {
			method: 'POST',
			headers: { "bypass-tunnel-reminder": "true",
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
		fetch(global.url+'generateRefNum.php', {
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
		fetch(global.url+'getAssetType.php', {
			method: 'POST',
			headers: { "bypass-tunnel-reminder": "true",
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
          dispatch(setAssetData({name: name, description: description, price: price, purchaseDate: purchaseDate, location: location, type: type, qty: qty, images: imageData}));
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
      fetch(global.url+'upload.php', {
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

	useEffect(() => {
		getLocationDropdown();
    getAssetType();
    getRefNumber();
	}, [])


    return (
			<Provider theme={DefaultTheme}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Loader loading={loading} />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
						justifyContent: 'center',
						alignContent: 'center',
					}}>
            <KeyboardAvoidingView enabled style={{padding: 10, marginHorizontal: 10}}>
              <TextInput
								mode="outlined"
                label="Ref #"
								activeOutlineColor='#348ceb'
                value={reference}
                onChangeText={reference => setReference(reference)}
							/>
              <TextInput
								mode="outlined"
                label="Name"
								activeOutlineColor='#348ceb'
                value={name ? name : assetDeets?.name}
                onChangeText={name => setName(name)}
							/>
							<TextInput
								mode="outlined"
                label="Description"
								activeOutlineColor='#348ceb'
                value={description ? description : assetDeets?.description}
                onChangeText={description => setDescription(description)}
							/>
              <TextInput
								mode="outlined"
                label="Quantity"
								activeOutlineColor='#348ceb'
                value={qty ? qty : assetDeets?.qty}
                onChangeText={qty => setQty(qty)}
							/>
              <View style={{ zIndex: 9999 }}>
                <DropDown
                  label={"Type"}
                  mode={"outlined"}
                  visible={showDropDownType}
                  showDropDown={() => setShowDropDownType(true)}
                  onDismiss={() => setShowDropDownType(false)}
                  value={type}
                  setValue={setType}
                  list={assetType}
                />
              </View>
              <View style={{ zIndex: 9999 }}>
                <DropDown
                  label={"Location"}
                  mode={"outlined"}
                  visible={showDropDown}
                  showDropDown={() => setShowDropDown(true)}
                  onDismiss={() => setShowDropDown(false)}
                  value={location}
                  setValue={setLocation}
                  list={locationList}
                />
              </View>
							<TextInput
								mode="outlined"
                label="Price"
								activeOutlineColor='#348ceb'
								keyboardType='numeric'
                value={price ? price : assetDeets?.price}
                onChangeText={price => setPrice(price)}
							/>

							{/* The date picker */}
							  {isPickerShow && (
                  <DateTimePicker
                    value={date ? date : assetDeets?.purchaseDate}
                    mode={'date'}
                    onChange={onChange}
                    style={styles.datePicker}
                    format='MM DD YYYY'
                  />
                )}
                <View style={{
                  flexDirection: 'row',
                  justifyContent: "flex-start",
                  alignItems: "center",
                  heigt: 100
                }}>
                  <TextInput
                    mode="outlined"
                    label="Purchase Date"
                    activeOutlineColor='#348ceb'
                    value={date.toDateString()} editable={false}
                    style={{flex: 1}}
                    // value={text}
                    // onChangeText={text => setText(text)}
                    right={<TextInput.Icon name="calendar" onPress={showPicker} />}
                  />
                </View>
                <View style={{marginTop: 10}}>
                  <View style={{borderColor: 'gray'}}>
                    {/* <Button style={{width: '48%'}} icon="camera" mode="contained" onPress={captureImage}>
                      Take Photo
                    </Button> */}
                    <Button icon="upload" mode="contained" onPress={pickDocument}>
                      Upload Images
                    </Button>
                    </View>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {assetDeets?.images?.flat().map((image, index) => {
                          return(
                          <View key={index} style={{ margin: 5 }}>
                            <Image
                              source={{ uri: image.uri }}  // Use the image's uri for the source
                              style={{ width: 100, height: 100 }}
                            />
                            <Text style={{color: 'black'}}>{image.fileName}</Text>  
                          </View>
                          )
                          }
                        )}
                      </View>
                  </View>
							<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
								<Button style={{marginTop: 5, width: '49%'}} icon="check" color='green' mode="contained" onPress={() => saveAsset()}>
									SAVE
								</Button>
                <Button style={{marginTop: 5, width: '49%'}} icon="close" color='red' mode="contained" onPress={() => saveAsset()}>
									Cancel
								</Button>
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