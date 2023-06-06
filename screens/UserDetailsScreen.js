import React from 'react';
import {View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {Card, Title, Paragraph, Divider, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserDetailsScreen = ({route, navigation}) => {
  console.log("params"+route.params.age)
    return (
      <ScrollView style={{padding: 10}}>
        <Card>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
            <Card.Title  />
            <Card.Content>
              <Text variant="titleLarge" style={{color: 'black'}}>Original Location: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}></Text></Text>
              <Text variant="titleLarge" style={{color: 'black'}}>Current Location: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}></Text></Text>
              <Text variant="titleLarge" style={{color: 'black'}}>Original Price: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}></Text></Text>
              <Text variant="titleLarge" style={{color: 'black'}}>Current Price: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}></Text></Text>
              <Text variant="titleLarge" style={{color: 'black'}}>Purchased Date: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}></Text></Text>
              <Text variant="titleLarge" style={{color: 'black'}}>Added By: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}></Text></Text>
              <Text variant="titleLarge" style={{color: 'black'}}>Status: <Text style={{color: 'black', textTransform: 'uppercase', fontWeight: 'bold'}}></Text></Text>
            </Card.Content>
            <Card.Actions style={{justifyContent: 'flex-end'}}>
              <Button icon="pencil" mode="contained" style={{marginRight: 5}} onPress={() => navigation.navigate("UpdateAssetScreen")}></Button>
              <Button icon="delete" color="red" mode="contained"></Button>
            </Card.Actions>
        </Card>
    </ScrollView>
    )  
};
 
export default UserDetailsScreen;