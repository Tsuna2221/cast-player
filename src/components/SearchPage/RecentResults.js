import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated, Dimensions } from 'react-native';
import style from './style'

const {  } = style

export default class RecentResults extends Component {
    render() {
        return (
            <Fragment>
                {
                    [].length > 0 ?
                        <View style={{marginTop: 12}}>
                            <Text style={{color: "#fff", marginLeft: 20, fontSize: 20, fontWeight: "bold"}}>Resultados Recentes</Text>
                        </View>
                    :
                        <Fragment/>
                }
            </Fragment>
        );
    }
}