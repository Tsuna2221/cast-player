import React, { Component, Fragment } from 'react';
import { View, TouchableNativeFeedback, Text, Dimensions, Animated } from 'react-native';

//Components
import DownloadNav from './DownloadNav'
import DownloadsSection from './DownloadsSection'
import FinishedSection from './FinishedSection'
import BackgroundWarning from '../BackgroundWarning'

export default class DownloadPage extends Component {

    render() {
        const { currentTab } = this.state;
        const navigation = ["Baixando", "Terminados"]

        return (
            <View>
                <DownloadNav currentTab={currentTab} update={(state) => this.setState({currentTab: state})} navigation={navigation}/>
                {
                    currentTab === "Baixando" ?
                        <DownloadsSection/>
                    :
                        <FinishedSection/>
                }
            </View>
        );
    }

    state = {
        currentTab: "Baixando"
    }
}