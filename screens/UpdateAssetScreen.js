import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DropDown from "react-native-paper-dropdown";
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input, Icon, BottomSheet, ListItem, Dialog, Button, Divider } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const UpdateAssetScreen = ({ route, navigation }) => {

	const params = route.params
	const [details, setAssetDetails] = useState([]);
	const [loading, setLoading] = useState(false);

	const currentUserData = useSelector(selectUserData);
	const [showDropDown, setShowDropDown] = useState(false);
	const [showDropDownStatus, setShowDropDownStatus] = useState(false);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState({label: '', id: ''});
	const [price, setPrice] = useState('');
	const [status, setStatus] = useState('');
	const [qty, setQty] = useState('');
	const [locationList, setLocationList] = useState([]);
	const [isPickerShow, setIsPickerShow] = useState(false);
	const [date, setDate] = useState(new Date(Date.now()));
	const [visible1, setVisible1] = useState(false);
	const [selectedImage, setSelectedImage]= useState({
		id: "",
		filename: '',
	});
	const [isVisible, setIsVisible] = useState(false);
	const [isVisibleStatus, setIsVisibleStatus] = useState(false);

	const showPicker = () => {
		setIsPickerShow(true);
	};

	const onChange = (event, value) => {
		setIsPickerShow(false);
		setDate(value);
	};

	const viewImage = (id, filename) => {
		setVisible1(!visible1);
		setSelectedImage({id: id, filename: filename});
	}

	const updateAsset = () => {
		setLoading(true);
		let dataToSend = { name: name, description: description, price: price, purchaseDate: date, location: location.value, id: params.id, status: status, created_by: currentUserData.id, qty: qty };
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url + 'updateAsset.php', {
			method: 'POST',
			body: formBody,
			headers: {
				"bypass-tunnel-reminder": "true",
				'Content-Type':
					'application/x-www-form-urlencoded;charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((responseJson) => {
				if (responseJson.status == 'success') {
					alert('Success!');
				} else {
					alert('Failed!');
				}
				setLoading(false);
				setTimeout(function () {
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

	const getAssetDetails = async () => {
		setLoading(true);
		let dataToSend = { id: params.asset_code };
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		await fetch(global.url + 'getAssetDetails.php', {
			method: 'POST',
			body: formBody,
			headers: { 
				'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8',
			},
		})
			.then((response) => response.json())
			.then((responseJson) => {
				setAssetDetails(responseJson?.data[0])
				setQty(responseJson?.data[0].qty);
				setLocation(responseJson?.data[0].curr_loc)
			})
			.catch((error) => {
				console.log("test", error)
				setLoading(false);
			});
	}

	const getLocationDropdown = () => {
		setLoading(true)
		fetch(global.url + 'getLocationDropdown.php', {
			method: 'POST',
			headers: {
				"bypass-tunnel-reminder": "true",
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

	const onSelectLocation = (location) => {
		setLocation({label: location.label, value: location.value})
		setIsVisible(!isVisible);
	}

	const onSelectStatus = (status) => {
		setStatus(status)
		setIsVisibleStatus(!isVisibleStatus);
	}

	console.log("Status", status)
	
	useEffect(() => {
		// getAssetDetails();
		getLocationDropdown();
	}, [])

	useFocusEffect(
		React.useCallback(() => {
		  getAssetDetails();
		}, []),
	    );

	return (
		<ScrollView style={{ backgroundColor: 'white' }}>
			<View style={{ padding: 5 }}>
				<BottomSheet isVisible={isVisible} onBackdropPress={()=>setIsVisible(!isVisible)}>
					<View style={styles.bottomSheetContent}>
						{locationList.map((item, index) => (
							<ListItem key={index} onPress={()=>onSelectLocation(item)} containerStyle={styles.listItem}>
								<ListItem.Content>
									<ListItem.Title>{item.label}</ListItem.Title>
								</ListItem.Content>
							</ListItem>
						))}
					</View>
				</BottomSheet>
				<BottomSheet isVisible={isVisibleStatus} onBackdropPress={()=>setIsVisibleStatus(!isVisibleStatus)}>
					<View style={styles.bottomSheetContent}>
						{dropdownStatus.map((item, index) => (
							<ListItem key={index} onPress={()=>onSelectStatus(item.value)} containerStyle={styles.listItem}>
								<ListItem.Content>
									<ListItem.Title>{item.label}</ListItem.Title>
								</ListItem.Content>
							</ListItem>
						))}
					</View>
				</BottomSheet>
				{/* <InputText label="Asset Code" placeholder={"Enter Text Here"} value={name} disabled={true}/> */}
				<Input
					label="Asset Code"
					labelStyle={{ fontWeight: '400', fontSize: 13 }}
					inputContainerStyle={styles.inputContainer}
					inputStyle={{ fontSize: 15 }}
					placeholder={"Enter Text Here"}
					value={details.asset_code}
					disabled
				/>
				<Input
					label="Asset Name"
					labelStyle={styles.label}
					inputContainerStyle={styles.inputContainer}
					inputStyle={{ fontSize: 15 }}
					placeholder={"Enter Text Here"}
					value={name}
					onChangeText={name => setName(name)}
				/>
				<Input
					label="Description"
					labelStyle={styles.label}
					inputContainerStyle={styles.inputContainer}
					inputStyle={{ fontSize: 15 }}
					placeholder={"Enter Text Here"}
					value={details.description}
					onChangeText={description => setDescription(description)}
				/>
				<Input
					label="Qty"
					labelStyle={styles.label}
					inputContainerStyle={styles.inputContainer}
					inputStyle={{ fontSize: 15 }}
					placeholder={"Enter Text Here"}
					value={qty}
					onChangeText={qty => setQty(qty)}
					keyboardType='numeric'
				/>
				<Input
					label="Current Value"
					labelStyle={styles.label}
					inputContainerStyle={styles.inputContainer}
					inputStyle={{ fontSize: 15 }}
					placeholder={"Enter Text Here"}
					value={details.current_price}
					onChangeText={price => setPrice(price)}
					leftIcon={{type: 'feather', name: 'dollar-sign', size: 16}}
					keyboardType='numeric'
				/>
				
				<TouchableOpacity 
					onPress={()=>setIsVisible(true)}>
					<Input
						label="Location"
						labelStyle={styles.label}
						inputContainerStyle={styles.inputContainer}
						inputStyle={{ fontSize: 15 }}
						placeholder={"Select Location"}
						value={location}
						editable={false}
						onChangeText={(location)=>setLocation(location)}
						rightIcon={{ type: 'feather', name: 'chevron-down', size: 15 }}
						leftIcon={{ type: 'feather', name: 'map-pin', size: 15  }}
					/>
				</TouchableOpacity>
				<TouchableOpacity 
					onPress={showPicker}>
					<Input
						label="Purcase Date"
						labelStyle={styles.label}
						inputContainerStyle={styles.inputContainer}
						inputStyle={{ fontSize: 15 }}
						placeholder={"Enter Text Here"}
						value={details.purchase_date}
						editable={false}
						leftIcon={{type: 'feather', name: 'calendar', size: 16}}
					/>
				</TouchableOpacity>
				<TouchableOpacity 
					onPress={()=>setIsVisibleStatus(true)}>
					<Input
						label="Status"
						labelStyle={styles.label}
						inputContainerStyle={styles.inputContainer}
						inputStyle={{ fontSize: 15 }}
						placeholder={"Select Status"}
						onChangeText={(status)=>setStatus(status)}
						value={status}
						// editable={false}
						rightIcon={{ type: 'feather', name: 'chevron-down', size: 15 }}
						leftIcon={{ type: 'feather', name: 'activity', size: 15  }}
					/>
				</TouchableOpacity>
				<View>
					<Text style={{ marginLeft: 10, fontWeight: '500', color: 'grey' }}>Images</Text>
					<View style={{ padding: 5, flexDirection: 'row' }}>
						{params?.images?.length > 0 ?
							params?.images?.flat().map((image, index) => {
								const imageLocation = global.url + image?.image_location;
								return (
									<TouchableOpacity onPress={() => viewImage(image?.id, imageLocation)} key={index}>
										<Image
											source={{ uri: imageLocation }}
											style={{ width: 80, height: 80, borderRadius: 5, borderWidth: 1, borderColor: 'grey', marginHorizontal: 4 }}
										/>
									</TouchableOpacity>
								)
							})
					
						: 
						<View>
							<Text style={{color: '#000', fontSize: 15, marginLeft: 5}}>No images available.</Text>
						</View>
						}
						
					</View>
				</View>
				<Dialog
					isVisible={visible1}
					onBackdropPress={viewImage}
				>
					<View style={{ alignItems: 'center' }}>
						<Image
							source={{uri : selectedImage.filename}}
							style={{ width: 280, height: 250, borderRadius: 5, borderWidth: 1, borderColor: 'grey', marginHorizontal: 4 }}
						/>
					</View>
					<Dialog.Actions>
						<Dialog.Button title="Remove" icon="trashcan" onPress={() => console.log('Secondary Action Clicked!')}/>
					</Dialog.Actions>
				</Dialog>
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
				 <Divider />
				<View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
				<Button 
					title="Save"  
					icon={{
						name: 'check-circle',
						type: 'feather',
						size: 20,
						color: 'white',
					}} 
					onPress={() => updateAsset()}
					buttonStyle={{marginTop: 20}}
				/>
				<Button 
					title="Cancel"  
					
					icon={{
						name: 'x-circle',
						type: 'feather',
						size: 20,
						color: 'white',
					}} 
					onPress={() => updateAsset()}
					buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)', marginTop: 20 }}
				/>
				</View>
			</View>
		</ScrollView>
	)
};

export default UpdateAssetScreen;

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
})