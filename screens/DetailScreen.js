import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, TextInput, Button} from 'react-native';
import {Card, Title, Paragraph, Divider} from 'react-native-paper';
import Loader from './Components/loader';
import { selectUserData, setUserData } from './redux/navSlice';
import { useSelector } from 'react-redux';
import Moment from 'moment';

const DetailScreen = ({route, navigation}) => {
  
  const currentUserData = useSelector(selectUserData);
  const params = route.params
  
  const [loading, setLoading] = useState(false);
  const [donated_qty, setDonatedQty] = useState('');
  const [updatedData, setUpdatedData] = useState({});
  const [remainingQty, setRemainingQty] = useState('');

  const saveDonation = () => {
    let dataToSend = {donated_qty: donated_qty, bld_request_number: params.request_number, donator: currentUserData.id};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    setLoading(true);
    fetch(global.url+'insertDonation.php', {
      method: 'POST',
      body: formBody,
      headers: { "bypass-tunnel-reminder": "true",
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }).then((response) => response.text())
      .then((responseJson) => {
        alert(responseJson);
        setLoading(false);
        if (responseJson.status === 'success') {
          alert("Donation successful!");
        } else {
          alert("Donation failed!");
        }
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
        console.error(error);
      });
  }

  const getUpdatedBloodRequest = () => {
    let dataToSend = {request_number: params.request_number};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    setLoading(true);
    fetch(global.url+'fetchBloodRequestData.php', {
      method: 'POST',
      body: formBody,
      headers: { "bypass-tunnel-reminder": "true",
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        setRemainingQty(responseJson.remaining_qty)
        setUpdatedData(responseJson.data);
        console.log(responseJson.data);
      })
      .catch((error) => {
        alert(error);
        console.error(error);
      });
  }
  
  useEffect(() => {
    getUpdatedBloodRequest();
    
    console.log("updated"+updatedData.remaining_qty);
  }, [])

  if(params.status === 'Approved'){
    return (
      <SafeAreaView style={{ padding: 10}}>
        <View style={{backgroundColor: '#edebeb', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 10}}>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Request #:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.request_number} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Needed Qty:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.qty}  </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Remaining Qty:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {remainingQty} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Date Needed:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.date_needed} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Purpose:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.purpose} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Status:</Text>
            <Text style={{color: 'green', fontWeight: 'bold'}}> {params.status} </Text>
          </Text>
          <TextInput 
            placeholder='Enter quantity to donate' 
            placeholderTextColor="black"
            keyboardType="numeric"
            onChangeText={(donated_qty) => setDonatedQty(donated_qty)}
            style={{ color: 'black', fontSize: 20, borderColor: 'black', borderWidth: 1, borderRadius: 5, backgroundColor: 'white', marginTop: 20, marginBottom: 10 }} 
          />
          <Button title="Save" style={{ alignContents: "center"}} onPress={()=>saveDonation()}></Button>
        </View>
      </SafeAreaView>
    )
  }else{
    return (
      <SafeAreaView style={{padding: 10}}>
        <View style={{backgroundColor: '#edebeb', borderColor: "#cfcccc", borderWidth: 1, borderRadius: 5, padding: 10}}>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Request #:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.request_number} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Qty:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.qty} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Date Needed:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.date_needed} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Purpose:</Text>
            <Text style={{color: 'black', fontWeight: 'bold'}}> {params.purpose} </Text>
          </Text>
          <Text style={{fontSize: 20}}>
            <Text style={{color: '#030000'}}>Status:</Text>
            <Text style={{color: 'orange', fontWeight: 'bold'}}> {params.status} </Text>
          </Text>
          {/* <Button title="Save" style={{ alignContents: "center"}}></Button> */}
        </View>
      </SafeAreaView>
    )  
  }
};
 
export default DetailScreen;