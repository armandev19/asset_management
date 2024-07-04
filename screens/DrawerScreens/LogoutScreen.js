import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Modal, ToastAndroid, Alert, TextInput, RefreshControl} from 'react-native';
import {Card, Title, Paragraph, Divider, List, Button, IconButton, Searchbar, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from './../Components/loader';
import { selectUserData, setUserData } from '../redux/navSlice';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const LogoutScreen = ({navigation, route}) => {

const [loading, setLoading] = useState(false);
const [assets, setAssets] = useState([]);
const [selectedId, setSelectedId] = useState(null);
const [userdata, setUserData] = useState('');
const [search, setSearch] = useState('');

const currentUserData = useSelector(selectUserData);

useEffect(()=>{
}, [])

  return (
      <View style={{justifyContent: 'center', backgroundColor: '#f2f3f8', marginTop: 40}}>
        <Loader loading={loading} />
        <View styles={{flex: 1, padding: 6, alignSelf: 'center'}}>
        </View>
      </View>
  )
};

 
export default LogoutScreen;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 1,
    marginLeft: 8,
  },
  textTitle: {
    width: '30%',
    color: '#3d3d3d',
    fontWeight: "bold",
    fontSize: 12,
    textTransform: 'uppercase'
  },
  textChild: {
    width: '70%',
    color: '#404040',
    flex: 1,
    fontSize: 12,
    marginLeft: 6,
    textTransform: 'uppercase'
  },
  assetContainer: {
    padding: 10,
    width: '100%',
    backgroundColor: 'white',
    color: 'white',
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 5,
  },
  TouchableOpacityStyle: {
    //Here is the trick
    backgroundColor: "red",
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  searchBox: {
    marginTop: 8,
    marginBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 1,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 20,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  }
});