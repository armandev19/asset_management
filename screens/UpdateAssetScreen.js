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
import DateTimePicker from '@react-native-community/datetimepicker';

const UpdateAssetScreen = ({route, navigation}) => {
  
  const params = route.params
  const [details, setAssetDetails] = useState([]);
  const [loading, setLoading] = useState(false);
	
	const currentUserData = useSelector(selectUserData);
  const [showDropDown, setShowDropDown] = useState(false);
	const [showDropDownStatus, setShowDropDownStatus] = useState(false);
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
    setIsPickerShow(false);
    setDate(value);
  };

	const updateAsset = () => {
		setLoading(true);
		let dataToSend = { name: name, description : description, price: price, purchaseDate: date, location: location, id: params.id, status: status, created_by: currentUserData.id };
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
			setTimeout(function(){
				navigation.goBack();
			}, 1500)
		})
		.catch((error) => {
			setLoading(false);
		});
	}

	const dropdownStatus = [
		{ value: "Operational", label: "Operational" },
		{ value: "Under Repair", label: "Under Repair" },
		{ value: "Retired/Disposed", label: "Retired/Disposed" },
	]

  const getAssetDetails = () => {
		console.log("params", params)
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
			setName(params.asset_name);
			setDescription(params.asset_description);
			setPrice(params.original_price);
			setStatus(params.status);
			setLocation(params.loc_name)
			console.log("test", params.asset_name)
		})
		.catch((error) => {
			console.log("test", error)
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
					defaultValue={name}
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
				<DropDown
					dropDownStyle={{borderRadius: 5}}
					label={"Status"}
					mode={"outlined"}
					visible={showDropDownStatus}
					showDropDown={() => setShowDropDownStatus(true)}
					onDismiss={() => setShowDropDownStatus(false)}
					value={status}
					setValue={setStatus}
					list={dropdownStatus}
				/>
				{/* The date picker */}
				{isPickerShow && (
						<DateTimePicker
							value={date}
							mode={'date'}
							onChange={onChange}
							// style={styles.datePicker}
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
						right={<TextInput.Icon name="calendar" onPress={showPicker} />}
					/>
						{/* {!isPickerShow && (
							<View style={{padding: 5}}>
								<IconButton icon="calendar" color='green' mode="contained" onPress={showPicker} />
							</View>
						)} */}
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