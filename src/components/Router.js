import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Temp from './Temp'

import Explore from "./Explore"
import CastPage from "./CastPage"
import Search from "./SearchPage"
import Feed from "./Feed"

const StackRoutes = {
    Explorar: {
        screen: (props) => <Temp {...props} headLabel="Explorar"><Explore {...props}/></Temp>
    },
    Buscar: {
        screen: (props) => <Temp {...props} headLabel="Buscar"><Search {...props}/></Temp>
    },
    Feeds: {
        screen: (props) => <Temp {...props} headLabel="Feeds"><Feed {...props}/></Temp>
    },
    Downloads: {
        screen: (props) => <Temp {...props} headLabel="Downloads"></Temp>
    },
    CastPage: {
        screen: (props) => <Temp {...props}><CastPage {...props}/></Temp>
    },
}

const StackConfig = {
    initialRouteName: 'Buscar',
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