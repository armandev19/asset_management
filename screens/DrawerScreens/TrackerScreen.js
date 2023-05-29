import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
// import { ViewPropTypes } from 'deprecated-react-native-prop-types';
const QRCodeScannerScreen = () => {
    // const AppCameraRef = useRef();

    // const onBarCodeRead = (e) => {
    //     onBarCodeDetect({ qrcode: e.data });
    // }

  // useEffect(() => {
  //   const handleBarcodeScanned = ({ data }) => {
  //     if (!scanned) {
  //       setScanned(true);
  //       console.log('Scanned QR code:', data);
  //       // Perform any action with the scanned data

  //       // Reset the scanned state after a short delay
  //       setTimeout(() => {
  //         setScanned(false);
  //       }, 2000);
  //     }
  //   };

  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setScanned(false); // Reset the scanned state when the screen is focused
  //   });

  //   return unsubscribe;
  // }, []);

  // const onBarCodeScanned = ({ data }) => {
  //   if (!scanned) {
  //     setScanned(true);
  //     console.log('Scanned QR code:', data);
  //     // Perform any action with the scanned data

  //     // Reset the scanned state after a short delay
  //     setTimeout(() => {
  //       setScanned(false);
  //     }, 2000);
  //   }
  // };

    // return (
    //   <RNCamera
    //         ref={AppCameraRef}
    //         style={styles.preview}
    //         captureAudio={false}
    //         ratio={'16:9'}
    //         type={RNCamera.Constants.Type.back}
    //         flashMode={RNCamera.Constants.FlashMode.off}
    //         onBarCodeRead={onBarCodeRead}
    //         rectOfInterest={{
    //             x: scanAreaX,
    //             y: scanAreaY,
    //             width: scanAreaWidth,
    //             height: scanAreaHeight,
    //         }}
    //         cameraViewDimensions={{
    //             width: CAM_VIEW_WIDTH,
    //             height: CAM_VIEW_HEIGHT,
    //         }}
    //     >
    //         <View style={styles.header}>
                
    //         </View>
            
    //         <View style={styles.footer}>
                
    //         </View>
    //   </RNCamera>
    // );
  
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