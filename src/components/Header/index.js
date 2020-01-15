import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated, Easing, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import LinearGradient from 'react-native-linear-gradient';

import style from './style'
const { mainHeader, buttonContainer, labelText } = style

const maxHeight = 115 - buttonContainer.height;

export default class Header extends Component {
    render() {        
        const { headerHeight, textOpacity, label } = this.props;

        return (
            <Animated.View style={{width: "100%", height: label ? headerHeight : 62.1, position: "absolute", overflow: "hidden", zIndex: 100}}>
                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#FF0055', '#046CA2']} style={[mainHeader]}>
                    <View style={[buttonContainer]}>
                        <TouchableOpacity onPress={() => null}>
                            <Icon size={30} name="menu" color="#fff"/>
                        </TouchableOpacity>
                        <Icon size={28} name="dots-vertical" color="#fff"/>
                    </View>
                    {
                        label ? 
                            <View style={{width: "100%", height: maxHeight}}>
                                <Animated.Text style={[labelText, { opacity: textOpacity }]}>{label}</Animated.Text>
                            </View>
                        :
                            null
                    }
                </LinearGradient>
            </Animated.View>
        );
    }

    state = {

    }
}