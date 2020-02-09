import React, { Component, Fragment } from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"
import { NavigationActions, StackActions  } from 'react-navigation';

const { width } = Dimensions.get("window");

export default class FooterNavigator extends Component {
    render() {
        const { selected, navigate } = this.props
        const navItems = [
            {label: "Explorar", icon: "library-books"},
            {label: "Buscar", icon: "search"},
            {label: "Feeds", icon: "list"},
            {label: "Downloads", icon: "file-download"},
        ]

        return (
            <View style={{width: "100%", height: 50, backgroundColor: "#1D2939", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                {
                    navItems.map(({label, icon}, index) => {
                        const dispatchAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: label })],
                        });

                        return (
                            <TouchableOpacity key={label + index} onPress={selected !== label ? () => navigate(dispatchAction) : null}>
                                <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center", width: width / 4}}>
                                    <Icon name={icon} size={22} color={selected === label ? "#3E8BF0" : "#C5CACF"} />
                                    <Text style={{color: selected === label ? "#3E8BF0" : "#C5CACF", fontSize: 11}}>{label}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }
}