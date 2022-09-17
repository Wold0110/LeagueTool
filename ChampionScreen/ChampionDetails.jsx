import React from 'react'
import { useRoute } from '@react-navigation/native';
import { ScrollView, View, Text, Image, TouchableHighlight, ActivityIndicator} from 'react-native';
import { useState, useEffect } from 'react';
import AxiosService from '../AxiosService';

export const ChampionDetails = () => {
    const [output, setOutput] = useState([]);
    const [spells, setSpells] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const route = useRoute();
    var champarr = [];

    const imgURL = (champion) =>{ 
        return 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/'+champion+'_0.jpg'
    }

    const imgSpellURL = (ability) => {
        return 'http://ddragon.leagueoflegends.com/cdn/12.17.1/img/spell/'+ability+'.png'
    }
    
    const imgPassiveURL = (name) => {
        return 'http://ddragon.leagueoflegends.com/cdn/12.17.1/img/passive/'+name;
    }

    useEffect(() => {
        AxiosService.getChampionDetail(route.params.name)
        .then(data => {
            Object.keys(data).forEach(function(key){
                champarr.push(data[key]);
            }) 
            let spellOutput = [];
            for(let i = 0; i < champarr[0].spells.length;i++){
                let ability = champarr[0].spells[i];
                var tempItem = (
                    <View key={i} style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>{ability.name}</Text>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{uri: imgSpellURL(ability.id)}}
                            />
                        <Text>{ability.description}</Text>
                    </View>
                );
                spellOutput.push(tempItem);
              }
            setOutput(champarr[0]);
            setSpells(spellOutput);
            setIsLoading(false);
        }).catch(err => console.error(err))
    },[])  

    if(isLoading){
        return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size="large"/>
    }

    return (
        <ScrollView>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    style={{width: 308, height: 560}}
                    source={{uri: imgURL(route.params.name)}}
                />
                <Text>{output.name}</Text>
                <Text>Abilities</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text>{output.passive.name}</Text>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{uri: imgPassiveURL(output.passive.image.full)}}
                            />
                        <Text>{output.passive.description}</Text>
                    </View>
                <View>{spells}</View>
            </View>
        </ScrollView>
    )
}
