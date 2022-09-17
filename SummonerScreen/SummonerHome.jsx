import React from 'react'
import { useState } from 'react';
import {View, Button, TextInput} from 'react-native'
import {Picker} from '@react-native-picker/picker';

export const SummonerHome = ({navigation}) => {
  const [summonerName, setSummonerName] = useState("");
  const [selectedServer, setSelectedServer] = useState();

  return (
    <View>
      <TextInput 
        onChangeText={setSummonerName}
        value={summonerName}
        placeholder={"Write summoner's name here"}
        style={{
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        }}
      />
      <Picker
        selectedValue={selectedServer}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedServer(itemValue)
        }
        mode={"dropdown"}
        dropdownIconRippleColor={"gray"}
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
      <Button onPress={() => navigation.navigate('SummonerDetails', {
          name: summonerName,
          server: selectedServer
        })} title="Search">
      </Button>
    </View>
  )
}