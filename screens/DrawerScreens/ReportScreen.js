import React, {useState, useEffect, Component} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, Dimensions} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DropDown from "react-native-paper-dropdown";
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Appbar,
  DarkTheme,
  DefaultTheme,
  Provider,
  Surface,
  ThemeProvider,
  TextInput
} from "react-native-paper";
import moment from 'moment';
import { Col, Row, Grid } from "react-native-easy-grid";
import { ScrollView } from 'react-native-gesture-handler';

const ReportScreen = ({navigation, route}) => {
  const [reportType, setReportType] = useState('');
	const [isPickerShowFrom, setIsPickerShowFrom] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date(Date.now()));
	const [isPickerShowTo, setIsPickerShowTo] = useState(false);
  const [dateTo, setDateTo] = useState(new Date(Date.now()));
  const [showDropDown, setShowDropDown] = useState(false);
  const [reportData, setReportData] = useState([]);
	const [loading, setLoading] = useState(false);
  const [reportHeader, setReportHeader] = useState([]);

  const dateToday = new Date(Date.now());
  const showPickerFrom = () => {
    setIsPickerShowFrom(true);
  };

  const onChangeFrom = (event, value) => {
    setIsPickerShowFrom(false);
    setDateFrom(value);
    console.log(date)
  };
	
  const showPickerTo = () => {
    setIsPickerShowTo(true);
  };

  const onChangeTo = (event, value) => {
    setIsPickerShowTo(false);
    setDateTo(value);
    console.log(date)
  };

  const reports = [
    {value: "Asset", label: "Asset"},
    {value: "Maintenance", label: "Maintenance"},
    {value: "Asset Transfer", label: "Asset Transfer"},
    {value: "Depreciation", label: "Depreciation"},
  ]

  const assetHeader = ["Code", "Asset", "Status", "Purchase Date"];
  const assetTransferHeader = ["Asset", "From", "To", "Schedule Date"];
  const maintenanceHeader = ["Asset", "Description", "Status", "Schedule Date"];

  const handleSubmit = () => {
    if(reportType){
      setLoading(true);
      let dataToSend = { report_type: reportType, date_from : dateFrom, date_to: dateTo };
      let formBody = [];

      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');
      fetch(global.url+'generateReports.php', {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((responseJson) => {
        setReportData(responseJson.data);
        setLoading(false);
        console.log("data", responseJson)
      })
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });
    }else{
      alert("Please select report type.")
    }
  }

  const data = [
    { id: '1', title: 'Item 1' },
    { id: '2', title: 'Item 2' },
    { id: '3', title: 'Item 3' },
    // Add more items as needed
  ];

  const dateFromTemp = dateFrom.toDateString();
  const withoutWeekdayFrom = dateFromTemp.split(' ').slice(1).join(' ');
  const dateToTemp = dateTo.toDateString();
  const withoutWeekdayTo = dateToTemp.split(' ').slice(1).join(' ');

  const getYearDifference = (startDate, endDate) => {
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);
    return endMoment.diff(startMoment, 'years');
}

  return (
    <Provider theme={DefaultTheme}>
    <Loader loading={loading} />
    <ScrollView style={{flex: 1, padding: 2, marginHorizontal: 10, }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <View style={{}}>
          <DropDown
            label={"Report Type"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={reportType}
            setValue={setReportType}
            list={reports}
            dropDownStyle={{
              width:'100%',
            }}
            style={{ heigt: 200 }} 
          />
          {/* The date picker */}
          {isPickerShowFrom && (
            <DateTimePicker
              value={dateFrom}
              mode={'date'}
              onChange={onChangeFrom}
              style={styles.datePicker}
              format='MM DD YYYY'
            />
          )}
          {isPickerShowTo && (
            <DateTimePicker
              value={dateTo}
              mode={'date'}
              onChange={onChangeTo}
              style={styles.datePicker}
              format='MM DD YYYY'
            />
          )}
          <View style={{
            flexDirection: 'row',
            justifyContent: "space-between",
            marginTop: 5
          }}>
            <TextInput
              mode="outlined"
              label="From"
              activeOutlineColor='#348ceb'
              value={withoutWeekdayFrom} editable={false}
              style={{width: '45%'}}
              // value={text}
              // onChangeText={text => setText(text)}
              right={<TextInput.Icon name="calendar" onPress={showPickerFrom} />}
            />
            <TextInput
              mode="outlined"
              label="To"
              activeOutlineColor='#348ceb'
              value={withoutWeekdayTo} editable={false}
              // style={{width: '45%'}}
              // value={text}
              // onChangeText={text => setText(text)}
              right={<TextInput.Icon name="calendar" onPress={showPickerTo} />}
            />
          </View>
          <Button style={{marginTop: 10}} mode="contained" onPress={() => handleSubmit()}>
              Generate
            </Button>
          <View style={{marginTop: 20, backgroundColor: 'white', borderWidth: 1, borderColor: 'lightgray'}}>
            <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>
              {reportType} Report
            </Text>
            <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 16}}>{moment(dateFrom).format("MM/DD/YY")} - {moment(dateTo).format("MM/DD/YY")}</Text>
            {reportType === 'Asset' ? 
              <>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Code</Text>
                  <Text style={styles.tableHeader}>Asset</Text>
                  <Text style={styles.tableHeader}>Status</Text>
                  <Text style={styles.tableHeader}>Purchase Date</Text>
                </View>
                {reportData.map(item => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.asset_code}</Text>
                  <Text style={styles.tableCell}>{item.asset_name}</Text>
                  <Text style={styles.tableCell}>{item.status}</Text>
                  <Text style={styles.tableCell}>{item.purchase_date}</Text>
                </View>
                ))}
              </>
            : reportType === 'Maintenance' ?
              <>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Asset</Text>
                  <Text style={styles.tableHeader}>Desc.</Text>
                  <Text style={styles.tableHeader}>Status</Text>
                  <Text style={styles.tableHeader}>Schedule</Text>
                </View>
                {reportData.map(item => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.asset_name}</Text>
                  <Text style={styles.tableCell}>{item.desc}</Text>
                  <Text style={styles.tableCell}>{item.status}</Text>
                  <Text style={styles.tableCell}>{item.sched}</Text>
                </View>
                ))}
              </>
            : reportType === 'Asset Transfer'? 
              <>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Asset</Text>
                  <Text style={styles.tableHeader}>From</Text>
                  <Text style={styles.tableHeader}>To</Text>
                  <Text style={styles.tableHeader}>Schedule</Text>
                </View>
                {reportData.map(item => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.asset_name}</Text>
                  <Text style={styles.tableCell}>{item.from}</Text>
                  <Text style={styles.tableCell}>{item.to}</Text>
                  <Text style={styles.tableCell}>{item.transfer_date}</Text>
                </View>
                ))}
              </>
            :  reportType === 'Depreciation'? 
            <>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Asset</Text>
                <Text style={styles.tableHeader}>Purchaed Price</Text>
                <Text style={styles.tableHeader}>Purchased Date</Text>
                <Text style={styles.tableHeader}>Current Value</Text>
              </View>
              {reportData?.map(item => {
                let depreciated_price = item.original_price;
                const yearOld = getYearDifference(item.purchase_date, moment(dateToday).format("YYYY-MM-DD"))
                if(item.type === 1){
                  if(yearOld === 1){
                    depreciated_price = item.original_price * 0.9
                  }else if(yearOld === 2){
                    depreciated_price = item.original_price * 0.8
                  }else if(yearOld === 3){
                    depreciated_price = item.original_price * 0.7
                  }else{
                    depreciated_price = item.original_price
                  }
                }else if(item.type === 2){
                  if(yearOld === 2){
                    depreciated_price = item.original_price * 0.9
                  }else if(yearOld === 3){
                    depreciated_price = item.original_price * 0.8
                  }else{
                    depreciated_price = item.original_price
                  }
                }else if(item.type === 3){
                  if(yearOld === 3){
                    depreciated_price = item.original_price * 0.9
                  }else if(yearOld === 4){
                    depreciated_price = item.original_price * 0.8
                  }else if(yearOld === 5){
                    depreciated_price = item.original_price * 0.7
                  }else{
                    depreciated_price = item.original_price
                  }
                }else{
                  if(yearOld === 3){
                    depreciated_price = item.original_price * 0.9
                  }else if(yearOld === 4){
                    depreciated_price = item.original_price * 0.8
                  }else if(yearOld === 5){
                    depreciated_price = item.original_price * 0.7
                  }else{
                    depreciated_price = item.original_price
                  }
                }
                  
                return (
                  <View key={item.id} style={styles.tableRow}>
                    <Text style={{flex: 1, textAlign: 'center', fontSize: 12, color: 'black'}}>{item.asset_name}</Text>
                    <Text style={{flex: 1, textAlign: 'center', fontSize: 12, color: 'black'}}>{item.original_price}</Text>
                    <Text style={{flex: 1, textAlign: 'center', fontSize: 12, color: 'black'}}>{item.purchase_date}</Text>
                    <Text style={{flex: 1, textAlign: 'center', fontSize: 12, color: 'black'}}>{depreciated_price}</Text>
                  </View>
                )
              })}
            </>

            :
              <>
                <View style={{marginTop: 10, alignContent: 'center'}}>
                  <Text style={{color: 'black', fontSize: 14, textAlign: 'center'}}>No data found</Text>
                </View>
              </>
            }
              
          </View>
      </View>
    </ScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 2,
  },
  tableHeader: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    color: 'black'
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: 'black'
  },
});
 
export default ReportScreen;