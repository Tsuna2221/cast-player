import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated } from 'react-native';

import style from './style'
const {  } = style

export default class  extends Component {
    render() {
        const { label, items } = this.props;

        return (
            <View style={{marginTop: 14, marginBottom: 2}}>
                <Text style={{color: "#fff", marginLeft: 20, fontSize: 20, fontWeight: "bold"}}>{label}</Text>
                <ScrollView horizontal>
                    {
                        items.map(({artworkUrl100, name, artistName, id}, index) => {
                            return (
                                <View key={id} style={{flexDirection: "column", maxWidth: 116, marginTop: 15, marginLeft: index === 0 ? 20 : 8}}>
                                    <View key={id} style={{ backgroundColor: "#ff0055" }}>
                                        <Image style={{width: 116, height: 116}} source={{uri: artworkUrl100}}/>
                                    </View>
                                    <Text numberOfLines={1} style={{color: "#fff", fontWeight: "600", fontSize: 16, marginTop: 4}}>{name}</Text>
                                    <Text numberOfLines={1} style={{color: "#9D9D9D", fontWeight: "600", fontSize: 14}}>{artistName}</Text>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        );
    }
}
