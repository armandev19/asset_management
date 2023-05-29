import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Card, Title, Paragraph, Divider, Button, TextInput, IconButton} from 'react-native-paper';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
} from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { set } from 'react-native-reanimated';

const UpdateLocationScreen = ({route, navigation}) => {
  
  const params = route.params;
  const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');

	const updateLocation = () => {
		setLoading(true);
		let dataToSend = { name: name, address : address, id: params };
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url+'updateLocation.php', {
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
			// 	navigation.replace("LocationDetailsScreen")
			// }, 1500)
			setLoading(false);
		})
		.catch((error) => {
			setLoading(false);
		});
	}

  const getAssetDetails = () => {
    setLoading(true);
		let dataToSend = { id: params };
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url+'getLocationDetails.php', {
			method: 'POST',
			body: formBody,
			headers: {
				'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8',
			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
			setLoading(false);
			setName(responseJson.data[0].name);
			setAddress(responseJson.data[0].address);
		})
		.catch((error) => {
			setLoading(false);
		});
	}

  useEffect(()=>{
    getAssetDetails();
  }, [])


  return (
		<Provider theme={DefaultTheme} >
		<View style={{padding: 10}}>
    <Card style={{heigt: '100%', }}>
      <Card.Content>
				<TextInput
					style={{width: '100%'}}
					// theme={{ roundness: 20 }}
					mode="outlined"
					label="Name"
					activeOutlineColor='#348ceb'
					value={name}
					onChangeText={name => setName(name)}
				/>
				<TextInput
					style={{width: '100%'}}
					// theme={{ roundness: 20 }}
					mode="outlined"
					label="Address"
					activeOutlineColor='#348ceb'
					value={address}
					onChangeText={address => setAddress(address)}
				/>
      </Card.Content>
      
      <Card.Actions style={{padding: 10}}>
        <Button icon="check" mode="contained" style={{width: "100%"}} onPress={() => updateLocation()}>Save</Button>
      </Card.Actions>
    </Card>
		</View>
		</Provider>
  )
};
 
export default UpdateLocationScreen;