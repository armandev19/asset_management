import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {Card, Title, Paragraph, Divider, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from './Components/loader';
import { useFocusEffect } from '@react-navigation/native';
const ViewNotifScreen = ({route, navigation}) => {

  const [details, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUserDetails = () => {
    setLoading(true);
		let dataToSend = { id: route.params };
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url+'getNotificationDetails.php', {
			method: 'POST',
			body: formBody,
			headers: {
				'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8',
			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
      setUserDetails(responseJson.data[0]);
			setLoading(false);
      console.log("rawr", responseJson);
		})
		.catch((error) => {
			setLoading(false);
      console.log("rawr");
		});
	}
  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
    }, []),
  );

    return (
      <View style={{padding: 10}}>
        <View>
            <Text style={{color: 'black', fontWeight: 'bold'}}>{details.title}</Text>
            <Text style={{color: 'black'}}>{details.body}</Text>
        </View>
    </View>
    )  
};
 
export default ViewNotifScreen;