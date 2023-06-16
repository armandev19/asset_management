import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
// import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CameraScreen = () => {
  const { devices, selectDevice } = useCameraDevices();
  const cameraRef = useRef(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    (async () => {
      if (devices && devices.length > 0) {
        await selectDevice(devices[0]);
        setIsCameraReady(true);
      }
    })();
  }, [devices]);

  const onBarcodesDetected = ({ barcodes }) => {
    if (barcodes && barcodes.length > 0) {
      const { data } = barcodes[0];
      Alert.alert('QR Code Detected', data, [{ text: 'OK' }]);
    }
  };

  return (
    <View style={styles.container}>
      {/* {isCameraReady ? (
        <Camera
          ref={cameraRef}
          style={styles.camera}
          device={devices[0]}
          isActive={true}
          onBarcodesDetected={onBarcodesDetected}
          barCodeTypes={['qr']}
        />
      ) : (
        <View style={styles.emptyCamera} />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  emptyCamera: {
    flex: 1,
    backgroundColor: '#333',
  },
});

export default CameraScreen;