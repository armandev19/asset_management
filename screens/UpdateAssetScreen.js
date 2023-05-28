import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {Card, Title, Paragraph, Divider, Button, TextInput, IconButton} from 'react-native-paper';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import Moment from 'moment';

const UpdateAssetScreen = ({route, navigation}) => {
  
  const params = route.params
  const [details, setAssetDetails] = useState([]);
  const [loading, setLoading] = useState(false);
	
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [price, setPrice] = useState('');
	const [status, setStatus] = useState('');

	const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

	const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    setIsPickerShow(false);
  };

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
			// console.log(responseJson)
      setAssetDetails(responseJson.data[0]);
			setLoading(false);
		})
		.catch((error) => {
			setLoading(false);
		});
	}

  useEffect(()=>{
    getAssetDetails();
    console.log(details)
  }, [])


  return (
		
    <Card>
      <Card.Content style={{heigt: '100%'}}>
				<TextInput
					style={{width: '100%'}}
					theme={{ roundness: 20 }}
					mode="outlined"
					label="Name"
					activeOutlineColor='#348ceb'
					value={name}
					onChangeText={name => setName(name)}
				/>
				<TextInput
					style={{width: '100%'}}
					theme={{ roundness: 20 }}
					mode="outlined"
					label="Description"
					activeOutlineColor='#348ceb'
					value={name}
					onChangeText={name => setName(name)}
				/>
				<TextInput
					style={{width: '100%'}}
					theme={{ roundness: 20 }}
					mode="outlined"
					label="Original Location"
					activeOutlineColor='#348ceb'
					value={description}
					onChangeText={description => setDescription(description)}
				/>
				<TextInput
					style={{width: '100%'}}
					theme={{ roundness: 20 }}
					mode="outlined"
					label="Price"
					activeOutlineColor='#348ceb'
					value={name}
					onChangeText={name => setName(name)}
				/>
				<TextInput
					style={{width: '100%'}}
					theme={{ roundness: 20 }}
					mode="outlined"
					label="Status"
					activeOutlineColor='#348ceb'
					value={name}
					onChangeText={name => setName(name)}
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
						theme={{ roundness: 20 }}
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
      
      <Card.Actions style={{justifyContent: 'flex-end'}}>
        <Button icon="check" mode="contained" style={{marginRight: 5}}>Save</Button>
      </Card.Actions>
    </Card>
  )
};
 
export default UpdateAssetScreen;