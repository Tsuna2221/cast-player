import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated, TouchableNativeFeedback } from 'react-native';
import TextTicker from 'react-native-text-ticker'
import Icon from 'react-native-vector-icons/MaterialIcons'
import TrackPlayer from 'react-native-track-player';

import style from './style'

const { footContainer } = style

export default class FooterPlayer extends Component {
    constructor() {
        super()

        this.playListener = TrackPlayer.addEventListener("playback-state", ({state}) => this.setPlayerState(state));
    }

    render() {
        const { playing, track, track: { artwork, title, artist } } = this.state;

        return (
            <Fragment>
                {
                    Object.keys(track).length > 0 ?
                        <View style={footContainer}>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <TouchableNativeFeedback onPress={() => this.pause()}>
                                    <Image style={{width: 42, height: 42}} source={{uri: artwork}}/>
                                </TouchableNativeFeedback>
                                <View style={{width: "60%", marginLeft: 8}}>
                                    <TextTicker
                                        style={{color: "#e1e1e1", fontWeight: "bold", fontSize: 16}}
                                        duration={10000}
                                        loop
                                        bounce
                                        repeatSpacer={30}
                                        marqueeDelay={2300}
                                    >{title}</TextTicker>
                                    <TextTicker
                                        style={{color: "#9D9D9D", fontWeight: "500", fontSize: 14.5, marginTop: 2}}
                                        duration={10000}
                                        loop
                                        bounce
                                        repeatSpacer={30}
                                        marqueeDelay={2300}
                                    >{artist}</TextTicker>
                                </View>
                            </View>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Icon name="fast-rewind" size={24} color="#e1e1e1"/>
                                <TouchableNativeFeedback onPress={this.togglePlay} background={TouchableNativeFeedback.Ripple('#3C3C47')}>
                                    <Icon name={playing ? "pause" : "play-arrow"} size={38} style={{marginHorizontal: 8}} color="#e1e1e1"/>
                                </TouchableNativeFeedback>
                                <Icon name="fast-forward" size={24} color="#e1e1e1"/>
                            </View>
                        </View>
                    :   
                        null
                }
            </Fragment>
        );
    }

    state = {
        playing: false,
        track: {}
    }

    componentDidMount = () => {
        TrackPlayer.getState().then(state => this.setState({...this.state, playing: state === 3}))
    }

    componentWillUnmount = () => {
        this.playListener.remove();
    }

    setPlayerState = (state) => TrackPlayer.getCurrentTrack()
        .then(res => TrackPlayer.getTrack(res)
        .then((track) => this.setState({...this.state, playing: state === 3, track: track ? track : {}})))

    togglePlay = () => {
        const { playing } = this.state;

        TrackPlayer[playing ? "pause" : "play"]().then(() => this.setState({...this.state, playing: !playing}))
    }
}