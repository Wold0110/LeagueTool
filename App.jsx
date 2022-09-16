import * as React from 'react';
import { View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ChampionHome } from './ChampionScreen/ChampionHome';
import SummonerScreen from './SummonerScreen';
import { ChampionDetails } from './ChampionScreen/ChampionDetails';

const APIURLBASE = 'http://ddragon.leagueoflegends.com/cdn';


function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={() => navigation.navigate('Champions')} title="Champions"></Button>
      <Button onPress={() => navigation.navigate('Summoners')} title="Summoners"></Button>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() { 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Champions" component={ChampionHome} />
        <Stack.Screen name="Summoners" component={SummonerScreen} />
        <Stack.Screen name="ChampionDetails" component={ChampionDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};