import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, Dimensions} from 'react-native';
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
		<ScrollView style={{padding: 10}}>
    <Card style={{ margin: 2, padding: 5, marginBottom: 10, elevation: 3, height: 730, borderRadius: 10 }}>
      <Card.Cover style={{marginTop: 3}} source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Title titleStyle={{textTransform: 'uppercase'}} title={details.asset_name}/>
        <Card.Content>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{color: '#5c5c5c', width: '45%',fontSize: 17, fontWeight: 'bold'}}>CODE </Text><Text style={{color: '#5c5c5c', textTransform: 'uppercase', fontSize: 17, width: '55%', textAlign: 'right'}}>{details.asset_code ? details.asset_code : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{color: '#5c5c5c', width: '45%',fontSize: 17, fontWeight: 'bold'}}>ORIGINAL LOCATION </Text><Text style={{color: '#5c5c5c', textTransform: 'uppercase', fontSize: 17, width: '55%', textAlign: 'right'}}>{details.name ? details.name : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{color: '#5c5c5c', width: '45%',fontSize: 17, fontWeight: 'bold'}}>CURRENT LOCATION </Text><Text style={{color: '#5c5c5c', textTransform: 'uppercase', fontSize: 17, width: '55%', textAlign: 'right'}}>{details.name ? details.name : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{color: '#5c5c5c', width: '45%', fontSize: 17, fontWeight: 'bold'}}>ORIGINAL PRICE </Text><Text style={{color: '#5c5c5c', textTransform: 'uppercase', fontSize: 17, width: '55%', textAlign: 'right'}}>{details.curr_loc ? details.curr_loc : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{color: '#5c5c5c', width: '45%', fontSize: 17, fontWeight: 'bold'}}>CURRENT PRICE </Text><Text style={{color: '#5c5c5c', textTransform: 'uppercase', fontSize: 17, width: '55%', textAlign: 'right'}}>{details.original_price ? details.original_price : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{color: '#5c5c5c', width: '60%', fontSize: 17, fontWeight: 'bold'}}>STATUS </Text>
              <View style={{flex: 1, padding: 3, backgroundColor: '#2eb82e', flexDirection: 'row', borderRadius: 5, justifyContent: 'center', width: '40%',}}>
                <Icon name='check-circle' size={13} color={'#ffffff'} ></Icon>
                <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> OPERATIONAL</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{color: '#5c5c5c', width: '45%', fontSize: 17, fontWeight: 'bold'}}>PURCHASED DATE </Text><Text style={{color: '#5c5c5c', textTransform: 'uppercase', fontSize: 17, width: '55%', textAlign: 'right'}}>{details.purchase_date ? details.purchase_date : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={{color: '#5c5c5c', width: '45%', fontSize: 17, fontWeight: 'bold'}}>ADDED BY </Text><Text style={{color: '#5c5c5c', textTransform: 'uppercase', fontSize: 17, width: '55%', textAlign: 'right'}}>{details.access_level ? details.access_level : 'N/A'}</Text>
            </View>
          <View>
            <Button icon="qrcode" color="#348ceb" mode="contained" style={{marginTop: 60}} onPress={() => navigation.navigate("AssetMaintenanceScreen", details.id)}>QR Code</Button>
            <Button icon="cog" color="#348ceb" mode="contained" style={{marginTop: 10}} onPress={() => navigation.navigate("AssetMaintenanceScreen", details.id)}>Maintenance</Button>
            <Button icon="pencil" mode="contained" style={{marginTop: 10}} onPress={() => navigation.navigate("UpdateAssetScreen", details.id)}>Update</Button>
            <Button icon="delete" color="red" mode="contained"style={{marginTop: 10}} >Delete</Button>
          </View>
        </Card.Content>
        {/* <Card.Actions style={{justifyContent: 'flex-end', marginTop: 100}}>
          <Button icon="cog" color="#348ceb" mode="contained" style={{marginRight: 5}} onPress={() => navigation.navigate("AssetMaintenanceScreen", details.id)}>Maintenance</Button>
          <Button icon="pencil" mode="contained" style={{marginRight: 5}} onPress={() => navigation.navigate("UpdateAssetScreen", details.id)}>Update</Button>
          <Button icon="delete" color="red" mode="contained">Delete</Button>
        </Card.Actions> */}
    </Card>
    </ScrollView>
  )
};
 
export default AssetDetailsScreen;