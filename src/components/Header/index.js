import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated, Easing, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import LinearGradient from 'react-native-linear-gradient';

import style from './style'
const { mainHeader, buttonContainer, labelText } = style

export default class Header extends Component {
    constructor () {
        super()
        this.labelHeight = new Animated.Value(115 - buttonContainer.height);
    }

    render() {
        return (
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF0055', '#046CA2']} style={mainHeader}>
                <View style={[buttonContainer]}>
                    <TouchableOpacity onPress={this.collapseLabel}>
                        <Icon size={30} name="menu" color="#fff"/>
                    </TouchableOpacity>
                    <Icon size={28} name="dots-vertical" color="#fff"/>
                </View>
                <Animated.View style={{width: "100%", height: this.labelHeight, overflow: "hidden"}}>
                    <Text style={[labelText]}>Explorar</Text>
                </Animated.View>
            </LinearGradient>
        );
    }

    state = {
        collapsed: false,
    }

    collapseLabel = () => {
        const { collapsed } = this.state;

        Animated.timing(
            this.labelHeight,
            {
                toValue: collapsed ? 115 - buttonContainer.height : 0,
                duration: 200,
                easing: Easing.ease,
            }
        ).start(() => this.setState({collapsed: !collapsed}))
    }
}