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

const AddLocationScreen = ({route, navigation}) => {
	const currentUserData = useSelector(selectUserData);
	const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");

	const saveLocation = () => {
		setLoading(true);
		let dataToSend = { name: name, address : address, created_by: currentUserData.id };
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url+'saveLocation.php', {
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
			setLoading(false);
		})
		.catch((error) => {
			setLoading(false);
		});
	}
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
                label="Address"
								activeOutlineColor='#348ceb'
                value={address}
                onChangeText={address => setAddress(address)}
							/>
							<View style={{marginTop: 5}}>
								<Button style={{margin: 1}} icon="check" color='green' mode="contained" onPress={() => saveLocation()}>
									SAVE
								</Button>
								<Button style={{margin: 1}} icon="close" color='red' mode="contained" onPress={() => console.log('Pressed')}>
									CANCEL
								</Button>
							</View>
            </KeyboardAvoidingView>
        	</SafeAreaView>
					</View>
					</Provider>
    )
};


 
export default AddLocationScreen;

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