import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import { Camera, CameraType, CameraKitCameraScreen } from 'react-native-camera-kit';

const QRCodeScannerScreen = ({navigation, routes}) => {
    return (
      <View style={{padding: 5}}>
          <View style={{margin: 10, alignSelf: 'center'}}>
            <CameraKitCameraScreen
              style={{ width: 350, height:Dimensions.get('window').width, justifyContent: 'center', alignContent: 'center'}}
              actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
              onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
              // flashImages={{
              //   // optional, images for flash state
              //   on: require('path/to/image'),
              //   off: require('path/to/image'),
              //   auto: require('path/to/image'),
              // }}
              cameraType={CameraType.Back}
              scanBarcode={true}
              onReadQrCode={(event) => alert(event.nativeEvent.codeStringValue)}
              // showFrame={true} // (default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
              // laserColor='green' // (default red) optional, color of laser in scanner frame
              // frameColor='white'
              focusMode='on'
              ratioOverlay={'16:9'} cameraRatioOverlay={undefined} 
              // cameraFlipImage={require('path/to/image')} // optional, image for flipping camera button
              // captureButtonImage={require('path/to/image')} // optional, image capture button
              // torchOnImage={require('path/to/image')} // optional, image for toggling on flash light
              // torchOffImage={require('path/to/image')} // optional, image for toggling off flash light
              hideControls={false} // (default false) optional, hides camera controls
              showCapturedImageCount={false} // (default false) optional, show count for photos taken during that capture session
            />

            {/* <CameraKitCameraScreen
               actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
               onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
               scanBarcode={true}
               laserColor={"blue"}
               frameColor={"yellow"}
           
               onReadQRCode={((event) => Alert.alert("Qr code found"))} //optional
               hideControls={false}           //(default false) optional, hide buttons and additional controls on top and bottom of screen
               showFrame={true}   //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
               offsetForScannerFrame = {10}   //(default 30) optional, offset from left and right side of the screen
               heightForScannerFrame = {300}  //(default 200) optional, change height of the scanner frame
               colorForScannerFrame = {'red'} //(default white) optional, change colot of the scanner frame
            /> */}
          </View>
          <View style={{width: 150, alignSelf: 'center'}}>
            <Button title="Scan QR"></Button>
          </View>
      </View>
    );
  
};

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default QRCodeScannerScreen;