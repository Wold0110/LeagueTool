import React, { Component } from 'react'
import { useRoute } from '@react-navigation/native';
import { ScrollView, View, Text, Image, TouchableHighlight, ActivityIndicator, Dimensions, ImageBackground} from 'react-native';
import { useState, useEffect } from 'react';
import AxiosService from '../AxiosService';

export const ChampionDetails = () => {
    const [output, setOutput] = useState([]);
    const [spells, setSpells] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [opacity, setOpacity] = useState();
    
    const route = useRoute();
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

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

    const handleScroll = (event) => {
        let opacity;
        if((event.contentOffset.y/240) <= 0.5){
            opacity = (event.contentOffset.y/240)
        }
        else {
            opacity = 0.5;
        }
        setOpacity(opacity);
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
                    <View style={{backgroundColor:'rgba(0,0,0,0.6)', marginTop:20, padding:10 }} key={i}>
                        <Text style={{ color:'white' }}>{ability.name}</Text>
                        <Image
                            style={{width: 50, height: 50}}
                            source={{uri: imgSpellURL(ability.id)}}
                            />
                        <Text style={{ color:'white', textAlign:'justify' }}>{ability.description}</Text>
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
        return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }} size="large" color="#F2EFDE"/>
    }

    return (
        <ImageBackground style={{width: windowWidth, height: windowHeight}} source={{uri: imgURL(route.params.name)}}>
            <ScrollView style={{ backgroundColor:'rgba(0,0,0,'+opacity+')' }} scrollEventThrottle={16} onScroll={({nativeEvent}) => {handleScroll(nativeEvent)}}>
                    <View style={{ marginTop: windowHeight, padding:30}}>
                        <Text style={{ fontSize:30, textAlign: 'center', color:'#fff', fontWeight:'bold' }}>{output.name}</Text>
                        <Text style={{ color:'white' }}>Abilities</Text>
                        <View style={{backgroundColor:'rgba(0,0,0,0.6)', marginTop:20, padding:10 }}>
                            <Text style={{ color:'white' }}>{output.passive.name}</Text>
                            <Image
                                style={{width: 50, height: 50}}
                                source={{uri: imgPassiveURL(output.passive.image.full)}}
                                />
                            <Text style={{ color:'white', textAlign:'justify' }}>{output.passive.description}</Text>
                        </View>
                        <View>{spells}</View>
                    </View>
                </ScrollView>
        </ImageBackground>
    )
}
