import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from "react-native-paper";
import {View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph, Divider, TextInput, IconButton, Button} from 'react-native-paper';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import DropDown from "react-native-paper-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import DocumentPicker from 'react-native-document-picker';

const AddAssetMaintenanceScreen = ({route, navigation}) => {
	const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [purchaseDate, setPurchaseDate] = useState("");
  const [location, setLocation] = useState("");
	const [locationList, setLocationList] = useState([]);
	const currentUserData = useSelector(selectUserData);
	const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [selectedFile, setSelectedFile] = useState([]);

	const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    setIsPickerShow(false);
  };
	
	const saveAsset = () => {
    if (!name || !description || !price || !purchaseDate || !location) {
      alert("Please fill in all required fields.");
      setLoading(false);
      return;
    }
		setLoading(true);
		let dataToSend = { name: name, description : description, price: price, purchaseDate: date, location: location, created_by: currentUserData.id };
		let formBody = [];

    // const formData = new FormData();
    

		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}

    formBody.append('file', {
      uri: selectedFile[0].uri,
      type: selectedFile[0].type,
      name: selectedFile[0].name,
    });

		formBody = formBody.join('&');
		fetch(global.url+'saveAsset.php', {
			method: 'POST',
			body: formBody,
			headers: { "bypass-tunnel-reminder": "true",
        'Content-Type': 'multipart/form-data',
			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if(responseJson.status == 'success'){
				alert('Success!');
			}else{
				alert('Failed!');
			}
			setTimeout(function(){
				navigation.replace('AssetScreen');
			}, 1500)
			setLoading(false);
		})
		.catch((error) => {
			setLoading(false);
		});
	}
  
	const getLocationDropdown = () => {
		setLoading(true)
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

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      if(res){
        setSelectedFile(res);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled the picker');
      } else {
        console.log('Error: ' + err);
      }
    }
  };

  const upload = async () => {
    const formData = new FormData();
    formData.append('file', {
      uri: res[0].uri,
      type: res[0].type,
      name: res[0].name,
    });
    const response = await fetch(global.url+'upload.php', {
      method: 'POST',
      body: formData,
      headers: { "bypass-tunnel-reminder": "true",
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
    } else {
      console.log('File upload failed.');
    }

  }


	useEffect(() => {
		getLocationDropdown();
	}, [])

    return (
			<Provider theme={DefaultTheme}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Loader loading={loading} />
          <SafeAreaView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
						justifyContent: 'center',
						alignContent: 'center',
					}}>
            <KeyboardAvoidingView enabled style={{padding: 5}}>
              <TextInput
								mode="outlined"
                label="Name"
								activeOutlineColor='#348ceb'
                value={name}
                onChangeText={name => setName(name)}
							/>
							<TextInput
								mode="outlined"
                label="Description"
								activeOutlineColor='#348ceb'
                value={description}
                onChangeText={description => setDescription(description)}
							/>
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
							<TextInput
								mode="outlined"
                label="Price"
								activeOutlineColor='#348ceb'
								keyboardType='numeric'
                value={price}
                onChangeText={price => setPrice(price)}
							/>

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
								/>
                  {!isPickerShow && (
                    <View style={{padding: 5}}>
                      <IconButton icon="calendar" color='green' mode="contained" onPress={showPicker} />
                    </View>
                  )}
                </View>
                <View>
                {selectedFile.length > 0 ? (
                    <Text style={{color: 'black'}}>adasd</Text>
                  // <Card>
                  //     <Card.Cover source={{ uri: selectedFile }} />
                  // </Card>
                  ):(
                    <Text style={{color: 'black'}}>No image</Text>
                  )}
                  <Button style={{marginTop: 10}} icon="camera" mode="contained" onPress={pickDocument}>
                    Image
                  </Button>
                  <View style={{marginTop: 5}}>

                  </View>
                </View>
							<View style={{}}>
								<Button style={{marginTop: 15}} icon="check" color='green' mode="contained" onPress={() => saveAsset()}>
									SAVE
								</Button>
                <Button style={{marginTop: 5}} icon="close" color='red' mode="contained" onPress={() => saveAsset()}>
									Cancel
								</Button>
							</View>
            </KeyboardAvoidingView>
        	</SafeAreaView>
            {/* end upload */}
					</View>
					</Provider>
    )
};


 
export default AddAssetMaintenanceScreen;

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
  });