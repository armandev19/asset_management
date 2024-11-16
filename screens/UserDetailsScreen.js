import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, StyleSheet} from 'react-native';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';
import Loader from './Components/loader';
import { useFocusEffect } from '@react-navigation/native';
import { Input, Icon, BottomSheet, ListItem, Dialog, Button } from '@rneui/themed';
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
			headers: { "bypass-tunnel-reminder": "true",
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

  const statusColor = details.status === 'Active' ? "green" : "red";

    return (
      <ScrollView style={{padding: 5, backgroundColor: '#fff'}}>
        <Card style={{ margin: 2, padding: 5, elevation: 3, backgroundColor: '#fff' }}>
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
              {/* <View style={{flexDirection: 'row', marginBottom: 3}}>
                <Text style={styles.col_title}>Added by </Text>
                <Text style={styles.col_content}>{details.created_by ? details.created_by : 'N/A'}</Text>
              </View> */}
              <View style={{flexDirection: 'row', marginBottom: 3}}>
                <Text style={styles.col_title}>Status </Text>
                <Text style={{...styles.col_content, color: statusColor}}>
                  {details.status ? details.status : 'N/A'}</Text>
              </View>
            </Card.Content>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginVertical: 10, marginHorizontal: 10}}>
              <Button 
                title="Cancel"  
                icon={{
                  name: 'close',
                  type: 'simple-line-icon',
                  size: 20,
                  color: 'white',
                }} 
                buttonStyle={{ backgroundColor: 'rgba(214, 61, 57, 1)', borderRadius: 5, marginRight: 10}}
                onPress={() => navigation.goBack()}
              />
              <Button 
                  title="Update"  
                  icon={{
                    name: 'pencil',
                    type: 'simple-line-icon',
                    size: 20,
                    color: 'white',
                  }} 
                  buttonStyle={{ borderRadius: 5 }}
                  onPress={() => navigation.navigate("UpdateUsersScreen", details)}
              />
            </View>
        </Card>
    </ScrollView>
    )  
};
 
const styles = StyleSheet.create({ 
  col_title: {color: '#73706e', width: '45%', fontSize: 16, fontWeight: '400', fontFamily: 'Roboto'},
  col_content: {
    color: '#000', 
    fontSize: 16, 
    width: '55%', 
    textAlign: 'right', 
    fontFamily: 'Roboto'
  }
})
export default UserDetailsScreen;