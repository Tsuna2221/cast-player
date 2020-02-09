import React, { Fragment } from 'react';
import { View, Text, TouchableNativeFeedback, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

export default DownloadNav = ({navigation, currentTab, update}) => (
    <View style={{flexDirection: "row"}}>
        {
            navigation.map(label => (
                <TouchableNativeFeedback onPress={() => update(label)} key={label}>
                    <View style={{width: width / navigation.length, height: 60, justifyContent: "center", alignItems: "center", borderBottomColor: currentTab === label ? "#ff0055" : "transparent", borderBottomWidth: 3}}>
                        <Text style={{color: "#C5CACF", fontSize: 14, fontWeight: currentTab === label ? "bold" : "normal"}}>{label}</Text>
                    </View>
                </TouchableNativeFeedback>
            ))
        }        
    </View>
);