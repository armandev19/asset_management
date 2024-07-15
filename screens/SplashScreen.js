import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  Image
} from 'react-native';
 
import AsyncStorage from '@react-native-async-storage/async-storage';
 
const SplashScreen = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
 
  // useEffect(() => {
  //   setTimeout(() => {
  //     setAnimating(false);
  //     //Check if user_id is set or not
  //     //If not then send for Authentication
  //     //else send to Home Screen
  //     AsyncStorage.getItem('user_id').then((value) =>
  //       navigation.replace(
  //         value === null ? 'Auth' : 'DrawerNavigationRoutes'
  //       ),
  //     );
  //   }, 5000);
  // }, []);
 
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/amslogo.png')}
        style={{width: 100, height: 100, alignSelf: 'center', borderRadius: 5}}
      />
      <View style={{justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
        <ActivityIndicator
          animating={animating}
          color="#f5571d"
          size="large"
          style={styles.activityIndicator}
        />
        <Text style={{color: "#f5571d", fontSize: 18, fontWeight: '700'}}>Loading . . .</Text>
      </View>
    </View>
  );
};
 
export default SplashScreen;
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fae5d7',
  },
  activityIndicator: {
    alignItems: 'center',
    marginRight: 20,
    height: 80,
  },
});
