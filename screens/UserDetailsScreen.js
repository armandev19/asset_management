import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Divider, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from './Components/loader';
import { useFocusEffect } from '@react-navigation/native';
const UserDetailsScreen = ({navigation, route}) => {

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
        <Card style={{ margin: 2, padding: 5, elevation: 3,backgroundColor: '#fff' }}>
          <Card.Title titleStyle={{textTransform: 'uppercase', color: "#000"}} title={details.firstname+" "+details.middlename+" "+details.lastname}/>
            <Card.Content style={{backgroundColor: '#fff'}}>
              <View style={{flexDirection: 'row', marginBottom: 3}}>
                <Text style={styles.col_title}>Address </Text>
                <Text style={styles.col_content}>{details.address ? details.address : 'N/A'}</Text>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 3}}>
                <Text style={styles.col_title}>Access </Text>
                <Text style={styles.col_content}>{details.access_level ? details.access_level : 'N/A'}</Text>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 3}}>
                <Text style={styles.col_title}>Contact # </Text>
                <Text style={styles.col_content}>{details.contact_number ? details.contact_number : 'N/A'}</Text>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 3}}>
                <Text style={styles.col_title}>Added by </Text>
                <Text style={styles.col_content}>{details.created_by ? details.created_by : 'N/A'}</Text>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 3}}>
                <Text style={styles.col_title}>Status </Text>
                <Text style={styles.col_content}>{details.status ? details.status : 'N/A'}</Text>
              </View>
            </Card.Content>
            <Card.Actions style={{justifyContent: 'flex-end', marginTop: 10}}>
              <Button icon="pencil" mode="contained" style={{marginRight: 5}} onPress={() => navigation.navigate("UpdateUsersScreen", details)}>Update</Button>
              <Button icon="delete" color="red" mode="contained">Delete</Button>
            </Card.Actions>
        </Card>
    </ScrollView>
    )  
};
 
const styles = StyleSheet.create({ 
  col_title: {color: '#73706e', width: '45%', fontSize: 16, fontWeight: '400', fontFamily: 'Roboto'},
  col_content: {color: '#000', textTransform: 'uppercase', fontSize: 16, width: '55%', textAlign: 'right', fontFamily: 'Roboto'}
})
export default UserDetailsScreen;