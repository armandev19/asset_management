import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image} from 'react-native';
import {Card, Title, Paragraph, Divider, Button, Modal, FAB, Portal} from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

const AssetDetailsScreen = ({navigation, route}) => {
  const params = route.params;
  const [details, setAssetDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const [open, setOpen] = useState(false);
  const onStateChange = ({ open }) => setOpen(open);
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
      console.log("responseJson", responseJson)
		})
		.catch((error) => {
      console.log("error", error)
			setLoading(false);
		});
	}

  useEffect(()=>{
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getAssetDetails();
    }, []),
  );

  return (
      <ScrollView style={{}}>
        <Portal>
          {isFocused && (
            <FAB.Group
              open={open}
              style={{ top: 0, right: 0, bottom: 50}}
              containerStyle={{color: 'red'}}
              icon={open ? 'cog' : 'more'}
              color="white"
              fabStyle={{backgroundColor: '#f5571d'}}
              actions={[
                {
                  icon: 'qrcode-scan',
                  label: 'QR Code',
                  labelTextColor: '#fff',
                  labelStyle: { backgroundColor: '#f5571d'},
                  style: { backgroundColor: '#f5571d' },
                  onPress: () => setModalVisible(true),
                },
                {
                  icon: 'wrench',
                  label: 'Maintenance',
                  labelTextColor: '#fff',
                  labelStyle: { backgroundColor: '#f5571d'},
                  style: { backgroundColor: '#f5571d' },
                  onPress: () => navigation.navigate("AssetMaintenanceScreen", details),
                },
                {
                  icon: 'pencil',
                  label: 'Update',
                  labelTextColor: '#fff',
                  labelStyle: { backgroundColor: '#f5571d'},
                  style: { backgroundColor: '#f5571d' },
                  onPress: () => navigation.navigate("UpdateAssetScreen", details),
                },
              ]}
              
              onStateChange={onStateChange}
            />
          )}
        </Portal>
      <View style={{ marginHorizontal: 10, marginVertical: 10, padding: 5, marginBottom: 10}}>
        <View style={{ borderWidth: 0.5, borderColor: 'gray', marginBottom: 5, elevation: 2}}>
          <Image
            source={require('../assets/amslogo.png')}
            style={{width: 100, height: 100, alignSelf: 'center', borderRadius: 5}}
          />
        </View>
        <View style={{flexDirection: 'row', marginBottom: 3}}>
          <Text style={styles.col_title}>Asset Code </Text>
          <Text style={styles.col_content}>{details.asset_code ? details.asset_code : 'N/A'}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 3}}>
          <Text style={styles.col_title}>Description </Text>
          <Text style={styles.col_content}>{details.asset_description ? details.asset_description : 'N/A'}</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 3}}>
          <Text style={styles.col_title}>Qty </Text>
          <Text style={styles.col_content}>{details.qty ? details.qty : 'N/A'}</Text>
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
        </View>
        
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
  col_title: {color: '#73706e', width: '45%', fontSize: 16, fontWeight: '400', fontFamily: 'Roboto'},
  col_content: {color: '#000', textTransform: 'uppercase', fontSize: 16, width: '55%', textAlign: 'right', fontFamily: 'Roboto'}
});