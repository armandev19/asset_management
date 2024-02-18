import React, {useEffect, useState, useRef} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Loader from '../Components/loader';
import axios from 'axios';
import { Dimensions } from "react-native";
import { black } from 'react-native-paper/lib/typescript/styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import {LineChart, BarChart, PieChart} from 'react-native-charts-wrapper';
const HomeScreen = ({navigation, props}) => {
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState({});
  const currentUserData = useSelector(selectUserData);
  const [loading, setLoading] = useState(false);
  const screenWidth = Dimensions.get("window").width;
  const [newAssets, setNewAssets] = useState(0);
  const [operationalAssets, setOperationalAssets] = useState(0);
  const [forMaintenanceAssets, setForMaintenanceAssets] = useState(0);
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

  
  const test = () => {
    fetch(global.url+'dashboard.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
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

  const data = {
    dataSets: [
      {
        values: [{ y: 50 }, { y: 10 }, { y: 5 }],
        label: 'Status',
        config: {
          color: '#2196F3',
          barSpacePercent: 40,
          barShadowColor: '#BDBDBD',
          highlightAlpha: 90,
          highlightColor: '#000',
        },
      },
    ],
  };

  const lineData = [{y: 1}, {y: 2}, {y: 3}];

  const xAxis = {
    valueFormatter: ['Operational', 'Under Repair', 'Retired/Disposed'],
    granularityEnabled: true,
    granularity: 1,
  };

  const yAxis = {
    left: {
      axisMinimum: 0,
    },
  };

  useEffect(() => {
  }, []);

  useEffect(()=>{
    test()
  })
  if(currentUserData){
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#348ceb'}}>
      <View style={{flex: 1, padding: 16, marginBottom: 20}}>
        <Text style={{color: "white", fontSize: 25, fontWeight: '700', textTransform: 'uppercase', 
              marginBottom: 10, fontFamily: 'Lato-Thin'}}>Welcome {currentUserData.firstname}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
          <View style={{borderColor: "#1970cf", borderWidth: 1, borderRadius: 5, width: 110, height: 90, padding: 5, backgroundColor: '#1970cf'}}>
            <Text style={{color: "white", fontSize: 17, textAlign: 'center'}}>New Assets</Text>
            <Text style={{color: "white", fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>{newAssets}</Text>
          </View>
          <View style={{borderColor: "#1970cf", borderWidth: 1, borderRadius: 5, width: 110, height: 90, padding: 5, backgroundColor: '#1970cf'}}>
            <Text style={{color: "white", fontSize: 17, textAlign: 'center'}}>Operational</Text>
            <Text style={{color: "white", fontSize: 25, textAlign: 'center', fontWeight: 'bold'}}>{operationalAssets}</Text>
          </View>
          <View style={{borderColor: "#1970cf", borderWidth: 1, borderRadius: 5, width: 110, height: 90, padding: 5, backgroundColor: '#1970cf'}}>
            <Text style={{color: "white", fontSize: 14, textAlign: 'center'}}>For Maintenance</Text>
            <Text style={{color: "white", fontSize: 25, textAlign: 'center', fontWeight: 'bold', marginTop: 4}}>{forMaintenanceAssets}</Text>
          </View>
        </View>
      </View>
      <View style={{flex: 5, backgroundColor: 'white', top: 0, borderTopRightRadius: 20, borderTopLeftRadius: 20, minHeight: 600}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            marginTop: 5
          }}>
            <View style={{borderColor: "#1970cf", borderWidth: 1, borderRadius: 5, width: '100%', padding: 5}}>
              <Text style={{color: "#000", fontSize: 20, textAlign: 'center', fontWeight: '500', marginTop: 4}}>New Assets</Text>
              <LineChart style={styles.chart}
                data={{dataSets:[{label: "New Assets", values: lineData}]}}
              />
            </View>
            <View style={{borderColor: "#1970cf", borderWidth: 1, borderRadius: 5, width: '100%', padding: 5, marginTop: 10}}>
              <Text style={{color: "#000", fontSize: 20, textAlign: 'center', fontWeight: '500', marginTop: 4}}>Assets by Status</Text>
              <BarChart
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
  );
}
};

const styles = StyleSheet.create({
  graphStyle: {
    backgroundColor: 'black',
    width: 200,
  },
  chart: {
    width: 350,
    height: 220,
  },
});
 
export default HomeScreen;