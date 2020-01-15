import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated, Dimensions } from 'react-native';
import TextTicker from 'react-native-text-ticker'
import Icon from 'react-native-vector-icons/MaterialIcons'

import style from './style'

const { footContainer } = style

export default class FooterPlayer extends Component {
    render() {
        const { uri, artist, title } = {
            uri: "http://jogabilida.de/wp-content/uploads/2018/02/logo-naogames.jpg",
            artist: "Jogabilidade",
            title: "Fora da Caixa #77: Coringa, Kamen Rider 01, Midsommar (Com Spoilers)"
        }

        return (
            <View style={footContainer}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image style={{width: 42, height: 42}} source={{uri}}/>
                    <View style={{width: "60%", marginLeft: 8}}>
                        <TextTicker
                            style={{color: "#e1e1e1", fontWeight: "bold", fontSize: 16}}
                            duration={10000}
                            loop
                            bounce
                            repeatSpacer={30}
                            marqueeDelay={2300}
                        >{title}</TextTicker>
                        <TextTicker
                            style={{color: "#9D9D9D", fontWeight: "500", fontSize: 14.5, marginTop: 2}}
                            duration={10000}
                            loop
                            bounce
                            repeatSpacer={30}
                            marqueeDelay={2300}
                        >{artist}</TextTicker>
                    </View>
                </View>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Icon name="fast-rewind" size={24} color="#e1e1e1"/>
                    <Icon name="play-arrow" size={38} style={{marginHorizontal: 8}} color="#e1e1e1"/>
                    <Icon name="fast-forward" size={24} color="#e1e1e1"/>
                </View>
            </View>
        );
    }
}