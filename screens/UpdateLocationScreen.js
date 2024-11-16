import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { Card, Title, Paragraph, Divider, IconButton } from 'react-native-paper';
import {
	DefaultTheme,
	Provider,
} from "react-native-paper";

import { Input, Icon, BottomSheet, ListItem, Dialog, Button, Overlay } from '@rneui/themed';

const UpdateLocationScreen = ({ route, navigation }) => {

	const params = route.params;
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');
	const [address, setAddress] = useState('');

	const updateLocation = () => {
		setLoading(true);
		let dataToSend = { name: name, address: address, id: params };
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url + 'updateLocation.php', {
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
				setTimeout(function(){
					navigation.goBack();
				}, 1500)
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
		fetch(global.url + 'getLocationDetails.php', {
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
				setLoading(false);
				setName(responseJson.data[0].name);
				setAddress(responseJson.data[0].address);
			})
			.catch((error) => {
				setLoading(false);
			});
	}

	useEffect(() => {
		getAssetDetails();
	}, [])


	return (
		<Provider theme={DefaultTheme} >
			<View style={{ padding: 10 }}>
				<Card style={{ heigt: '100%', }}>
					<Card.Content style={{ marginTop: 20 }}>
						<Input
							label="Name"
							labelStyle={styles.label}
							inputContainerStyle={{ ...styles.inputContainer }}
							inputStyle={{ fontSize: 15 }}
							placeholder={"Example location"}
							value={name}
							onChangeText={name => setName(name)}
						/>
						<Input
							label="Location"
							labelStyle={styles.label}
							inputContainerStyle={{ ...styles.inputContainer }}
							inputStyle={{ fontSize: 15 }}
							placeholder={"Example location"}
							value={address}
							onChangeText={address => setAddress(address)}
						/>

					</Card.Content>
					<View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginHorizontal: 10, marginBottom: 20 }}>
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
							onPress={() => updateLocation()}
						/>
					</View>
				</Card>
			</View>
		</Provider>
	)
};

export default UpdateLocationScreen;

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
});