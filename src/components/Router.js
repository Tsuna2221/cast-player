import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from "react-native-vector-icons/MaterialIcons"
import { createStackNavigator } from 'react-navigation-stack';

import Temp from './Temp'

import Explore from "./Explore"
import CastPage from "./CastPage"

const StackRoutes = {
    Explorar: {
        screen: (props) => <Temp {...props} headLabel="Explorar"><Explore {...props}/></Temp>
    },
    Buscar: {
        screen: (props) => <Temp {...props} headLabel="Buscar"></Temp>
    },
    Feeds: {
        screen: (props) => <Temp {...props} headLabel="Feeds"></Temp>
    },
    Downloads: {
        screen: (props) => <Temp {...props} headLabel="Downloads"></Temp>
    },
    CastPage: {
        screen: (props) => <Temp {...props}><CastPage {...props}/></Temp>
    },
}

const StackConfig = {
    initialRouteName: 'Explorar',
    headerMode: 'none',
    unmountInactiveRoutes: true,
    transitionConfig: () => ({
        transitionSpec: {
            duration: 0
        }
    })
}

const StackNavigator = createStackNavigator(StackRoutes, StackConfig)

export default createAppContainer(StackNavigator);