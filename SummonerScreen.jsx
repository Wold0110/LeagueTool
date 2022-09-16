import React from 'react'
import { ScrollView, View, Text, Image, TouchableHighlight, } from 'react-native';
import { useState, useEffect } from 'react';
import AxiosService from './AxiosService';

const SummonerScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Summoners</Text>
        </View>
    );
}

export default SummonerScreen