import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated, ActivityIndicator } from 'react-native';
import { colorsFromUrl } from 'react-native-vibrant-color';

import style from './style'

//Components
import ItemSlider from '../Partials/ItemSlider'

//Client
import { getMainCasts } from "../../client";

const {  } = style

export default class Explore extends Component {
    render() {
        const { mainFeed } = this.state
        return (
            <ScrollView onScroll={(event) => this.handleScroll(event)}>
                { 
                    mainFeed.length > 0 ?
                        mainFeed.map(({title, items}) => items.length > 5 && title !== "Podcasts" ? <ItemSlider label={title} items={items}/> : null)
                    :
                        <ActivityIndicator size="large"/>
                }
            </ScrollView>
        );
    }

    state = {
        mainFeed: []
    }

    componentDidMount = () => getMainCasts().then(res => this.setState({mainFeed: res}));

    handleScroll = (event) => {
        const { hideLabel } = this.props;
        let yPosition = event.nativeEvent.contentOffset.y;

        hideLabel(yPosition);
    }
}