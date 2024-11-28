import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import DropDown from "react-native-paper-dropdown";
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input, Icon, BottomSheet, ListItem, Dialog, Button, Divider, Overlay } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const UpdateAssetScreen = ({ route, navigation }) => {
	const params = route.params
	const [loading, setLoading] = useState(false);
	const currentUserData = useSelector(selectUserData);
	const [name, setName] = useState(params.asset_name);
	const [description, setDescription] = useState(params.asset_description);
	const [location, setLocation] = useState(params.original_location);
	const [locationName, setLocationName] = useState('');
	const [type, setType] = useState(params.type_id);
	const [typeName, setTypeName] = useState('');
	const [price, setPrice] = useState(params.price);
	const [status, setStatus] = useState(params.status);
	const [qty, setQty] = useState(params.qty);
	const [locationList, setLocationList] = useState([]);
	const [typeList, setTypeList] = useState([]);
	const [isPickerShow, setIsPickerShow] = useState(false);
	const [date, setDate] = useState(new Date());
	const [purchaseDate, setPurchaseDate] = useState(date);
	const [visible1, setVisible1] = useState(false);
	const [selectedImage, setSelectedImage] = useState({
		id: "",
		filename: '',
	});
	const [isVisible, setIsVisible] = useState(false);
	const [isVisibleStatus, setIsVisibleStatus] = useState(false);
	const [isVisibleType, setIsVisibleType] = useState(false);

	const fetchDefaultDate = async () => {
		const defaultDate = params.purchase_date ? new Date(params.purchase_date) : new Date(); // Example date from the database
		setDate(defaultDate);
	};

	const showPicker = () => {
		setIsPickerShow(true);
	};

	const onChange = (event, selectedDate) => {
		setIsPickerShow(false);
		if (selectedDate) {
			setDate(selectedDate); // Update state with the selected date
		}
	};

	const viewImage = (id, filename) => {
		setVisible1(!visible1);
		setSelectedImage({ id: id, filename: filename });
	}

	const updateAsset = () => {
		setLoading(true);
		let dataToSend = { name: name, description: description, price: price, purchaseDate: date, location: location, id: params.id, status: status, created_by: currentUserData.id, qty: qty, type: type };
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
		{ value: "Active", label: "Active", icon: 'control-play', color: 'green' },
		{ value: "Idle", label: "Idle", icon: 'control-pause', color: 'blue' },
		{ value: "Under Repair", label: "Under Repair", icon: 'wrench', color: 'orange' },
		{ value: "Retired/Disposed", label: "Retired/Disposed", icon: 'trash', color: 'red' },
	]

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

	const getTypeList = () => {
		setLoading(true)
		fetch(global.url + 'getTypeDropdown.php', {
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
				setTypeList(responseJson?.data);
			})
			.catch((error) => {
				alert(error);
				setLoading(false);
				console.error(error);
			});
	}



	const preSelectLocation = async () => {
		const selectedLocation = locationList.find((location) => location.value === params.original_location);
		if (selectedLocation) {
			setLocationName(selectedLocation.label); // Set the label to populate the text field
		}
	}

	const preSelectType = async () => {
		const selectedType = typeList.find((type) => type.value === params.type_id);
		if (selectedType) {
			setTypeName(selectedType.label); // Set the label to populate the text field
		}
	}

	const onSelectLocation = (location) => {
		console.log("location", location)
		setLocation(location.value)
		setLocationName(location.label)
		setIsVisible(!isVisible);
	}

	const onSelectType = (type) => {
		setType(type.value)
		setTypeName(type.label)
		setIsVisibleType(!isVisibleType);
	}

	const onSelectStatus = (status) => {
		setStatus(status)
		setIsVisibleStatus(!isVisibleStatus);
	}

	useEffect(() => {
		getTypeList();
		getLocationDropdown();
		fetchDefaultDate();
	}, [])

	useEffect(() => {
		preSelectLocation();
	}, [locationList, location])

	useEffect(() => {
		preSelectType();
	}, [typeList, type])

	return (
		<ScrollView style={{ backgroundColor: 'white' }}>
			<View style={{ padding: 5 }}>
				<Overlay isVisible={isVisible} onBackdropPress={() => setIsVisible(!isVisible)} overlayStyle={{ height: '50%', width: '80%' }}>
					<Text>Select Location</Text>
					<ScrollView>
						{locationList?.map((item, index) => {
							return (
								<ListItem key={index} bottomDivider style={{ height: 'auto' }} onPress={() => onSelectLocation(item)}>
									<Icon name="location-pin" type="simple-line-icon" size={15} />
									<ListItem.Content >
										<ListItem.Title style={{ fontSize: 14 }}>{item.label || "No name"}</ListItem.Title>
									</ListItem.Content>
								</ListItem>
							)
						})}
					</ScrollView>
				</Overlay>
				<Overlay isVisible={isVisibleStatus} onBackdropPress={() => setIsVisibleStatus(!isVisibleStatus)} overlayStyle={{ height: '50%', width: '80%' }}>
					<Text>Select Status</Text>
					<ScrollView>
						{dropdownStatus?.map((item, index) => {
							return (
								<ListItem key={index} bottomDivider style={{ height: 'auto' }} onPress={() => onSelectStatus(item.label)}>
									<Icon name={item.icon} color={item.color} type="simple-line-icon" size={15} />
									<ListItem.Content >
										<ListItem.Title style={{ fontSize: 14 }}>{item.label || "No name"}</ListItem.Title>
									</ListItem.Content>
								</ListItem>
							)
						})}
					</ScrollView>
				</Overlay>
				<Overlay isVisible={isVisibleType} onBackdropPress={() => setIsVisibleType(!isVisibleType)} overlayStyle={{ height: '50%', width: '80%' }}>
					<Text>Select Type</Text>
					<ScrollView>
						{typeList?.map((item, index) => {
							return (
								<ListItem key={index} bottomDivider style={{ height: 'auto' }} onPress={() => onSelectType(item)}>
									<Icon name="flag" type="simple-line-icon" size={15} />
									<ListItem.Content >
										<ListItem.Title style={{ fontSize: 14 }}>{item.label || "No name"}</ListItem.Title>
									</ListItem.Content>
								</ListItem>
							)
						})}
					</ScrollView>
				</Overlay>
				<Input
					label="Asset Code"
					labelStyle={{ ...styles.label, marginTop: 5 }}
					inputContainerStyle={styles.inputContainer}
					inputStyle={{ fontSize: 15 }}
					placeholder={"Enter Text Here"}
					value={params.asset_code}
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
					value={description}
					onChangeText={description => setDescription(description)}
				/>
				<TouchableOpacity
					onPress={() => setIsVisibleType(true)}>
					<Input
						label="Type"
						labelStyle={styles.label}
						inputContainerStyle={styles.inputContainer}
						inputStyle={{ fontSize: 15 }}
						placeholder={"Selecte type"}
						value={typeName}
						editable={false}
					/>
				</TouchableOpacity>
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
					value={price}
					onChangeText={price => setPrice(price)}
					leftIcon={{ type: 'feather', name: 'dollar-sign', size: 16 }}
					keyboardType='numeric'
				/>

				<TouchableOpacity
					onPress={() => setIsVisible(true)}>
					<Input
						label="Location"
						labelStyle={styles.label}
						inputContainerStyle={styles.inputContainer}
						inputStyle={{ fontSize: 15 }}
						placeholder={"Select Location"}
						value={locationName}
						editable={false}
						rightIcon={{ type: 'feather', name: 'chevron-down', size: 15 }}
						leftIcon={{ type: 'feather', name: 'map-pin', size: 15 }}
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
						value={date.toLocaleDateString()}
						editable={false}
						leftIcon={{ type: 'feather', name: 'calendar', size: 16 }}
					/>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setIsVisibleStatus(true)}>
					<Input
						label="Status"
						labelStyle={styles.label}
						inputContainerStyle={styles.inputContainer}
						inputStyle={{ fontSize: 15 }}
						placeholder={"Select Status"}
						value={status}
						editable={false}
						rightIcon={{ type: 'feather', name: 'chevron-down', size: 15 }}
						leftIcon={{ type: 'feather', name: 'activity', size: 15 }}
					/>
				</TouchableOpacity>
				{status == 'Retired/Disposed' &&
					<Input
						label="Reason"
						labelStyle={styles.label}
						inputContainerStyle={styles.inputContainer}
						inputStyle={{ fontSize: 15 }}
						placeholder={"Retired/Disposed Reason"}
						value={status}
						editable={false}
						rightIcon={{ type: 'feather', name: 'chevron-down', size: 15 }}
						leftIcon={{ type: 'feather', name: 'activity', size: 15 }}
					/>
				}
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
								<Text style={{ color: '#000', fontSize: 15, marginLeft: 5 }}>No images available.</Text>
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
							source={{ uri: selectedImage.filename }}
							style={{ width: 280, height: 250, borderRadius: 5, borderWidth: 1, borderColor: 'grey', marginHorizontal: 4 }}
						/>
					</View>
					<Dialog.Actions>
						<Dialog.Button title="Remove" icon="trashcan" onPress={() => console.log('Secondary Action Clicked!')} />
					</Dialog.Actions>
				</Dialog>
				{/* The date picker */}
				{isPickerShow && (
					<DateTimePicker
						value={date}
						mode="date"
						onChange={onChange}
						// style={styles.datePicker}
						format='MM DD YYYY'
					/>
				)}
				<Divider />
				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<Button
						title="Save"
						icon={{
							name: 'check-circle',
							type: 'feather',
							size: 20,
							color: 'white',
						}}
						onPress={() => updateAsset()}
						buttonStyle={{ marginTop: 20 }}
					/>
					<Button
						title="Cancel"

						icon={{
							name: 'x-circle',
							type: 'feather',
							size: 20,
							color: 'white',
						}}
						onPress={() => navigation.goBack()}
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