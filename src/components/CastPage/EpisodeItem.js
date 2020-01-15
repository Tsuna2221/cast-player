import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated, Dimensions } from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'

import style from './style'

const { rowAlign, textTitle, newContainer } = style
const { width } = Dimensions.get('window');

export default class EpisodeItem extends Component {
    render() {
        const { cover, episode: { title, published, enclosures: [{ url, length, mimeType }], itunes: { duration, image } } } = this.props 
        const color = "#E1E1E1"
        const newDimensions = {
            marginLeft: 5.5,
            marginRight: 18,
            width: 44,
        }
        const interval = width - (Object.keys(newDimensions).map(key => newDimensions[key]).reduce((total, num) => total + num) + 14)
        
        return (
            <View style={{width: "100%", paddingHorizontal: 14}}>
                <View style={[rowAlign, { justifyContent: "space-between" }]}>
                    <Image style={{width: 55, height: 55}} source={{uri: cover}}/>
                    <Text numberOfLines={2} style={[textTitle, {color}]}>{title}</Text>
                    <MCIcons name="dots-horizontal" color={color} size={30}/>
                </View>
                <View style={rowAlign}> 
                    <Text style={[newContainer, newDimensions, {color, height: 16}]}>Novo</Text>
                    <View style={[rowAlign, {width: interval, justifyContent: "space-between", borderBottomColor: "#9D9D9D", borderBottomWidth: 1, paddingVertical: 12}]}>
                        <View style={{flexDirection: "row"}}>
                            <View style={rowAlign}>
                                <Icon size={21} name="event" color={color}/>
                                <Text style={{color, fontSize: 14.5, marginLeft: 3}}>{"Wed, 08 Jan 2020"}</Text>
                            </View>
                            <View style={[rowAlign, {marginLeft: 6}]}>
                                <Icon size={21} name="timer" color={color}/>
                                <Text style={{color, fontSize: 14.5, marginLeft: 3}}>{duration}</Text>
                            </View>
                        </View>
                        <Icon name="favorite-border" size={21} color={color} style={{paddingRight: 18}}/>
                    </View>
                </View>
            </View>
        );
    }
}