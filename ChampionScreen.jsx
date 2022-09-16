import React from 'react'
import { ScrollView, View, Text } from 'react-native';
import { useState, useEffect } from 'react';
import AxiosService from './AxiosService';

const ChampionScreen = () => {
    const [champions, setChampions] = useState([]);
    var output = [];

    useEffect(() => {
      AxiosService.getChampions()
      .then(data => {
        setChampions(data);
        var champarr =[];
        Object.keys(champions).forEach(function(key){
          champarr.push(champions[key]);
        }) 
        for(let i = 0; i < champarr.length;i++){
          let champion = JSON.parse(JSON.stringify(champarr[i]))
          var tempItem = (
            <View key={i}>
              <Text>{champion.name}</Text>
            </View>
          );
          console.log(champarr[i])
          output[i] = (tempItem);
        }
        console.log(output);
      }).catch(err => console.error(err))
    },[])

    return (
      <ScrollView>
        <View>
          {output}
        </View>
      </ScrollView>
    )
}

export default ChampionScreen