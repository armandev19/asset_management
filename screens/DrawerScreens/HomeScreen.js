import React, {useEffect, useState, useRef} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectFCMToken, selectUserData, setUserData } from '../redux/navSlice';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Components/loader';
import axios from 'axios';
import { Dimensions } from "react-native";
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import {LineChart, BarChart, PieChart} from 'react-native-charts-wrapper';
import { processColor } from 'react-native-reanimated';
import DropDown from 'react-native-paper-dropdown';
import { Button, Modal, Provider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import SendSMS from 'react-native-sms'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({navigation, props}) => {
  // const [userData, setUserData] = useState({});
  const [users, setUsers] = useState({});
  const currentUserData = useSelector(selectUserData);
  const fbKey = useSelector(selectFCMToken);
  const [loading, setLoading] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const [newAssets, setNewAssets] = useState(0);
  const [operationalAssets, setOperationalAssets] = useState(0);
  const [forMaintenanceAssets, setForMaintenanceAssets] = useState(0);
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [xDataStatus, setXDataStatus] = useState([]);
  const [yDataStatus, setYDataStatus] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [filter, setFilter] = useState('Today');
  const [filterShow, setFilterShow] = useState(false);
  
  const dispatch = useDispatch();


  const sendSms = () => {
    SendSMS.send({
      body: 'The default body of the SMS!',
      recipients: ['09162970673'],
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true
    }, (completed, cancelled, error) => {

        console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

    });
  }


  const pieData = {
    dataSets: [
      {
        values: [{ value: 35, label: 'A' }, { value: 20, label: 'B' }, { value: 45, label: 'C' }],
        label: '',
        config: {
          colors: [0xff63b2f7, 0xfff78a63, 0xff99ff99],
          valueTextSize: 20,
          valueTextColor: '#000',
          sliceSpace: 5,
          selectionShift: 13,
        },
      },
    ],
  };

  const test = (filter) => {
    let dataToSend = { filter: filter };
    let formBody = [];

    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    
    formBody = formBody.join('&');
    fetch(global.url+'dashboard.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      },
    })
    .then((response) => response.json())
    .then(data => {
      setOperationalAssets(data.operational);
      setNewAssets(data.newAssets);
      setForMaintenanceAssets(data.forMaintenance);
    })
    .catch(error => {
      console.error('Error:', error);
    });
      
  }

  const getNewAssets = () => {
    let dataToSend = { filter: filter };
    let formBody = [];

    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');
    fetch(global.url+'getNewAssetChart.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then(data => {
      setXData(data?.data?.xData);
      setYData(data?.data?.yData);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const serverkey = 'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDaT+j/s+f9pKP7\nObSieH1Z77ENtVlanTl5J/YoeSXR+2nO7IeXhhwhyqZrE9PVpXtCmKhqfQQgevD6\nCM/x6lLBQEl2aLM5PBQgxtpogZvYkHzFLI3R6XoaDrkt4KS3AtWEB9cuGP4aT9JE\nQTYpsao7Q8MsDWZOO3VwHZeZFBn4ilMFtAgMqwxcp2zi1p8qLOoz7tmz6bzFmjjh\nnAUVAjmfQTTyguQq4+r3PJnT4SeDbNKe1JztPrRHYx+Ch1BRBXbnMoT3iaGQOuKV\nP2YXM03wHFo2xZk7CJjgUmr8hpYWZMJPMz2y2vYdeIDEoOqQFfYMhqzo6cgN6GNk\nz+owJh/RAgMBAAECggEAHripEra3+lcdZmCX/VcUWMAku8ed4+UFLfoEJ2zo+BQ3\nrxFVAWszcUPpyF65bDLF1jjSVm3yUznJyH3N+X6el6hazilssyyzrmsdWCCJFGA8\n1qhu6q++6YTR5VVcCI8DCfnqe4ez1nMOJWHB4/sm+AEQqZXXJEI0xAq+ByIvh2x5\nHj5byL9nqIPMrs7pGkLP5wd6qw9uZ3uw1Hg1Z5Yx7W6K0MGrCnPt6gebfBuBkT37\nMhbdG5OIA5lhUb4NAQCtVqg5B1U64AXu+lbNsHRaXnHNPYqW900IPFhd/ExcgJAB\n4Ul6MnzzkBTQ3Chx+v41Uabfouva5foqNo0Wv5+DEwKBgQD6VwZQjZE3D0tEdVdW\nS++w8P3MMmjiIJGQzantqegEpwNmSk8KsthnXdjDBjAZrnV6QO4khBxK34+Alp8n\nu0XimhcO6EU6sj5iLMeC7yyw0ZocK+F4aU7y41w2YGhdWWUa3peUl2qd00Jhmjea\nd6tNUgekh5rn1gCiUGIaao0c8wKBgQDfP4H0iKiKbTpCec4tCSfb9OqmJameNBxe\nvH4NQ7l/OCfQ3pFC7s8r4mhHrR4cdB3R3MuUwONbQleV5Y3I7cAuNg1pDan2mx9E\nyi7pBSHyVB512tGSVuUsF2YIu8C1tTLFutLUl2OTH1sqrBNJT2oNuwg7x7VWHLNT\n2/JOm2lxKwKBgHEvbZR4HWL2kEJYh29mD+5BV46+b/tlXEtLIXxqKJQJ6xiRmmEs\n8XjyznGG17KU1Vq8BrAN5zjXEWvDLhxpqLRGlQxRahOayWfb9Sy29M7RRctc76lg\ne6iHsYaIWkdyhqr6XzB4sWTAQrAcaO13E8V2xCvYf+o4MLsyetiUuk6PAoGAfCzR\n9xdQT/bjcfhYcvplvlXjctj+GK45nYRQxMYH1riAhRBXUhiNCYbcpAmp9v+rWoDq\nh+omTCuBljHiBIIh5FJScT2VbULpSJUBNMGTGTwq2TkGWtSUkkrNiUwNq8SG4i7B\neFhgnYPSbNDbxWozvkFrGf1CYwyBvsJXa9vL8ZMCgYEAySdj7n+r8OrfPinU6O0Y\np1oZ+mwKqZ87uTJtqBviFmJKal6T5Z3qPSI7Wik4R8R+K1Yn009Xl+B673T/m9cL\nyO9vEe2WngRIGBKuYE8g2Wklqo4mhgQRgqGhXzEIrBszr7trpLghQXb0sBORnuRe\niJC7XJwB7wna/UzugPREJHg=';
  
  const sendNotif = () => {
    let dataToSend = { token: serverkey, device_token: fbKey };
    fetch('http://192.168.1.7:5000/asset-maintenance', {
      method: 'POST',
      body: JSON.stringify(dataToSend),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.text())
    .then(data => {
      console.log(data);
    
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const getAssetsByStatus = () => {
    let dataToSend = { filter: filter };
    let formBody = [];

    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }

    formBody = formBody.join('&');
    fetch(global.url+'getAssetsByStatusChart.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .then(data => {
      setXDataStatus(data?.data?.xData);
      setYDataStatus(data?.data?.yData);
    
    })
    .catch(error => {
      console.error('Error:', error);
    });
      
  }

  const handleSelectFilter = (value) => {
    setFilter(value)
  }

  const reports = [
    {value: "Asset", label: "Asset"},
    {value: "Maintenance", label: "Maintenance"},
    {value: "Asset Transfer", label: "Asset Transfer"},
    {value: "Depreciation", label: "Depreciation"},
  ]


  const dataStatus = {
    dataSets: [
      {
        values: yDataStatus,
        label: 'Status',
        config: {
          color: processColor('#2196F3'),
          barSpacePercent: 40,
          barShadowColor: '#BDBDBD',
          highlightAlpha: 90,
          highlightColor: '#000',
        },
      },
    ],
  };

  const data = {
    dataSets: [
      {
        values: [5, 40, 77, 81, 43],
        label: 'Status',
        config: {
          color: processColor('skyblue'),
          barSpacePercent: 10,
          // barShadowColor: '#BDBDBD',
          // highlightAlpha: 90,
          // highlightColor: '#000',
        },
      },
    ],
  };

  const lineData = [{y: 1}, {y: 2}, {y: 3}];

  const xAxis = {
    valueFormatter: xData,
    granularityEnabled: true,
    granularity: 1,
  };

  const yAxis = {
    left: {
      axisMinimum: 0,
    },
  };

  const handleFilterSelect = (value) => {
    setFilter(value);
    setFilterShow(false);
    test(value);
    getAssetsByStatus();
    getNewAssets();
    
  }

  useEffect(()=>{
    getNewAssets();
    getAssetsByStatus();
    test(filter);
  }, [])

  const closeModal = (val) => {
    setFilterShow(val);
  };

  const logout = () => {
    AsyncStorage.removeItem('user_id');
    dispatch(setUserData(null));
  }
  return (
    <Provider>
    <ScrollView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomLeftRadius: 25, borderBottomRightRadius: 25, backgroundColor: '#F05924', height: 60}}>
        <Text style={{color: "white", fontSize: 14, fontWeight: '500', marginTop: 5}}>Welcome {currentUserData?.firstname}</Text>
        <Text style={{color: "white", fontSize: 14, fontWeight: '500', marginTop: 5}}>Sat, July 20</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 15, marginHorizontal: 20}}>
        <View style={{borderColor: "#F05924", borderWidth: 1, borderRadius: 5, width: 150, height: 90, padding: 5, backgroundColor: '#F05924'}}>
          <Text style={{color: "white", fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: 10}} onPress={()=>logout()}>Assets</Text>
          <Text style={{color: "white", fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>{newAssets}</Text>
        </View>
        <View style={{borderColor: "#F05924", borderWidth: 1, borderRadius: 5, width: 150, height: 90, padding: 5, backgroundColor: '#F05924'}}>
          <Text style={{color: "white", fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: 10}}>Operational</Text>
          <Text style={{color: "white", fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>{operationalAssets}</Text>
        </View>
      </View>
      <View style={{flex: 5, backgroundColor: 'white', top: 0, minHeight: 600}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            marginTop: 5
          }}>
            
            <View style={{width: '100%', padding: 10, borderRadius: 5, elevation: 2, backgroundColor: '#f5ede4'}}>
              <Text style={{color: "#000", fontSize: 16, textAlign: 'left', fontWeight: '400', marginTop: 4}}>Operational</Text>
              <LineChart style={styles.chart}
                data={dataStatus}
                xAxis={xAxis}
                yAxis={yAxis}
              />
            </View>
            <View style={{width: '100%', padding: 10, borderRadius: 5, elevation: 2, backgroundColor: '#f5ede4', marginTop: 10}}>
              <Text style={{color: "#000", fontSize: 16, fontWeight: '400', marginTop: 4}}>NEW ASSETS</Text>
              <BarChart
                gridBackgroundColor={processColor('#ffffff')}
                style={styles.chart}
                data={data}
                xAxis={xAxis}
                yAxis={yAxis}
                animation={{ durationX: 2000 }}
              />
            </View>
            {/* <View style={{borderColor: "#1970cf", borderWidth: 1, borderRadius: 5, width: '100%', padding: 5, marginTop: 10}}>
              <PieChart
                style={styles.chart}
                data={pieData}
                legend={{ enabled: true }}
                entryLabelColor="#000"
                entryLabelTextSize={15}
                rotationEnabled={true}
                drawSliceText={true}
                usePercentValues={true}
                centerText={'Pie Chart'}
                centerTextRadiusPercent={100}
                holeRadius={40}
                holeColor="#f0f0f0"
                transparentCircleRadius={45}
                transparentCircleColor="#f0f0f088"
              />
            </View> */}
        </View>
      </View>
    </ScrollView>
    <Modal
        animationType="fade"
        transparent={true}
        centeredView={true}
        visible={filterShow}
        onRequestClose={()=>closeModal(false)}
        >
        <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.centeredView}>
          <KeyboardAvoidingView enabled style={styles.modalView}>
            <View style={{}}>
              <TouchableOpacity style={{alignItems: 'flex-end'}} onPress={()=>closeModal(false)}>
                <Icon name="close" size={20} />
              </TouchableOpacity>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{color: '#404040', fontSize: 14, fontWeight: 'bold'}}>Select Filter</Text>
              </View>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <TouchableOpacity onPress={()=>handleFilterSelect('All Assets')} style={{marginVertical: 5}}>
                  <Text style={{textAlign: 'center', color: 'black'}}>All Assets</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleFilterSelect('Today')} style={{marginVertical: 5}}>
                  <Text style={{textAlign: 'center', color: 'black'}}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleFilterSelect('ThisMonth')} style={{marginVertical: 5}}>
                  <Text style={{textAlign: 'center', color: 'black'}}>ThisMonth</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>handleFilterSelect('ThisYear')} style={{marginVertical: 5}}>
                  <Text style={{textAlign: 'center', color: 'black'}}>ThisYear</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </Provider>
  );
// }
};

const styles = StyleSheet.create({
  graphStyle: {
    backgroundColor: 'black',
    width: 200,
  },
  chart: {
    // width: 350,
    height: 280,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // marginTop: 22,
    alignItems: 'center'
  },
  modalView: {
    // alignContent: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    height: 190,
    width: 150,
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#D0D0D0',
    borderWidth: 1,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 20,
  },
});
 
export default HomeScreen;