import React, { Component, Fragment } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"
import { NavigationActions, StackActions  } from 'react-navigation';

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
            <View style={{width: "100%", height: 45, backgroundColor: "#0B0A17", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                {
                    navItems.map(({label, icon}, index) => {
                        const dispatchAction = StackActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({ routeName: label })],
                        });

                        return (
                            <TouchableOpacity key={label + index} onPress={selected !== label ? () => navigate(dispatchAction) : null}>
                                <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center", width: 50}}>
                                    <Icon name={icon} size={22} color={selected === label ? "#FF0055" : "#C7C7C7"} />
                                    <Text style={{color: selected === label ? "#FF0055" : "#C7C7C7", fontSize: 11}}>{label}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }
}