import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, TouchableOpacity, Image, Dim } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Loader from './Components/loader';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { Icon, Overlay, Button } from '@rneui/themed';
import RNFS from "react-native-fs";
import Toast from 'react-native-toast-message';

const AssetDetailsScreen = ({ navigation, route }) => {
  const params = route.params;

  const [details, setAssetDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const qrCodeRef = useRef();
  const [open, setOpen] = useState(false);
  const onStateChange = ({ open }) => setOpen(open);
  const [modalVisible, setModalVisible] = useState(false);

  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: message,
      text2: ''
    });
  }

  const generateQRCode = async () => {
    try {
      // Convert QRCode to a base64 image
      let fileName = details.asset_code;
      qrCodeRef.current.toDataURL(async (data) => {
        // Define the file path
        const path = `${RNFS.DownloadDirectoryPath}/${fileName}.png`;

        // Write the base64 image to a file
        await RNFS.writeFile(path, data, "base64");
        console.log("qweqwe", path)
        showToast('success', `QR Code Saved to: ${path}.`);
      });
    } catch (error) {
      console.error("Error saving QR code:", error);
      Alert.alert("Error", "Could not save QR code.");
    }
  };

  const getAssetDetails = async () => {
    // setLoading(true);
    let dataToSend = { id: params };
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    await fetch(global.url + 'getAssetDetails.php', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type':
          'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setAssetDetails(responseJson.data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error)
        setLoading(false);
      });
  }

  useEffect(() => {
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getAssetDetails();
    }, []),
  );

  return (
    <ScrollView style={{}}>
      <Portal>
        {isFocused && (
          <FAB.Group
            open={open}
            style={{ top: 0, right: 0, bottom: 50 }}
            containerStyle={{ color: 'red' }}
            icon={open ? 'cog' : 'more'}
            color="white"
            fabStyle={{ backgroundColor: '#fc8953' }}
            actions={[
              {
                icon: 'qrcode-scan',
                label: 'QR Code',
                labelTextColor: '#000',
                labelStyle: { backgroundColor: '#fff' },
                style: { backgroundColor: '#fff' },
                onPress: () => setModalVisible(true),
              },
              {
                icon: 'wrench',
                label: 'Maintenance',
                labelTextColor: '#000',
                labelStyle: { backgroundColor: '#fff' },
                style: { backgroundColor: '#fff' },
                onPress: () => navigation.navigate("AssetMaintenanceScreen", details),
              },
              {
                icon: 'pencil',
                label: 'Update',
                labelTextColor: '#000',
                labelStyle: { backgroundColor: '#fff' },
                style: { backgroundColor: '#fff' },
                onPress: () => navigation.navigate("UpdateAssetScreen", details),
              },
            ]}

            onStateChange={onStateChange}
          />
        )}
      </Portal>
      <View style={{ marginHorizontal: 10, marginVertical: 10, padding: 5, marginBottom: 10 }}>
        {details?.images?.length > 0 ?
          <View style={{ marginBottom: 5, elevation: 1, height: 200 }}>
            <Swiper showsPagination={true}>
              {details.images?.map((image, index) => (
                <View key={index}>
                  <Image source={{ uri: global.url + image?.image_location }} style={{
                    width: '100%',
                    height: '100%',
                  }} />
                </View>
              ))}
            </Swiper>
          </View>
          :
          <View style={{ marginBottom: 5, elevation: 1, height: 200 }}>
            <Image
              source={require('../assets/noimage.jpg')}
              style={{ width: '100%', height: '100%', borderRadius: 5 }}
            />
          </View>
        }
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={styles.col_title}>Asset Code </Text>
          <Text style={styles.col_content}>{details.asset_code ? details.asset_code : 'N/A'}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={styles.col_title}>Description </Text>
          <Text style={styles.col_content}>{details.asset_description ? details.asset_description : 'N/A'}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={styles.col_title}>Type </Text>
          <Text style={styles.col_content}>{details.type ? details.type : 'N/A'}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={styles.col_title}>Original Location </Text>
          <Text style={styles.col_content}>{details.orig_loc ? details.orig_loc : 'N/A'}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={styles.col_title}>Current Location </Text>
          <Text style={styles.col_content}>{details.curr_loc === 'N/A' ? details.orig_loc : details.curr_loc}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={styles.col_title}>Original Price </Text>
          <Text style={styles.col_content}>{details.original_price ? details.original_price : 'N/A'}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={styles.col_title}>Current Price </Text>
          <Text style={styles.col_content}>{details.current_price ? details.current_price : 'N/A'}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={styles.col_title}>Status </Text>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            {details.status === 'Active' ?
              <View
                style={{ flex: 1, padding: 3, flexDirection: 'row', borderRadius: 5, justifyContent: 'center' }}>
                <Icon name='control-play' type="simple-line-icon" size={13} style={{ marginTop: 2 }} color={'green'} ></Icon>
                <Text adjustsFontSizeToFit style={{ color: 'green', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2 }}> {details.status ? details.status : 'N/A'}</Text>
              </View>
              : details.status === 'Idle' ?
                <View
                  style={{ flex: 1, padding: 3, flexDirection: 'row', borderRadius: 5, justifyContent: 'center' }}>
                  <Icon name='control-pause' size={13} style={{ marginTop: 2 }} color={'blue'} ></Icon>
                  <Text adjustsFontSizeToFit style={{ color: 'blue', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2 }}> {details.status ? details.status : 'N/A'}</Text>
                </View>
                : details.status === 'Under Repair' ?
                  <View
                    style={{ flex: 1, padding: 3, flexDirection: 'row', borderRadius: 5, justifyContent: 'center' }}>
                    <Icon name='wrench' size={13} style={{ marginTop: 2 }} color={'orange'} ></Icon>
                    <Text adjustsFontSizeToFit style={{ color: 'orange', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2 }}> {details.status ? details.status : 'N/A'}</Text>
                  </View>
                  :
                  <View
                    style={{ flex: 1, padding: 3, flexDirection: 'row', borderRadius: 5, justifyContent: 'center' }}>
                    <Icon name='trash' type="simple-line-icon" style={{ marginTop: 2 }} size={13} color={'red'} ></Icon>
                    <Text adjustsFontSizeToFit style={{ color: 'red', fontSize: 13, fontWeight: "bold", textTransform: 'uppercase', marginRight: 2 }}> {details.status ? details.status : 'N/A'}</Text>
                  </View>
            }
          </View>
        </View>
        {details.status === 'Active' &&
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={styles.col_title}>Purpose </Text>
          <Text style={styles.col_content}>{details.utilizationPurpose ? details.utilizationPurpose : 'N/A'}</Text>
        </View>
        }
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={styles.col_title}>Purchased Date </Text>
          <Text style={styles.col_content}>{details.purchase_date ? details.purchase_date : 'N/A'}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 3 }}>
          <Text style={styles.col_title}>Added by</Text>
          <Text style={styles.col_content}>{details.access_level ? details.access_level : 'N/A'}</Text>
        </View>
      </View>

      <Overlay
        transparent={true}
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <KeyboardAvoidingView enabled style={styles.modalView}>
            <Icon style={{alignSelf: 'flex-end'}} name="x" type="feather" onPress={() => setModalVisible(false)}>
            </Icon>
            <View style={{ padding: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: '#404040', fontSize: 20, fontWeight: 'bold' }}>{details.asset_code}</Text>
              </View>
              <View style={{ alignSelf: 'center', marginTop: 10 }}>
                <QRCode size={300}
                  value={details.asset_code}
                  getRef={(c) => (qrCodeRef.current = c)} // Attach the ref
                />
              </View>
            </View>
            <Button title="Download" buttonStyle={{ marginTop: 10 }} onPress={() => generateQRCode()}>
            </Button>
          </KeyboardAvoidingView>
        </View>
      </Overlay>
      <Toast/>
    </ScrollView>
  )
};

export default AssetDetailsScreen;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    minHeight: 450,
    backgroundColor: 'white',
    padding: 10,
  },
  col_title: { color: '#73706e', width: '45%', fontSize: 16, fontWeight: '400', fontFamily: 'Roboto' },
  col_content: { color: '#000', fontSize: 16, width: '55%', textAlign: 'right', fontFamily: 'Roboto' }
});