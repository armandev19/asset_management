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
import DropDown from "react-native-paper-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';

import { Input, Icon, BottomSheet, ListItem, Dialog, Button } from '@rneui/themed';


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
			headers: { "bypass-tunnel-reminder": "true",
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
          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
						justifyContent: 'center',
						alignContent: 'center',
					}}>
            <KeyboardAvoidingView enabled style={{paddingVertical: 20, marginTop: 10}}>
              {/* <DropDown
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
							/> */}
              
              <Input
                label="Access Level"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Select Access Level"}
                value={access_level}
                onChangeText={firstname => setFirstname(firstname)}
                editable={false}
              />
              
              <Input
                label="Status"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Select Status"}
                value={status}
                onChangeText={firstname => setFirstname(firstname)}
                editable={false}
              />
              <Input
                label="Firstname"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"John"}
                value={firstname}
                onChangeText={firstname => setFirstname(firstname)}
              />
              <Input
                label="Middlename"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"John"}
                value={middlename}
                onChangeText={middlename => setMiddlename(middlename)}
              />
              <Input
                label="Lastname"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"John"}
                value={lastname}
                onChangeText={lastname => setLastname(lastname)}
              />
              <Input
                label="Age"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"John"}
                value={age}
                onChangeText={age => setAge(age)}
              />
              <Input
                label="Address"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"example address"}
                value={address}
                onChangeText={address => setAddress(address)}
              />
              <Input
                label="Contact #"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"+123456790"}
                value={contact_num}
                onChangeText={contact_num => setContactNum(contact_num)}
              />
              <Input
                label="Username"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"example username"}
                value={username}
                onChangeText={username => setUsername(username)}
              />
              <Input
                label="Password"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"example password"}
                value={password}
                onChangeText={password => setPassword(password)}
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
                  onPress={() => saveUser()}
                />
              </View>
            </KeyboardAvoidingView>
        	</ScrollView>
					</View>
					</Provider>
    )
};


 
export default UpdateUsersScreen;

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