import React from 'react'
import { ScrollView, View, Text, Image, ActivityIndicator, TouchableHighlight } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AxiosService from '../AxiosService';

const SummonerDetails = ({navigation}) => {
    const [output, setOutput] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const [profile, setProfile] = useState([]);
    const [rank, setRank] = useState([]);
    const route = useRoute();

    const imgURL = (champion) =>{ 
        return 'http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/'+champion+'.png'
    }

    const profileIcon = (id) =>{ 
        return 'https://ddragon.leagueoflegends.com/cdn/12.17.1/img/profileicon/'+id+'.png'
    }

    const rankedIcon = (tier) => {
        let smallLetters = tier.toLowerCase();
        return 'https://opgg-static.akamaized.net/images/medals_new/'+smallLetters+'.png'
    }

    const returnWLP = (W, L) =>{
        let num = (W/(W+L))
        return parseFloat(num*100).toFixed(2);
    }

    const returnQType = (name) =>{
        switch(name){
            case "RANKED_SOLO_5x5": return "Ranked Solo/Duo"
            case "RANKED_FLEX_SR": return "Ranked Flex"
            default: return name
        }
    }

    const masteryIcon = (level) => {
        let url;
        if (level == 1) return 'https://static.wikia.nocookie.net/leagueoflegends/images/d/d8/Champion_Mastery_Level_1_Flair.png/'
        else if (level == 2) return 'https://static.wikia.nocookie.net/leagueoflegends/images/4/4d/Champion_Mastery_Level_2_Flair.png/'
        else if (level == 3) return 'https://static.wikia.nocookie.net/leagueoflegends/images/e/e5/Champion_Mastery_Level_3_Flair.png/'
        else if (level == 4) return 'https://static.wikia.nocookie.net/leagueoflegends/images/b/b6/Champion_Mastery_Level_4_Flair.png/'
        else if (level == 5) return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Champion_Mastery_Level_5_Flair.png/'
        else if (level == 6) return 'https://static.wikia.nocookie.net/leagueoflegends/images/b/be/Champion_Mastery_Level_6_Flair.png/'
        else return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/7a/Champion_Mastery_Level_7_Flair.png/'
        return url;
    }

    useEffect(() => {
        AxiosService.getChampions()
        .then(data => {
            var champarr = [];
            Object.keys(data).forEach(function(key){
                champarr.push(data[key]);
            })
            AxiosService.getSummonerId(route.params.name, route.params.server).then(response => {
                setProfile(response)
                var top3champs = [];
                var mastery = [];
                AxiosService.getSummonerMastery(response.id, route.params.server).then(res =>{
                    for (let i in res){
                        for (let j in champarr) {
                            if (champarr[j].key == res[i].championId) {
                              top3champs.push(champarr[j])
                              mastery.push(res[i])
                              break;
                            }
                        }
                    }
                    let viewOutput = [];
                    for (let i = 0; i < top3champs.length;i++){
                        let champion = top3champs[i];
                        let masteryTemp = mastery[i];
                        let tempItem = (
                            <View key={i} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableHighlight onPress={() => navigation.navigate('ChampionDetails', {name: champion.id})}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text>{champion.name}</Text>
                                        <Image
                                            style={{width: 50, height: 50}}
                                            source={{uri: imgURL(champion.id)}}
                                        />
                                    </View>
                                </TouchableHighlight>
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        style={{width: 50, height: 50}}
                                        source={{uri: masteryIcon(masteryTemp.championLevel)}}
                                    />
                                    <Text>{masteryTemp.championPoints} Points</Text>
                                </View>
                            </View>
                        );
                        viewOutput.push(tempItem);
                    }
                    AxiosService.getSummonerRank(response.id, route.params.server).then(re =>{
                        let rankTemp = [];
                        for(let i = 0; i < re.length;i++){
                            let ranked = re[i];
                            let tempItem = (
                                <View key={i} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>{returnQType(ranked.queueType)}:</Text>
                                    <Image
                                        style={{width: 50, height: 50}}
                                        source={{uri: rankedIcon(ranked.tier)}}
                                    />
                                    <Text>{ranked.tier} {ranked.rank}, {ranked.leaguePoints} LP</Text>
                                    <Text>{ranked.wins}W / {ranked.losses}L, {returnWLP(ranked.wins, ranked.losses)}%</Text>
                                </View>
                            );
                            rankTemp.push(tempItem);
                        }
                        setRank(rankTemp);
                        setOutput(viewOutput);
                        setIsLoading(false);
                    })
                })
            })
        }).catch(err => console.error(err))
  },[])  

  if(isLoading){
    return <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} size="large"/>
  }
    
    return (
        <ScrollView>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text>{profile.name}</Text>
                <Image
                    style={{width: 50, height: 50}}
                    source={{uri: profileIcon(profile.profileIconId)}}
                />
            </View>
            <View>
                {rank}
            </View>
            <View>
                {output}
            </View>
        </ScrollView>
    );
}

export default SummonerDetails