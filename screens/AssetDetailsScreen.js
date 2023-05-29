import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput} from 'react-native';
import {Card, Title, Paragraph, Divider, Button} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

const AssetDetailsScreen = ({route, navigation}) => {
  
  const params = route.params
  const [details, setAssetDetails] = useState([]);
  const [loading, setLoading] = useState(false);

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
      console.log(responseJson)
      setAssetDetails(responseJson.data[0]);
			setLoading(false);
		})
		.catch((error) => {
			setLoading(false);
		});
	}

  useEffect(()=>{
    getAssetDetails();
  }, [])


  return (
		<ScrollView style={{padding: 10}}>
    <Card>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Title title={details.asset_name} subtitle={"Description: " + details.asset_description}  />
        <Card.Content>
            <Text variant="titleLarge" style={{color: 'black', textTransform: 'uppercase'}}>Original Location: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.asset_code ? details.asset_code : 'N/A'}</Text></Text>
            <Text variant="titleLarge" style={{color: 'black', textTransform: 'uppercase'}}>Original Location: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.name ? details.name : 'N/A'}</Text></Text>
            <Text variant="titleLarge" style={{color: 'black', textTransform: 'uppercase'}}>Current Location: {details.name ? details.name : 'N/A'}</Text>
            <Text variant="titleLarge" style={{color: 'black', textTransform: 'uppercase'}}>Original Price: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.original_price ? details.original_price : 'N/A'}</Text></Text>
            <Text variant="titleLarge" style={{color: 'black', textTransform: 'uppercase'}}>Current Price: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.current_price ? details.current_price : 'N/A'}</Text></Text>
            <Text variant="titleLarge" style={{color: 'black', textTransform: 'uppercase'}}>Purchased Date: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.purchase_date ? details.purchase_date : 'N/A'}</Text></Text>
            <Text variant="titleLarge" style={{color: 'black', textTransform: 'uppercase'}}>Added By: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.access_level ? details.access_level : 'N/A'}</Text></Text>
            <Text variant="titleLarge" style={{color: 'black', textTransform: 'uppercase'}}>Status: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.status ? details.status : 'N/A'}</Text></Text>
            <View style={{alignSelf: 'center', marginVertical: 20}}>
            <QRCode size={200}
              value={details.asset_code}
            />
            </View>
        </Card.Content>
        <Card.Actions style={{justifyContent: 'flex-end'}}>
          <Button icon="pencil" mode="contained" style={{marginRight: 5}} onPress={() => navigation.navigate("UpdateAssetScreen", details.id)}>Update</Button>
          <Button icon="delete" color="red" mode="contained">Archive</Button>
        </Card.Actions>
    </Card>
    </ScrollView>
  )
};
 
export default AssetDetailsScreen;