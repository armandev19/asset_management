import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput} from 'react-native';
import {Card, Title, Paragraph, Divider, Button} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

const AssetDetailsScreen = ({navigation, route}) => {
  
  const params = route.params;
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
      setAssetDetails(responseJson.data[0]);
			setLoading(false);
		})
		.catch((error) => {
			setLoading(false);
		});
	}

  useFocusEffect(
    React.useCallback(() => {
      getAssetDetails();
    }, []),
  );
  return (
		<ScrollView style={{padding: 5}}>
    <Card style={{ margin: 2, padding: 5, elevation: 3 }}>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Title titleStyle={{textTransform: 'uppercase'}} title={details.asset_code +" | "+details.asset_name} subtitle={"Description: " + details.asset_description}  />
        <Card.Content>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 2}}></View>
              <View style={{flex: 1, padding: 3, backgroundColor: '#2eb82e', flexDirection: 'row', borderRadius: 5, justifyContent: 'center'}}>
                <Icon name='check-circle' size={13} color={'#ffffff'} ></Icon>
                <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> OPERATIONAL</Text>
              </View>
            </View>
            <Text variant="titleLarge" style={{color: 'black'}}>Original Location: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.name ? details.name : 'N/A'}</Text></Text>
            <Text variant="titleLarge" style={{color: 'black'}}>Current Location: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.curr_loc ? details.curr_loc : 'N/A'}</Text></Text>
            <Text variant="titleLarge" style={{color: 'black'}}>Original Price: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.original_price ? details.original_price : 'N/A'}</Text></Text>
            <Text variant="titleLarge" style={{color: 'black'}}>Current Price: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.current_price ? details.current_price : 'N/A'}</Text></Text>
            <Text variant="titleLarge" style={{color: 'black'}}>Purchased Date: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.purchase_date ? details.purchase_date : 'N/A'}</Text></Text>
            <Text variant="titleLarge" style={{color: 'black'}}>Added By: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}>{details.access_level ? details.access_level : 'N/A'}</Text></Text>
            
            {/* <View style={{alignSelf: 'center', marginVertical: 20}}>
            <QRCode size={200}
              value={details.asset_code}
            />
            </View> */}
        </Card.Content>
        <Card.Actions style={{justifyContent: 'flex-end', marginTop: 20}}>
          <Button icon="cog" color="#348ceb" mode="contained" style={{marginRight: 5}} onPress={() => navigation.navigate("AssetMaintenanceScreen", details.id)}>Maintenance</Button>
          <Button icon="pencil" mode="contained" style={{marginRight: 5}} onPress={() => navigation.navigate("UpdateAssetScreen", details.id)}>Update</Button>
          <Button icon="delete" color="red" mode="contained">Delete</Button>
        </Card.Actions>
    </Card>
    </ScrollView>
  )
};
 
export default AssetDetailsScreen;