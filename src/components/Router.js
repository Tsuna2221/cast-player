import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from "react-native-vector-icons/MaterialIcons"

import Explore from "./Explore"

const TabNavigator = createBottomTabNavigator(
    {
        Explorar: {
            screen: Explore,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name="library-books" size={22} color={tintColor} />
            }
        },
        Buscar: {
            screen: () => <View/>,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name="search" size={22} color={tintColor} />
            }
        },
        Feeds: {
            screen: () => <View/>,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name="list" size={22} color={tintColor} />
            }
        },
        Downloads: {
            screen: () => <View/>,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name="file-download" size={22} color={tintColor} />
            }
        },
    },
    {
        initialRouteName: 'Explorar',
        tabBarOptions: {
            style: {
                height: 45,
                backgroundColor: "#0B0A17"
            },
            activeTintColor: "#FF0055",
            inactiveTintColor: "#C7C7C7" 
        }
    }
);

export default createAppContainer(TabNavigator);