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

const UpdateAssetScreen = ({route, navigation}) => {
  
  const params = route.params
  const [details, setAssetDetails] = useState([]);
  const [loading, setLoading] = useState(false);
	
  const [showDropDown, setShowDropDown] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [price, setPrice] = useState('');
	const [status, setStatus] = useState('');
	const [locationList, setLocationList] = useState([]);
	const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

	const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    setIsPickerShow(false);
  };

	const updateAsset = () => {
		setLoading(true);
		let dataToSend = { name: name, description : description, price: price, purchaseDate: date, location: location, id: params, status: status };
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url+'updateAsset.php', {
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
		fetch(global.url+'getAssetDetails.php', {
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
      setAssetDetails(responseJson.data[0]);
			setName(responseJson.data[0].asset_name);
			setDescription(responseJson.data[0].asset_description);
			setPrice(responseJson.data[0].original_price);
			setStatus(responseJson.data[0].status);
			setLocation(responseJson.data[0].loc_name)
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
    getAssetDetails();
		getLocationDropdown();
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
					label="Description"
					activeOutlineColor='#348ceb'
					value={description}
					onChangeText={description => setDescription(description)}
				/>
				<DropDown
					dropDownStyle={{borderRadius: 5}}
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
					style={{width: '100%'}}
					// theme={{ roundness: 20 }}
					mode="outlined"
					label="Price"
					activeOutlineColor='#348ceb'
					value={price}
					keyboardType='numeric'
					onChangeText={price => setPrice(price)}
				/>
				<TextInput
					style={{width: '100%'}}
					// theme={{ roundness: 20 }}
					mode="outlined"
					label="Status"
					activeOutlineColor='#348ceb'
					value={status}
					onChangeText={status => setStatus(status)}
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
						// theme={{ roundness: 20 }}
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
      </Card.Content>
      
      <Card.Actions style={{padding: 10}}>
        <Button icon="check" mode="contained" style={{width: "100%"}} onPress={() => updateAsset()}>Save</Button>
      </Card.Actions>
    </Card>
		</View>
		</Provider>
  )
};
 
export default UpdateAssetScreen;