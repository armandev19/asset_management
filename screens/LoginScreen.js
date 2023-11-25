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
import {Card, Title, Paragraph, Divider, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData } from './redux/navSlice';
import { useDispatch } from 'react-redux';
import Loader from './Components/loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
 
const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
 
  const passwordInputRef = createRef();
  
  const dispatch = useDispatch();
  
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
    let dataToSend = {email: userEmail, password: userPassword};
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
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //Hide Loader
        setLoading(false);
        // If server response message same as Data Matched
        if (responseJson.status === 'success') {
          AsyncStorage.setItem('user_id', JSON.stringify(responseJson.user_data));
          dispatch(setUserData(responseJson.user_data));
          navigation.replace('DrawerNavigationRoutes');
        } else {
          setErrortext(responseJson.message);
          console.log('Please check your email id or password');
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };
 
  return (
    <View style={styles.mainBody}>
      <LinearGradient
          colors={['#348ceb', 'white' ]}
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
        <Icon style={{fontSize: 100, color: 'green', textAlign: 'center', color: '#FFFFFF'}} name="devices"></Icon>
        <Text style={{textAlign: 'center', fontSize: 25, fontWeight: 'bold', marginBottom: 10, color: '#FFFFFF'}}>ASSET MANAGEMENT</Text>
        <View style={{
          backgroundColor: 'transparent', 
          marginLeft: 20,
          marginRight: 20,
          height: 200,
          justifyContent: 'center',
        }}>
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={{
                  width: '70%', 
                  backgroundColor: 'white', 
                  color: '#000',
                  borderRadius: 20,
                  paddingLeft: 20,
                  fontSize: 18,
                  elevation: 5
                }}
                placeholder="Username"
                placeholderTextColor={"gray"}
                value={userEmail}
                onChangeText={userEmail => setUserEmail(userEmail)}
							/>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={{
                  width: '70%', 
                  backgroundColor: 'white', 
                  color: '#000',
                  borderRadius: 20,
                  paddingLeft: 20,
                  fontSize: 18,
                  elevation: 5
                }}
                placeholder="Password"
                placeholderTextColor={"gray"}
                value={userPassword}
                onChangeText={userPassword => setUserPassword(userPassword)}
                secureTextEntry={true}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}>
                {errortext}
              </Text>
            ) : null}
            <View style={[styles.SectionStyle, {
                alignSelf: 'center',
                width: '50%',
            }]}>
              <TouchableOpacity style={{
                padding: 5, 
                flex: 1, 
                borderRadius: 5,
                backgroundColor: '#4988e6',
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