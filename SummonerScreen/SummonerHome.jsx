import React from 'react'
import { useState } from 'react';
import {View, Button, TextInput, TouchableOpacity, Text} from 'react-native'
import {Picker} from '@react-native-picker/picker';

export const SummonerHome = ({navigation}) => {
  const [summonerName, setSummonerName] = useState("");
  const [selectedServer, setSelectedServer] = useState();

  return (
    <View style={{ marginTop: 50, padding: 30 }}>
      <TextInput 
        onChangeText={setSummonerName}
        value={summonerName}
        placeholder={"Write summoner's name here"}
        placeholderTextColor="#fff"
        style={{ backgroundColor:'#1E374B', elevation:8, marginBottom:15, height:50, color:'white' }}
      />
      <Picker
        selectedValue={selectedServer}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedServer(itemValue)
        }
        style={{ color: 'white', elevation: 8, marginBottom: 15, backgroundColor:'#1E374B', height:50  }}
        mode={"dropdown"}
        dropdownIconColor={'white'}
        dropdownIconRippleColor={"#6E908B"}
        >
        <Picker.Item label="Select a server!" enabled={false} />
        <Picker.Item label="Europe Nordic and East" value="eun1" />
        <Picker.Item label="Europe West" value="euw1" />
        <Picker.Item label="North America" value="na1" />
        <Picker.Item label="Korea" value="kr" />
        <Picker.Item label="Japan" value="jp1" />
        <Picker.Item label="Latin America North" value="la1" />
        <Picker.Item label="Latin America South" value="la2" />
        <Picker.Item label="Oceania" value="oc1" />
        <Picker.Item label="Russia" value="ru" />
        <Picker.Item label="Turkey" value="tr1" />
      </Picker>
      <TouchableOpacity style={{ borderRadius: 10, height: 45, backgroundColor: '#6E908B', elevation:8 }} onPress={() => navigation.navigate('SummonerDetails', {
          name: summonerName,
          server: selectedServer
        })}>
          <Text style={{ fontSize:30, textAlign: 'center', alignSelf:'center', color:'#fff', fontWeight:'bold' }}>
            Search
          </Text> 
        </TouchableOpacity>
    </View>
  )
}