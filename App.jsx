import * as React from 'react';
import {useState} from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import ChampionScreen from './ChampionScreen';

const APIURLBASE = 'http://ddragon.leagueoflegends.com/cdn';


function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
    </View>
  );
}

function SummonerScreen(){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Summoners</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() { 
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Champions" component={ChampionScreen} />
        <Tab.Screen name="Summoners" component={SummonerScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};