import React, { useContext, useRef } from 'react';
import { SafeAreaView } from 'react-native'; 
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Components/Navigation';
import { useSelector, useDispatch } from 'react-redux';
import LoginScreen from './LoginScreen';
import SplashScreen from './SplashScreen';

import { selectUserData, setUserData } from './redux/navSlice';
const RootStackNavigation = () => { 
    const userData = useSelector(selectUserData);
    return (
        <SafeAreaView style={{flex: 1}}>
            <NavigationContainer >
                    { 
                        !userData
                        ? <LoginScreen />
                        : <Navigation />
                    }
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default RootStackNavigation;