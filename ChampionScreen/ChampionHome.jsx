import React from 'react'
import { ScrollView, View, Text, Image, TouchableHighlight, ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import AxiosService from '../AxiosService';

export const ChampionHome = ({navigation}) => {
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const imgURL = (champion) =>{ 
    return 'http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/'+champion+'.png'
    }

  useEffect(() => {
    AxiosService.getChampions()
    .then(data => {
      var champarr = [];
      let axiosOutput = [];
      Object.keys(data).forEach(function(key){
        champarr.push(data[key]);
      }) 
      for(let i = 0; i < champarr.length;i++){
        let champion = JSON.parse(JSON.stringify(champarr[i]));
        var tempItem = (
          <TouchableHighlight key={i} onPress={() => navigation.navigate('ChampionDetails', {
            name: champion.id
          })}>
            <View>
              <Text>{champion.name}</Text>
              <Image
                  style={{width: 50, height: 50}}
                  source={{uri: imgURL(champion.id)}}
                  />
            </View>
          </TouchableHighlight>
        );
        axiosOutput.push(tempItem);
      }
      setOutput(axiosOutput)
      setIsLoading(false);
    }).catch(err => console.error(err))
  },[])  

  if(isLoading){
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size="large"/>
  }

  return (
    <ScrollView>
      <View>
        { output }
      </View>
    </ScrollView>
  )
}
