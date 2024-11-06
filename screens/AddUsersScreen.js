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

import { Input, Icon, BottomSheet, ListItem, Dialog, Button, Divider } from '@rneui/themed';

const AddUsersScreen = ({route, navigation}) => {
	const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
	const [firstname, setFirstname] = useState("");
	const [middlename, setMiddlename] = useState("");
	const [lastname, setLastname] = useState("");
	const [age, setAge] = useState("");
	const [address, setAddress] = useState("");
	const [contact_num, setContactNum] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [access_level, setAccessLevel] = useState("");
  // const [status, setStatus] = useState("");

	const currentUserData = useSelector(selectUserData);

  const access = [
    {label: "Asset Tracker", value: 'Asset Tracker'},
    {label: "B", value: 'B'},
    {label: "AB", value: 'AB'},
  ];

	const saveUser = () => {
    if(firstname.trim() === '' || lastname.trim() === '' || username.trim() === '' || password.trim() === '' || access_level.trim() === ''){
      alert('Please fill-up required fields.');
    }else{
		  setLoading(true);
      const created_by = currentUserData.firstname+' '+currentUserData.lastname;
      let dataToSend = { firstname: firstname, middlename : middlename, lastname: lastname, age: age, address: address, contact_num: contact_num, username: username, password: password, access_level: access_level, created_by: created_by};
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(global.url+'saveUser.php', {
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
          setTimeout(()=>{
            navigation.goBack();
          }, 1500)
        }else{
          alert('Failed!');
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
    }
    
	}

	useEffect(() => {

	}, [])
    return (
      <ScrollView style={{ backgroundColor: '#ffffff' }}>
			<View style={{ marginTop: 35 }}>
          <Loader loading={loading} />
							{/* <DropDown
								label={"Access"}
								mode={"outlined"}
								visible={showDropDown}
                style={{alignItems: 'center'}}
								showDropDown={() => setShowDropDown(true)}
								onDismiss={() => setShowDropDown(false)}
								value={access_level}
								setValue={setAccessLevel}
								list={access}
							/> */}
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
                placeholder={"Doe"}
                value={middlename}
                onChangeText={middlename => setMiddlename(middlename)}
              />
              <Input
                label="Lastname"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Smith"}
                value={lastname}
                onChangeText={lastname => setLastname(lastname)}
              />
              <Input
                label="Age"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"18"}
                value={age}
                onChangeText={age => setAge(age)}
                keyboardType='numeric'
              />
              <Input
                label="Address"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Bacolod City"}
                value={address}
                onChangeText={address => setAddress(address)}
              />
              <Input
                label="Contact #"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15, }}
                placeholder={"123456789"}
                value={contact_num}
                onChangeText={contact_num => setContactNum(contact_num)}
                keyboardType='numeric'
              />
              <Input
                label="Username"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"exampleusername"}
                value={username}
                onChangeText={username => setUsername(username)}
             />
             <Input
                label="Password"
                labelStyle={styles.label}
                inputContainerStyle={styles.inputContainer}
                inputStyle={{ fontSize: 15 }}
                placeholder={"examplepassword"}
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
            </View>
        	</ScrollView>
    )
};


 
export default AddUsersScreen;

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