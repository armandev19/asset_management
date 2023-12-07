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
import {Card, Title, Paragraph, Divider, TextInput, Button, IconButton} from 'react-native-paper';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import DropDown from "react-native-paper-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';


const UpdateUsersScreen = ({route, navigation}) => {
  const details = route.params;
  console.log(details)
	const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDropDownStatus, setShowDropDownStatus] = useState(false);
	const [firstname, setFirstname] = useState(details.firstname);
	const [middlename, setMiddlename] = useState(details.middlename);
	const [lastname, setLastname] = useState(details.lastname);
	const [age, setAge] = useState(details.age);
	const [address, setAddress] = useState(details.address);
	const [contact_num, setContactNum] = useState(details.contact_num);
	const [username, setUsername] = useState(details.username);
	const [password, setPassword] = useState(details.password);
	const [access_level, setAccessLevel] = useState(details.access_level);
  const [status, setStatus] = useState(details.status);
  // const [status, setStatus] = useState("");

	const currentUserData = useSelector(selectUserData);

  const access = [
    {label: "Asset Tracker", value: 'Asset Tracker'},
    {label: "Admin", value: 'Admin'},
    {label: "AB", value: 'AB'},
  ];

  const status_list = [
    {label: "Active", value: 'Active'},
    {label: "Inactive", value: 'Inactive'},
  ];

	const saveUser = () => {
		setLoading(true);
		let dataToSend = { firstname: firstname, middlename : middlename, lastname: lastname, age: age, address: address, contact_num: contact_num, username: username, password: password, access_level: access_level, id: details.id, status: status};
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url+'updateUser.php', {
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
        setTimeout(()=>{
          navigation.goBack();
        }, 1500)
				alert('Success!');
			}else{
				alert('Failed!');
			}
		  setLoading(false);
		})
		.catch((error) => {
      
      console.log(error);
			setLoading(false);
		});
	}

	useEffect(() => {

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
            <KeyboardAvoidingView enabled style={{padding: 10}}>
              <DropDown
                dropDownStyle={{borderRadius: 5, marginTop: 20}}
								label={"Access"}
								mode={"outlined"}
								visible={showDropDown}
								showDropDown={() => setShowDropDown(true)}
								onDismiss={() => setShowDropDown(false)}
								value={access_level}
								setValue={setAccessLevel}
								list={access}
							/>
              <DropDown
                dropDownStyle={{borderRadius: 5, marginTop: 20}}
								label={"Status"}
								mode={"outlined"}
								visible={showDropDownStatus}
								showDropDown={() => setShowDropDownStatus(true)}
								onDismiss={() => setShowDropDownStatus(false)}
								value={status}
								setValue={setStatus}
								list={status_list}
							/>
              <TextInput
								mode="outlined"
                label="Firstname"
								activeOutlineColor='#348ceb'
                value={firstname}
                onChangeText={firstname => setFirstname(firstname)}
							/>
              <TextInput
								mode="outlined"
                label="Middlename"
								activeOutlineColor='#348ceb'
                value={middlename}
                onChangeText={middlename => setMiddlename(middlename)}
							/>
              <TextInput
								mode="outlined"
                label="Lastname"
								activeOutlineColor='#348ceb'
                value={lastname}
                onChangeText={lastname => setLastname(lastname)}
							/>
              <TextInput
								mode="outlined"
                label="Age"
								activeOutlineColor='#348ceb'
                value={age}
                keyboardType='numeric'
                onChangeText={age => setAge(age)}
							/>
              <TextInput
								mode="outlined"
                label="Address"
								activeOutlineColor='#348ceb'
                value={address}
                onChangeText={address => setAddress(address)}
							/>
							<TextInput
								mode="outlined"
                label="Contact #"
								activeOutlineColor='#348ceb'
                value={contact_num}
                keyboardType='numeric'
                onChangeText={contact_num => setContactNum(contact_num)}
							/>
              <TextInput
								mode="outlined"
                label="Username"
								activeOutlineColor='#348ceb'
                value={username}
                onChangeText={username => setUsername(username)}
							/>
              <TextInput
								mode="outlined"
                label="Password"
								activeOutlineColor='#348ceb'
                value={password}
                onChangeText={password => setPassword(password)}
							/>
              {/* <View style={{}}>
                <Button style={{marginTop: 10}} icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                  Image
                </Button>
                <View style={{marginTop: 5}}>

                </View>
              </View> */}
							<View style={{}}>
								<Button style={{marginTop: 15}} icon="check" color='green' mode="contained" onPress={() => saveUser()}>
									SAVE
								</Button>
                <Button style={{marginTop: 5}} icon="close" color='red' mode="contained">
									Cancel
								</Button>
							</View>
            </KeyboardAvoidingView>
        	</SafeAreaView>
					</View>
					</Provider>
    )
};


 
export default UpdateUsersScreen;

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