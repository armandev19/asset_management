import React, {useState, createRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData, setFCMToken } from './redux/navSlice';
import { useDispatch } from 'react-redux';
import Loader from './Components/loader';
import { Input, Icon, BottomSheet, ListItem, Dialog, Button, Divider } from '@rneui/themed';

import * as firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';



const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [deviceToken, setDeviceToken] = useState()
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const passwordInputRef = createRef();
  
  const dispatch = useDispatch();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      dispatch(setFCMToken(fcmToken));
      setDeviceToken(fcmToken);
      console.log('FCM Token:', fcmToken);
    } else {
      console.log('Failed to get FCM token');
    }
  };
  
  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {email: userEmail, password: userPassword, deviceToken: deviceToken};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    fetch(global.url+'loginValidation.php', {
      method: 'POST',
      body: formBody,
      headers: { 
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson)
        setLoading(false);
        if (responseJson.status === 'success') {
          AsyncStorage.setItem('user_id', JSON.stringify(responseJson.user_data));
          dispatch(setUserData(responseJson.user_data));
        } else {
          setErrortext(responseJson.message);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error', error);
      });
  };

  useEffect(()=>{
    getFcmToken();
  }, [])
 
  return (
    <View style={styles.mainBody}>
      <LinearGradient
          colors={['#fae5d7','#fae5d7' ]}
          style={styles.mainBody}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 2 }}
        >
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Image
          source={require('../assets/amslogo.png')}
          style={{width: 150, height: 150, justifyContent: 'center', alignSelf: 'center' ,borderRadius: 5}}
        />
        <Text style={{textAlign: 'center', fontSize: 27, fontWeight: 'bold', color: '#f5571d'}}>Asset</Text>
        <Text style={{textAlign: 'center', fontSize: 27, fontWeight: 'bold', marginBottom: 10, color: '#f5571d'}}>Management System</Text>
        <View style={{
          backgroundColor: 'transparent', 
          marginLeft: 20,
          marginRight: 20,
          height: 200,
          justifyContent: 'center',
        }}>
          <KeyboardAvoidingView enabled>
            <View>
              <Input
                labelStyle={{ fontWeight: '400', fontSize: 13 }}
                inputContainerStyle={{ borderBottomColor: 'transparent', borderRadius: 20, height: 40, backgroundColor: 'white', elevation: 1, width: '70%', alignSelf: 'center', marginBottom: -10}}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Username"}
                value={userEmail}
                onChangeText={userEmail => setUserEmail(userEmail)}
                leftIcon={{type: "feather", name: "user", color: '#f5571d', size: 17, marginLeft: 10}}
              />
              <Input
                labelStyle={{ fontWeight: '400', fontSize: 13 }}
                inputContainerStyle={{ borderBottomColor: 'transparent', borderRadius: 20, height: 40, backgroundColor: 'white', elevation: 1, width: '70%', alignSelf: 'center'}}
                inputStyle={{ fontSize: 15 }}
                placeholder={"Password"}
                value={userPassword}
                onChangeText={userPassword => setUserPassword(userPassword)}
                leftIcon={{type: "feather", name: "lock", color: '#f5571d', size: 17, marginLeft: 10}}
                rightIcon={{type: "feather", name: showPassword ? "eye" : "eye-off", color: '#f5571d', size: 17, marginRight: 10, onPress: ()=>toggleShowPassword()}}
                secureTextEntry={!showPassword}
                errorMessage={errortext}
                errorStyle={{textAlign: 'center'}}
              />
            </View>
            <View style={[styles.SectionStyle, {
                alignSelf: 'center',
                width: '50%',
            }]}>
              <TouchableOpacity style={{
                padding: 5, 
                flex: 1, 
                borderRadius: 5,
                backgroundColor: '#f5571d',
                height: 38,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 5
                }} 
                onPress={() => handleSubmitPress()}>
                <Text style={{justifyContent: 'center', color: "#fff", fontWeight: '700', fontSize: 18}}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      </LinearGradient>
    </View>
  );
};
export default LoginScreen;
 
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#348ceb',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#59d46b',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#00b300',
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    color: 'black',
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    backgroundColor: 'white'
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  appNameStyle: { 
    fontSize: 45,
    fontWeight: 'bold',
    color: 'blue',
    fontFamily: '',
    textAlign: 'center'
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 200,
    width: 350,
  },
});