import React, { Component, Fragment } from 'react';
import { View, Image, Text, ToastAndroid, TouchableNativeFeedback, Dimensions } from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import TrackPlayer from 'react-native-track-player';
import RNBackgroundDownloader from 'react-native-background-downloader';
import FastImage from 'react-native-fast-image'

import style from './style'

const { rowAlign, textTitle, newContainer } = style
const { width } = Dimensions.get('window');

export default class EpisodeItem extends Component {
    render() {
        const { cover, episode: { title, id, published, enclosures: [{ url, length, mimeType }], itunes: { duration, image } } } = this.props 
        const color = "#E1E1E1"
        const newDimensions = { marginLeft: 5.5, marginRight: 18, width: 44 }
        const interval = width - (Object.keys(newDimensions).map(key => newDimensions[key]).reduce((total, num) => total + num) + 14)
        const parsedDate = published.replace(/\s\+[0-9]+/, "");
        const date = new Date(parsedDate)
        const { locale, stamp } = {
            locale: date.toLocaleDateString(),
            stamp: +date
        }
        
        return (
            <TouchableNativeFeedback onPress={this.playCast} background={TouchableNativeFeedback.Ripple('#3C3C47')}>
                <View style={{width: "100%", paddingHorizontal: 14}}>
                    <View style={[rowAlign, { justifyContent: "space-between" }]}>
                        <FastImage resizeMode={FastImage.resizeMode.contain} style={{width: 55, height: 55}} source={{uri: image ? image : cover}}/>
                        <Text numberOfLines={2} style={[textTitle, {color}]}>{title}</Text>
                        {
                            !this.state.progress ?
                                <TouchableNativeFeedback onPress={() => this.downloadCast(stamp)}>
                                    <MCIcons name="dots-horizontal" color={color} size={30}/>
                                </TouchableNativeFeedback>
                            :
                            <Text style={{color: "#fff"}}>{this.state.progress}%</Text>
                        }
                    </View>
                    <View style={rowAlign}> 
                        <Text style={[newContainer, newDimensions, {color, height: 16}]}>Novo</Text>
                        <View style={[rowAlign, {width: interval, justifyContent: "space-between", borderBottomColor: "#3c3c3c", borderBottomWidth: 1, paddingVertical: 12}]}>
                            <View style={{flexDirection: "row"}}>
                                <View style={rowAlign}>
                                    <Icon size={21} name="event" color={color}/>
                                    <Text style={{color, fontSize: 14.5, marginLeft: 3}}>{locale}</Text>
                                </View>
                                <View style={[rowAlign, {marginLeft: 6}]}>
                                    <Icon size={21} name="timer" color={color}/>
                                    <Text style={{color, fontSize: 14.5, marginLeft: 3}}>{duration}</Text>
                                </View>
                            </View>
                            <Icon name="favorite-border" size={21} color={color} style={{paddingRight: 18}}/>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    state = {
        progress: null
    }

    playCast = () => {
        const { id, castName, title, published, enclosures: [{ url, length, mimeType }], itunes: { duration, image } } = this.props.episode;

        TrackPlayer.reset().then(() => TrackPlayer.add({
            id,
            url,
            title,
            artist: castName,
            artwork: image ? image : this.props.cover
        }).then(() => TrackPlayer.play()))
    }

    downloadCast = (stamp) => {
        let { id, enclosures: [{url}] } = this.props.episode;
        let { castId } = this.props;
        
        RNBackgroundDownloader.download({
            id,
            url,
            destination: `${RNBackgroundDownloader.directories.documents}/${castId}_${stamp}.mp3`
        }).begin((expectedBytes) => {
            ToastAndroid.show('Preparando download', ToastAndroid.SHORT);
        }).progress((percent) => {
            this.setState({...this.state, progress: percent * 100})
            console.log(`Downloaded: ${percent * 100}%`);
        }).done(() => {
            this.setState({...this.state, progress: null})
            ToastAndroid.show('Download finalizado', ToastAndroid.SHORT);
        }).error((error) => {
            console.log('Download canceled due to error: ', error);
        });
    }
}