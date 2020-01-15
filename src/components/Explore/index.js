import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Animated, ScrollView, View, Text } from 'react-native';

//Style
import style from './style'

//Components
import ItemSlider from '../Partials/ItemSlider'
import Header from '../Header'

//Client
import { getMainCasts } from "../../client";

const {  } = style

export default class Explore extends Component {
    render() {
        const { mainFeed } = this.state;
        return (
                <Fragment>
                    { 
                        mainFeed.length > 0 ?
                            mainFeed.map(({title, items}, index) => items.length > 5 && title !== "Podcasts" ? <ItemSlider navigation={this.props.navigation} key={index} label={title} items={items}/> : null)
                        :
                            <ActivityIndicator size="large"/>
                    }
                </Fragment>
        );
    }

    state = {
        mainFeed: []
    }

    componentDidMount = () => getMainCasts().then(res => this.setState({mainFeed: res}));
}