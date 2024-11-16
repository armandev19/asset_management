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
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import { Input, Icon, BottomSheet, ListItem, Dialog, Button, Overlay } from '@rneui/themed';

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
			headers: { "bypass-tunnel-reminder": "true",
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
            <KeyboardAvoidingView enabled style={{paddingVertical: 20, marginTop: 10}}>
              <Input
                label="Name"
                labelStyle={styles.label}
                inputContainerStyle={{...styles.inputContainer}}
                inputStyle={{ fontSize: 15}}
                placeholder={"Example location"}
                value={name}
                onChangeText={name => setName(name)}
              />
              <Input
                label="Address"
                labelStyle={styles.label}
                inputContainerStyle={{...styles.inputContainer}}
                inputStyle={{ fontSize: 15}}
                placeholder={"Example address"}
                value={address}
                onChangeText={address => setAddress(address)}
              />
							<View style={{flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10}}>
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
                  onPress={() => saveLocation()}
                />
              </View>
            </KeyboardAvoidingView>
        	</SafeAreaView>
					</View>
					</Provider>
    )
};


 
export default AddLocationScreen;

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