import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {Card, Title, Paragraph, Divider, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from './Components/loader';
import { useFocusEffect } from '@react-navigation/native';
const UserDetailsScreen = ({route, navigation}) => {

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
		fetch(global.url+'getUserDetails.php', {
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
      <ScrollView style={{padding: 5}}>
        <Card style={{ margin: 2, padding: 5, elevation: 3 }}>
          <Card.Title titleStyle={{textTransform: 'uppercase'}} title={details.firstname+" "+details.middlename+" "+details.lastname}/>
            <Card.Content>
              <Text variant="titleLarge" style={{color: 'black', fontSize: 15}}>ADDRESS: 
                <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}> {details.address}</Text>
              </Text>
              <Text variant="titleLarge" style={{color: 'black', fontSize: 15}}>AGE: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}> {details.age}</Text></Text>
              <Text variant="titleLarge" style={{color: 'black', fontSize: 15}}>ACCESS: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}> {details.access_level}</Text></Text>
              <Text variant="titleLarge" style={{color: 'black', fontSize: 15}}>CONTACT #: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}> {details.contact_number}</Text></Text>
              <Text variant="titleLarge" style={{color: 'black', fontSize: 15}}>ADDED BY: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}> {details.created_by}</Text></Text>
              <Text variant="titleLarge" style={{color: 'black', fontSize: 15}}>STATUS: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}> {details.status}</Text></Text>
            </Card.Content>
            <Card.Actions style={{justifyContent: 'flex-end', marginTop: 10}}>
              <Button icon="pencil" mode="contained" style={{marginRight: 5}} onPress={() => navigation.navigate("UpdateUsersScreen", details)}>Update</Button>
              <Button icon="delete" color="red" mode="contained">Delete</Button>
            </Card.Actions>
        </Card>
    </ScrollView>
    )  
};
 
export default UserDetailsScreen;