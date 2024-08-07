import React, {useState, useEffect} from 'react';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from "react-native-paper";
import {View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Divider, TextInput, Button} from 'react-native-paper';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import DropDown from "react-native-paper-dropdown";

const AddAssetTransferScreen = ({route, navigation}) => {
	const currentUserData = useSelector(selectUserData);
	const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownAsset, setShowDropDownAsset] = useState(false);
	const [asset, setAsset] = useState([]);
	const [targetLocation, setTargetLocation] = useState("");
	const [remarks, setRemarks] = useState("");
  const [assetList, setAssetList] = useState([]);
	const [locationList, setLocationList] = useState([]);

  const getAssets = () => {
    setLoading(true)
    fetch(global.url+'getAssetsDropdown.php', {
      method: 'POST',
      headers: {
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
		let dataToSend = { asset: asset, targetLocation : targetLocation, remarks: remarks, created_by: currentUserData.id };
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url+'saveAssetTransfer.php', {
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
			}else{
				alert('Failed!');
			}
			// setTimeout(function(){
			// 	navigation.replace('LocationsScreen');
			// }, 1500)
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
			headers: {
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

  

  useEffect(()=>{
    getAssets();
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
              <DropDown
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
							/>
              <TextInput
								mode="outlined"
                label="Remarks"
								activeOutlineColor='#348ceb'
                value={remarks}
                onChangeText={remarks => setRemarks(remarks)}
							/>
							<View style={{marginTop: 5, padding: 10, flexDirection: 'row', justifyContent: 'space-evenly'}}>
								<Button style={{margin: 1, width: '45%'}} icon="check" color={"#2eb82e"} mode="contained" onPress={() => saveAssetTransfer()}>
									SAVE
								</Button>
								<Button style={{margin: 1, width: '45%'}} icon="close" color='red' mode="contained" onPress={() => navigation.goBack()}>
									CANCEL
								</Button>
							</View>
            </KeyboardAvoidingView>
        	</SafeAreaView>
					</View>
					</Provider>
    )
};


 
export default AddAssetTransferScreen;

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
    }
  });