import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated, Dimensions } from 'react-native';


//Context
import { FeedContext } from '../../contexts/FeedContext'

const { width } = Dimensions.get("window");

export default class Feed extends Component {
    static contextType = FeedContext;

    render() {
        const { storedCasts } = this.context;
        
        return (
            <View style={{flexWrap: "wrap", width: "100%", flexDirection: "row"}}>
                {
                    storedCasts.map((cast) => <Image style={{width: width/3, height: width/3}} resizeMode="contain" source={{uri: cast.artworkUrl600}}/>)
                }
            </View>
        );
    }
}