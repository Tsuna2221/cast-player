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
        this.collapseLabel()

        return (
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF0055', '#046CA2']} style={mainHeader}>
                <View style={[buttonContainer]}>
                    <TouchableOpacity onPress={() => null}>
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

    }

    collapseLabel = () => {
        const { viewPosition } = this.props, maxVal = 115 - buttonContainer.height;

        // toValue: viewPosition === 0 ? 115 - buttonContainer.height : viewPosition,
        Animated.timing(this.labelHeight, {
            toValue: viewPosition > maxVal ? 0 : viewPosition < 0 ? 0 : Math.abs(viewPosition - maxVal),
            duration: 1,
            easing: Easing.ease,
        }).start();
    }
}