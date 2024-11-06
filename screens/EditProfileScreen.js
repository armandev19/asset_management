import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Avatar, Card, Title, Paragraph, Button, Snackbar } from 'react-native-paper';
import Loader from './Components/loader';

const EditProfileScreen = ({navigation, route}) => {
    const params = route.params
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState('');
    const [firstname, setFirstname] = useState(params.firstname);
    const [middlename, setMiddlename] = useState(params.middlename);
    const [lastname, setLastname] = useState(params.lastname);
    const [bloodtype, setBloodType] = useState(params.bloodtype);
    const [age, setAge] = useState(params.age);
    const [phone_number, setPhoneNumber] = useState(params.phone_number);
    const [email, setEmail] = useState(params.email);
    const [address, setAddress] = useState(params.address);
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    const updateUserData = () => {
        let user_id = params.id
        let dataToSend = {
            firstname: firstname, 
            middlename: middlename, 
            lastname: lastname, 
            age: age,
            phone_number: phone_number, 
            email: email, 
            address: address,
            user_id: user_id,
            bloodtype: bloodtype
        };
        let formBody = [];
        for (let key in dataToSend) {
          let encodedKey = encodeURIComponent(key);
          let encodedValue = encodeURIComponent(dataToSend[key]);
          formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        
        setLoading(true);
        fetch(global.url+'updateProfile.php', {
          method: 'POST',
          body: formBody,
          headers: { "bypass-tunnel-reminder": "true",
            'Content-Type':
            'application/x-www-form-urlencoded;charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            AsyncStorage.removeItem('user_id');
            setLoading(false);
            AsyncStorage.setItem('user_id', JSON.stringify(responseJson.user_data));
            
            setTimeout(async()=> {
                try {
                    await AsyncStorage.getItem('user_id').then(JSON.parse).then(value => {
                        setUserData(value);
                    });
                    } catch (error) {
                        console.log(error);
                    }
            }) 
            setVisible(true);
          })
          .catch((error) => {
            setLoading(false);
            console.error(error);
          });
      }

    useFocusEffect(
        React.useCallback(() => {
        let isActive = true

        const fetchList = async () => {
            try {
            await AsyncStorage.getItem('user_id').then(JSON.parse).then(value => {
                setUserData(value);
            });
            } catch (error) {
            console.log(error);
            }
        }
        fetchList()
        return () => {
            isActive = false
        }
        }, []),
    );

  return (
    <SafeAreaView style={{flex: 1, padding: 10}}>
      <View style={{flex: 1, padding: 8, backgroundColor: '#fff', borderRadius: 5}}>
        
        <Loader loading={loading} />
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Firstname: </Text>
          <TextInput value={firstname} placeholder="ENTER HERE..." style={styles.textInputChild} onChangeText={(text) =>
                    setFirstname(text)}/>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Middlename: </Text>
          <TextInput value={middlename} style={styles.textInputChild} onChangeText={(text) =>
                    setMiddlename(text)}></TextInput>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Lastname: </Text>
          <TextInput value={lastname} style={styles.textInputChild} onChangeText={(text) =>
                    setLastname(text)}></TextInput>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Age: </Text>
          <TextInput keyboardType='numeric' value={age} style={styles.textInputChild} onChangeText={(text) =>
                    setAge(text)}></TextInput>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Bloodtype: </Text>
          <TextInput value={bloodtype} style={styles.textInputChild} onChangeText={(text) =>
                    setBloodType(text)}></TextInput>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Phone No.: </Text>
          <TextInput value={phone_number} style={styles.textInputChild} onChangeText={(text) =>
                    setPhoneNumber(text)}></TextInput>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Email: </Text>
          <TextInput value={email} style={styles.textInputChild} onChangeText={(text) =>
                    setEmail(text)}></TextInput>
        </View>
        <View style={styles.item}>
          <Text adjustsFontSizeToFit style={styles.textTitle}>Address: </Text>
          <TextInput value={address} multiline numberOfLines={4} style={styles.textInputChild} onChangeText={(text) =>
                    setAddress(text)}></TextInput>
        </View>
        
        <Button icon="check-underline" buttonColor="black" mode="contained" style={{marginTop: 20}} onPress={() => updateUserData()}>
          Save
        </Button>
        {/* <Button onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button> */}
        <Snackbar
            visible={visible}
            duration={2000}
            onDismiss={onDismissSnackBar}
            >
            UPDATE SUCCESS!
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
item: {
  flexDirection: 'row',
  padding: 5,
  backgroundColor: '#fff',
  marginBottom: 3,
  borderRadius: 3,
},
textTitle: {
  width: '30%',
  color: '#3d3d3d',
  fontWeight: 'bold',
  alignSelf: 'center',
  fontSize: 15,
  textTransform: 'uppercase',
},
textInputChild: {
  width: '65%',
  color: 'black',
  alignSelf: 'center',
  fontSize: 12,
  borderColor: 'black',
  height: 32,
  borderWidth: 1,
  borderRadius: 5,
},
})
 
export default EditProfileScreen;