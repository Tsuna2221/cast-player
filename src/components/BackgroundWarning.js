import React, { Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"

export default BackgroundWarning = ({margin, label, icon}) => (
    <View style={{width: "100%", marginTop: margin, flexDirection: "column", alignItems: "center"}}>
        <Icon name={icon} size={150} color="#364454"/>
        <Text style={{color: "#364454", fontWeight: "bold", fontSize: 18.5}}>{label}</Text>
    </View>
);