import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { Input, Icon, BottomSheet, ListItem, Dialog, Button, Overlay } from '@rneui/themed';

const ReportScreen = ({ navigation, route }) => {
  const [reportType, setReportType] = useState('');
  const [isPickerShowFrom, setIsPickerShowFrom] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date(Date.now()));
  const [isPickerShowTo, setIsPickerShowTo] = useState(false);
  const [dateTo, setDateTo] = useState(new Date(Date.now()));
  const [showDropDown, setShowDropDown] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reportHeader, setReportHeader] = useState([]);
  const [visible, setVisible] = useState(false)
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

  const dynamicData = [
    { item: "Item 1", details: "Details about Item 1" },
    { item: "Item 2", details: "Details about Item 2" },
    { item: "Item 3", details: "Details about Item 3" },
  ];

  console.log('report type', reportType)

  const headersMapping = {
    Asset: ['Asset Code', 'Asset Name', 'Status', 'Purchase Date'],
    Maintenance: ['Asset Name', 'Description', 'Status', 'Scheduled Date'],
    'Asset Transfer': ['Asset Name', 'From', 'To', 'Transfer Date'],
    Depreciation: ['Asset Name', 'Original Price', 'Purchased Date', 'Current Value'],
  };

  const headers = headersMapping[reportType]?.map(header => `<th>${header}</th>`).join('') || '';

  const reports = [
    { value: "Asset", label: "Asset" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Asset Transfer", label: "Asset Transfer" },
    { value: "Depreciation", label: "Depreciation" },
    { value: "Audit Trail", label: "Audit Trail"},
    { value: "Asset Utilization", label: "Asset Utilization" },
    { value: "Asset Performance", label: "Asset Performance"},
  ]
  
  const rows = 
  (reportType === 'Asset') ? 
    reportData.map(data => `<tr><td>${data.asset_code}</td><td>${data.asset_name}</td><td>${data.status}</td><td>${data.purchase_date}</td></tr>`).join('') : 
  (reportType === "Maintenance") ? 
    reportData.map(data => `<tr><td>${data.asset_name}</td><td>${data.desc}</td><td>${data.status}</td><td>${data.sched}</td></tr>`).join('') : 
  (reportType === "Asset Transfer") ?
    reportData.map(data => `<tr><td>${data.asset_name}</td><td>${data.from}</td><td>${data.to}</td><td>${data.transfer_date}</td></tr>`).join('') : 
  (reportType === "Depreciation") ?
  reportData.map(data => {
    let depreciated_price = item.original_price;
    const yearOld = getYearDifference(item.purchase_date, moment(dateToday).format("YYYY-MM-DD"))
    if (data.type === 1) {
      if (yearOld === 1) {
        depreciated_price = data.original_price * 0.9
      } else if (yearOld === 2) {
        depreciated_price = data.original_price * 0.8
      } else if (yearOld === 3) {
        depreciated_price = data.original_price * 0.7
      } else {
        depreciated_price = data.original_price
      }
    } else if (data.type === 2) {
      if (yearOld === 2) {
        depreciated_price = data.original_price * 0.9
      } else if (yearOld === 3) {
        depreciated_price = data.original_price * 0.8
      } else {
        depreciated_price = data.original_price
      }
    } else if (data.type === 3) {
      if (yearOld === 3) {
        depreciated_price = data.original_price * 0.9
      } else if (yearOld === 4) {
        depreciated_price = data.original_price * 0.8
      } else if (yearOld === 5) {
        depreciated_price = data.original_price * 0.7
      } else {
        depreciated_price = data.original_price
      }
    } else {
      if (yearOld === 3) {
        depreciated_price = data.original_price * 0.9
      } else if (yearOld === 4) {
        depreciated_price = data.original_price * 0.8
      } else if (yearOld === 5) {
        depreciated_price = data.original_price * 0.7
      } else {
        depreciated_price = data.original_price
      }
    }
    return `<tr>
      <td>${data.asset_name}</td>
      <td>${data.original_price}</td>
      <td>${data.purchase_date}</td>
      <td>${depreciated_price.toFixed(2)}</td>
    </tr>`;
  }).join('') :
    reportData.map(data => `<tr><td>${data.item}</td><td>${data.details}</td></tr>`).join('');

  const createPDF = async () => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>${reportType}</h1>
          <h6>${moment(dateFrom).format("MM/DD/YY")} - ${moment(dateTo).format("MM/DD/YY")}</h6>
          <table>
            <tr>
              ${headers}
            </tr>
            ${rows}
          </table>
        </body>
      </html>
    `;

    const options = {
      html: htmlContent,
      fileName: 'Report',
      directory: 'Downloads',
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      const newPath = `${RNFS.DownloadDirectoryPath}/Reportsss.pdf`;

      await RNFS.moveFile(file.filePath, newPath);
      console.log('PDF saved to:', newPath);
    } catch (error) {
      console.error('Error creating PDF:', error);
    }
  };

  // asset inventory report
  // audit trail report
  // asset utilization
  // asset performance report
  // 

  const assetHeader = ["Code", "Asset", "Status", "Purchase Date"];
  const assetTransferHeader = ["Asset", "From", "To", "Schedule Date"];
  const maintenanceHeader = ["Asset", "Description", "Status", "Schedule Date"];

  const handleSubmit = () => {
    if (reportType) {
      setLoading(true);
      let dataToSend = { report_type: reportType, date_from: dateFrom, date_to: dateTo };
      let formBody = [];

      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }

      formBody = formBody.join('&');
      fetch(global.url + 'generateReports.php', {
        method: 'POST',
        body: formBody,
        headers: {
          "bypass-tunnel-reminder": "true",
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
    } else {
      alert("Please select report type.")
    }
  }


  const dateFromTemp = dateFrom.toDateString();
  const withoutWeekdayFrom = dateFromTemp.split(' ').slice(1).join(' ');
  const dateToTemp = dateTo.toDateString();
  const withoutWeekdayTo = dateToTemp.split(' ').slice(1).join(' ');

  const getYearDifference = (startDate, endDate) => {
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);
    return endMoment.diff(startMoment, 'years');
  }

  const selectReportType = (item) => {
    setReportType(item);
    setVisible(false);
  }

  return (
    <View style={{ justifyContent: 'center', backgroundColor: '#f2f3f8', }}>
      <Loader loading={loading} />
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity onPress={() => setVisible(true)}>
        {/* <TouchableOpacity onPress={()=>createPDF()}> */}
          <Input
            label="Report Type"
            labelStyle={styles.label}
            inputContainerStyle={styles.inputContainer}
            inputStyle={{ fontSize: 15 }}
            placeholder={"Select Report Type"}
            value={reportType}
            // onChangeText={selectedAssets => setSelectedAssets(selectedAssets)}
            editable={false}
            rightIcon={{ type: 'simple-line-icon', name: 'arrow-down', size: 15 }}
          />
        </TouchableOpacity>
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
          // justifyContent: "space-between",
          marginTop: 5
        }}>
          <TouchableOpacity onPress={() => showPickerFrom(true)} style={{ width: '50%' }}>
            <Input
              label="From"
              labelStyle={styles.label}
              inputContainerStyle={{ ...styles.inputContainer }}
              inputStyle={{ fontSize: 15 }}
              placeholder={"Select Date From"}
              value={withoutWeekdayFrom}
              editable={false}
              rightIcon={{ type: 'simple-line-icon', name: 'arrow-down', size: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showPickerTo(true)} style={{ width: '50%' }}>
            <Input
              label="To"
              labelStyle={styles.label}
              inputContainerStyle={{ ...styles.inputContainer }}
              inputStyle={{ fontSize: 15 }}
              placeholder={"Select Date To"}
              value={withoutWeekdayTo}
              editable={false}
              rightIcon={{ type: 'simple-line-icon', name: 'arrow-down', size: 15 }}
            />
          </TouchableOpacity>
          {/* <TextInput
            mode="outlined"
            label="From"
            activeOutlineColor='#348ceb'
            value={withoutWeekdayFrom} 
            editable={false}
            style={{ width: '45%' }}
            // value={text}
            // onChangeText={text => setText(text)}
            right={<TextInput.Icon name="calendar" onPress={showPickerFrom} />}
          /> */}
          {/* <TextInput
            mode="outlined"
            label="To"
            activeOutlineColor='#348ceb'
            value={withoutWeekdayTo} editable={false}
            style={{ width: '45%' }}
            // value={text}
            // onChangeText={text => setText(text)}
            right={<TextInput.Icon name="calendar" onPress={showPickerTo} />}
          /> */}
        </View>
        <Button buttonStyle={{ marginVertical: 5, marginHorizontal: 20, borderRadius: 5}} onPress={() => handleSubmit()}>
          <Icon name="doc" type="simple-line-icon" color="white" /> Generate
        </Button>
        <ScrollView style={{ marginTop: 20, backgroundColor: 'white', marginHorizontal: 3, borderWidth: 1, borderColor: 'lightgray' }}>
          <Text style={{ color: 'black', fontWeight: '400', textAlign: 'center', fontSize: 16, marginTop: 5 }}>
            {reportType} Report
          </Text>
          <Text style={{ color: 'black', fontWeight: '400', textAlign: 'center', fontSize: 13 }}>{moment(dateFrom).format("MM/DD/YY")} - {moment(dateTo).format("MM/DD/YY")}</Text>
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
              : reportType === 'Asset Transfer' ?
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
                : reportType === 'Depreciation' ?
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
                      if (item.type === 1) {
                        if (yearOld === 1) {
                          depreciated_price = item.original_price * 0.9
                        } else if (yearOld === 2) {
                          depreciated_price = item.original_price * 0.8
                        } else if (yearOld === 3) {
                          depreciated_price = item.original_price * 0.7
                        } else {
                          depreciated_price = item.original_price
                        }
                      } else if (item.type === 2) {
                        if (yearOld === 2) {
                          depreciated_price = item.original_price * 0.9
                        } else if (yearOld === 3) {
                          depreciated_price = item.original_price * 0.8
                        } else {
                          depreciated_price = item.original_price
                        }
                      } else if (item.type === 3) {
                        if (yearOld === 3) {
                          depreciated_price = item.original_price * 0.9
                        } else if (yearOld === 4) {
                          depreciated_price = item.original_price * 0.8
                        } else if (yearOld === 5) {
                          depreciated_price = item.original_price * 0.7
                        } else {
                          depreciated_price = item.original_price
                        }
                      } else {
                        if (yearOld === 3) {
                          depreciated_price = item.original_price * 0.9
                        } else if (yearOld === 4) {
                          depreciated_price = item.original_price * 0.8
                        } else if (yearOld === 5) {
                          depreciated_price = item.original_price * 0.7
                        } else {
                          depreciated_price = item.original_price
                        }
                      }

                      return (
                        <View key={item.id} style={styles.tableRow}>
                          <Text style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'black' }}>{item.asset_name}</Text>
                          <Text style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'black' }}>{item.original_price}</Text>
                          <Text style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'black' }}>{item.purchase_date}</Text>
                          <Text style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'black' }}>{depreciated_price}</Text>
                        </View>
                      )
                    })}
                  </>

                  :
                  <>
                    <View style={{ marginTop: 10, alignContent: 'center', marginBottom: 5 }}>
                      <Text style={{ color: 'black', fontSize: 14, textAlign: 'center' }}>No data found</Text>
                    </View>
                  </>
          }

        </ScrollView>
        <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)} overlayStyle={{ height: '50%', width: '80%' }}>
          <Text>Select Report</Text>
          <ScrollView>
            {reports?.map((item, index) => {
              return (
                <ListItem key={index} bottomDivider style={{ height: 'auto' }} onPress={() => selectReportType(item.label)}>
                  <Icon name="tag" type="simple-line-icon" size={15} />
                  <ListItem.Content >
                    <ListItem.Title style={{ fontSize: 14 }}>{item.label || "No name"}</ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              )
            })}
          </ScrollView>
        </Overlay>
        {/* <TouchableOpacity 
          style={{
            borderRadius: 3, 
            backgroundColor: 'grey', 
            width: '40%', 
            marginTop: 5,   
            padding: 5,
            marginVertical: 20,
            alignSelf: 'center'
          }}
          onPress={()=>createPDF()}
          ><Text style={{textAlign: 'center', color: '#fff'}}>EXPORT TO PDF</Text></TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: '400',
    fontSize: 13,
    marginTop: -15,
    color: '#0d0c0c'
  },
  inputContainer: {
    height: 35,
    padding: 5,
    borderColor: 'grey',
    borderWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 2,
  },
  tableHeader: {
    fontWeight: '400',
    flex: 1,
    textAlign: 'center',
    color: 'black'
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    fontSize: 13,
    margin: 1
  },
});

export default ReportScreen;