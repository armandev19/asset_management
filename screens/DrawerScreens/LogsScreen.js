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

const LogsScreen = ({navigation, route}) => {
  const [reportType, setReportType] = useState('');
	const [isPickerShowFrom, setIsPickerShowFrom] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date(Date.now()));
	const [isPickerShowTo, setIsPickerShowTo] = useState(false);
  const [dateTo, setDateTo] = useState(new Date(Date.now()));
  const [showDropDown, setShowDropDown] = useState(false);
  const [reportData, setReportData] = useState([]);
	const [loading, setLoading] = useState(false);
  const [reportHeader, setReportHeader] = useState([]);

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

  const handleSubmit = () => {
      setLoading(true);
      let dataToSend = { date_from : dateFrom, date_to: dateTo };
      let formBody = [];

      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');
      fetch(global.url+'getLogs.php', {
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
      })
      .catch((error) => {
        setLoading(false);
        console.log(error)
      });
  }
  

  useEffect(()=>{
    handleSubmit();
  }, [])

  const dateFromTemp = dateFrom.toDateString();
  const withoutWeekdayFrom = dateFromTemp.split(' ').slice(1).join(' ');
  const dateToTemp = dateTo.toDateString();
  const withoutWeekdayTo = dateToTemp.split(' ').slice(1).join(' ');

  return (
    <Provider theme={DefaultTheme}>
    <Loader loading={loading} />
    <ScrollView style={{flex: 1, padding: 2, marginHorizontal: 10, }}
      contentContainerStyle={{
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <View style={{}}>
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
              style={{width: '45%'}}
              // value={text}
              // onChangeText={text => setText(text)}
              right={<TextInput.Icon name="calendar" onPress={showPickerTo} />}
            />
          </View>
          <Button style={{marginTop: 10}} mode="contained" onPress={() => handleSubmit()}>
              Generate
            </Button>
          <View style={{marginTop: 20, padding: 3, backgroundColor: 'white', borderWidth: 1, borderColor: 'lightgray'}}>
            <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 20}}>
              Logs
            </Text>
            <Text style={{color: 'black', fontWeight: 'bold', textAlign: 'center', fontSize: 16}}>{moment(dateFrom).format("MM/DD/YY")} - {moment(dateTo).format("MM/DD/YY")}</Text>
                <View style={styles.tableRow}>
                  <Text style={styles.tableHeader}>Date</Text>
                  <Text style={styles.tableHeader}>Activity</Text>
                  <Text style={styles.tableHeader}>User</Text>
                </View>
                {reportData.map(item => 
                {
                  console.log(item.key_id)
                  return (
                    <View key={item.key_id} style={styles.tableRow}>
                      <Text style={styles.tableCell}>{item.log_date}</Text>
                      <Text style={styles.tableCell}>{item.log_description}</Text>
                      <Text style={styles.tableCell}>{item.firstname} {item.lastname}</Text>
                    </View>
                  )
                }
                )}
                {reportData.length == 0 ? 
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>No Data</Text>
                </View>
                : null}
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
 
export default LogsScreen;