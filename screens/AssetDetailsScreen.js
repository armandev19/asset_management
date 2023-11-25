import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import {Card, Title, Paragraph, Divider, Button, Modal} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from '@react-navigation/native';

const AssetDetailsScreen = ({navigation, route}) => {
  
  const params = route.params;
  const [details, setAssetDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
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
      console.log('details', route.params)
		})
		.catch((error) => {
			setLoading(false);
		});
	}

  // useEffect(()=>{
  //   getAssetDetails();
  // }, [])
  useFocusEffect(
    React.useCallback(() => {
      getAssetDetails();
    }, []),
  );


  //danger #fc4747
  //primary #
  //secondary #348ceb
  //success #41e85a
  return (
		<ScrollView style={{ paddingBottom: 20}}>
    <Card style={{ marginHorizontal: 10, marginVertical: 10, padding: 5, marginBottom: 10, elevation: 3, height: '100%', borderRadius: 10, elevation: 5 }}>
      <Card.Cover style={{marginTop: 3}} source={{ uri: 'https://picsum.photos/700' }} />
        <Card.Title titleStyle={{textTransform: 'uppercase'}} title={details.asset_name}/>
        <Card.Content style={{backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={styles.col_title}>Asset Code </Text>
              <Text style={styles.col_content}>{details.asset_code ? details.asset_code : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={styles.col_title}>Description </Text>
              <Text style={styles.col_content}>{details.asset_description ? details.asset_description : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={styles.col_title}>Original Location </Text>
              <Text style={styles.col_content}>{details.name ? details.name : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={styles.col_title}>Current Location </Text>
              <Text style={styles.col_content}>{details.name ? details.name : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={styles.col_title}>Original Price </Text>
              <Text style={styles.col_content}>{details.original_price ? details.original_price : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={styles.col_title}>Current Price </Text>
              <Text style={styles.col_content}>{details.current_price ? details.original_price : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={styles.col_title}>Status </Text>
                <View style={{flex: 1, alignItems: "flex-end"}}>
                {details.status === 'Operational' ? 
                 <View 
                 style={{flex: 1, padding: 3, backgroundColor: '#2eb82e', flexDirection: 'row', borderRadius: 5, justifyContent: 'center'}}>
                    <Icon name='check-circle' size={13} color={'#ffffff'} ></Icon>
                    <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> {details.status ? details.status : 'N/A'}</Text>
                  </View>
                : details.status === 'Under Repair' ? 
                <View 
                style={{flex: 1, padding: 3, backgroundColor: '#ffcc00', flexDirection: 'row', borderRadius: 5, justifyContent: 'center'}}>
                    <Icon name='check-circle' size={13} color={'#ffffff'} ></Icon>
                    <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> {details.status ? details.status : 'N/A'}</Text>
                  </View>
                :  
                <View 
                 style={{flex: 1, padding: 3, backgroundColor: '#fc4747', flexDirection: 'row', borderRadius: 5, justifyContent: 'center'}}>
                  <Icon name='check-circle' size={13} color={'#ffffff'} ></Icon>
                  <Text adjustsFontSizeToFit style={{ color: '#ffffff', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2}}> {details.status ? details.status : 'N/A'}</Text>
                </View>
              }
                
              </View>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={styles.col_title}>Purchased Date </Text>
              <Text style={styles.col_content}>{details.purchase_date ? details.purchase_date : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 3}}>
              <Text style={styles.col_title}>Added by</Text>
              <Text style={styles.col_content}>{details.access_level ? details.access_level : 'N/A'}</Text>
            </View>
          <View style={{marginTop: 40, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity 
                  style={{
                    backgroundColor: '#348ceb',
                    width: '45%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 35,
                    borderRadius: 10,
                    elevation: 5
                  }}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={{color: "#fff", fontSize: 16, fontWeight: '500'}}>
                    <Icon name='qrcode' size={18} color={'#ffffff'} ></Icon> QR CODE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{
                    backgroundColor: '#348ceb',
                    width: '45%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 35,
                    borderRadius: 10,
                    elevation: 5
                  }}
                  onPress={() => navigation.navigate("AssetMaintenanceScreen", details)}
                >
                  <Text style={{color: "#fff", fontSize: 16, fontWeight: '500'}}>
                    <Icon name='cog' size={18} color={'#ffffff'} ></Icon> MAINTENANCE
                  </Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <TouchableOpacity 
                  style={{
                    backgroundColor: '#53d769',
                    width: '45%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 35,
                    borderRadius: 10,
                    elevation: 5
                  }}
                  onPress={() => navigation.navigate("UpdateAssetScreen", details)}
                >
                  <Text style={{color: "#fff", fontSize: 16, fontWeight: '500'}}>
                    <Icon name='refresh' size={18} color={'#ffffff'} ></Icon> UPDATE</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={{
                    backgroundColor: '#fc3d39',
                    width: '45%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 35,
                    borderRadius: 10,
                    elevation: 5
                  }}
                  onPress={() => navigation.navigate("AssetMaintenanceScreen", details.id)}
                >
                  <Text style={{color: "#fff", fontSize: 16, fontWeight: '500'}}>
                    <Icon name='delete' size={18} color={'#ffffff'} ></Icon> DELETE
                  </Text>
                </TouchableOpacity>
            </View>
            
            
          </View>
        </Card.Content>
        {/* <Card.Actions style={{justifyContent: 'flex-end', marginTop: 100}}>
          <Button icon="cog" color="#348ceb" mode="contained" style={{marginRight: 5}} onPress={() => navigation.navigate("AssetMaintenanceScreen", details.id)}>Maintenance</Button>
          <Button icon="pencil" mode="contained" style={{marginRight: 5}} onPress={() => navigation.navigate("UpdateAssetScreen", details.id)}>Update</Button>
          <Button icon="delete" color="red" mode="contained">Delete</Button>
        </Card.Actions> */}
    </Card>

      <Modal
        animationType="fade"
        transparent={true}
        centeredView={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <KeyboardAvoidingView enabled style={styles.modalView}>
            <View style={{padding: 10}}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: '#404040', fontSize: 20, fontWeight: 'bold'}}>{details.asset_code}</Text>
              </View>
              <View style={{alignSelf: 'center', marginTop: 10}}>
                <QRCode size={300}
                  value={details.asset_code}
                />
              </View>
            </View>
            <Button icon="close" compact="true" mode="contained" style={{marginTop: 10}} onPress={() => setModalVisible(false)}><Text>Close</Text></Button>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </ScrollView>
  )
};
 
export default AssetDetailsScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: 450,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  col_title: {color: '#000000', width: '45%', fontSize: 16, fontWeight: '400', fontFamily: 'Roboto'},
  col_content: {color: '#000', textTransform: 'uppercase', fontSize: 16, width: '55%', textAlign: 'right', fontFamily: 'Roboto'}
});