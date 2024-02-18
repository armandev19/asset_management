import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera, CameraType } from 'react-native-camera-kit';
import Loader from './../Components/loader';
const TrackerScreen = () => {
  const [cameraShow, setCameraShow] = useState(true);
  const [scannedAssetCode, setScannedAssetCode] = useState('')
  const [assetMaintenance, setAssetMaintenance] = useState({});
  const [assetTransfer, setAssetTransfer] = useState({});
  const [loading, setLoading] = useState(false);
  const [details, setAssetDetails] = useState([]);
  const handleBarCodeScanned = (data) => {
    setCameraShow(false);
    setLoading(true)
    setScannedAssetCode(data);
    getAssetDetails(data)
    setTimeout(()=>{
      setLoading(false);
    }, 1500)
  };

  const getAssetDetails = (data) => {
    let dataToSend = { asset_code: data };
		let formBody = [];
		for (let key in dataToSend) {
			let encodedKey = encodeURIComponent(key);
			let encodedValue = encodeURIComponent(dataToSend[key]);
			formBody.push(encodedKey + '=' + encodedValue);
		}
		formBody = formBody.join('&');
		fetch(global.url+'getAssetDetailsQR.php', {
			method: 'POST',
			body: formBody,
			headers: {
				'Content-Type':
				'application/x-www-form-urlencoded;charset=UTF-8',
			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
      setAssetDetails(responseJson?.data[0]);
			setLoading(false);
      console.log('details', responseJson)
		})
		.catch((error) => {
			setLoading(false);
		});
  }

  return (
    <View style={{justifyContent: 'center', backgroundColor: '#f2f3f8', padding: 20, justifyContent: 'center'}}>
      <Loader loading={loading} />
      {cameraShow ? 
        <Camera 
          actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
          // onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
          scanBarcode={true}
          onReadCode={(event) => handleBarCodeScanned(event.nativeEvent.codeStringValue)} // optional
          // showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
          // laserColor='red' // (default red) optional, color of laser in scanner frame
          // frameColor='white'
          style={{
            alignSelf: 'center',
            width: 320, 
            height: 350,
            marginTop: 100,
          }}
        />
      : 
        null
      }
      {!cameraShow ? 
        <View>
          <View style={{marginTop: 30, borderColor: '#000', borderWidth: 0.2, borderRadius: 5, padding: 10}}>
            <Text style={{color: "grey", fontSize: 25, fontWeight: '700'}}>Asset Details</Text>
            <Text style={{color: "grey", fontSize: 25, fontWeight: '700'}}>{details.asset_code}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: "grey", fontSize: 20}}>Asset name: </Text>
              <Text style={{color: "grey", fontSize: 20}}>{details.asset_name}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: "grey", fontSize: 20}}>Status: </Text>
              {details.status === 'Operational' ? (
                <Text style={{color: "#2eb82e", fontSize: 20}}>{details.status}</Text>
                )
              : details.status === 'Operational' ? (
                <Text style={{color: "yellow", fontSize: 20}}>{details.status}</Text>
              ) : 
                <Text style={{color: "yellow", fontSize: 20}}>{details.status}</Text>
              }
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: "grey", fontSize: 20}}>Location: </Text>
              <Text style={{color: "grey", fontSize: 20}}>{details.asset_name}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: "grey", fontSize: 20}}>Price: </Text>
              <Text style={{color: "grey", fontSize: 20}}>{details.asset_name}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: "grey", fontSize: 20}}>Maintenance: </Text>
              <Text style={{color: "grey", fontSize: 20}}>{assetMaintenance.length > 0 ? assetMaintenance.schedule : 'N/A'}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: "grey", fontSize: 20}}>Transfer: </Text>
              <Text style={{color: "grey", fontSize: 20}}>{assetTransfer.length > 0 ? assetTransfer.schedule : 'N/A'}</Text>
            </View>
          </View>
          <View style={{ width: "50%", alignSelf: 'center', marginTop: 20}}>
            <Button style={{color: "grey", textAlign: "center", fontSize: 20, width: "50%"}} onPress={()=>setCameraShow(true)} title="Scan QR Code"/>
          </View>
        </View>
        
      : null }
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
});

export default TrackerScreen;