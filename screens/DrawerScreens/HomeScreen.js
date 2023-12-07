import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const HomeScreen = ({navigation, props}) => {
  const [userData, setUserData] = useState({});
  const [users, setUsers] = useState({});
  const currentUserData = useSelector(selectUserData);
  
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundColor: '#ffffff',
    // backgroundGradientFrom: "#1E2923",
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: "#08130D",
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `white`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  const pieData = [
    {
      name: "Operational",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Destroyed",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Under Maintenance",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
  ];

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `white`, // optional
        strokeWidth: 1 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };
 
  const test = () => {
    fetch('http://192.168.1.4:5000/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
      
  }

  useEffect(()=>{
  })
  if(currentUserData){
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 16,
              color: 'black',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}
            onPress={()=>test()}>
              Welcome {currentUserData.firstname}
          </Text>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 16,
              color: 'black',
              fontWeight: 'bold',
              fontStyle: 'italic',
              textTransform: 'uppercase'
            }}>
          </Text>
          <View style={{alignItems: 'center', alignSelf: 'center', paddingHorizontal: 10}}>
            <LineChart
              data={data}
              width={360}
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#fff', // specify the background color
                backgroundGradientTo: '#fff',   // specify the background color
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
            />
          </View>
          <View style={{alignItems: 'center', alignSelf: 'center', paddingHorizontal: 10}}>
            <PieChart
              data={pieData}
              width={360}
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#fff', // specify the background color
                backgroundGradientTo: '#fff',   // specify the background color
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor={"population"}
              // backgroundColor={"transparent"}
              paddingLeft={"15"}
              center={[10, 50]}
              absolute
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
};

const styles = StyleSheet.create({
  graphStyle: {
    backgroundColor: 'black',
    width: 200,
  }
});
 
export default HomeScreen;