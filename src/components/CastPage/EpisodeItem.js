import React, { Component, Fragment } from 'react';
import { View, Image, Text, ToastAndroid, TouchableNativeFeedback, Dimensions } from 'react-native';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import TrackPlayer from 'react-native-track-player';
import RNBackgroundDownloader from 'react-native-background-downloader';
import FastImage from 'react-native-fast-image'
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-community/async-storage';

//Context
import { DownloadContext } from '../../contexts/DownloadContext'

import style from './style'

const { rowAlign, textTitle, newContainer } = style
const { width } = Dimensions.get('window');

export default class EpisodeItem extends Component {
    static contextType = DownloadContext;

    render() {
        const { downloadCast, downloads } = this.context;
        const { cover, castId, episode: { title, id, published, enclosures: [{ url, length, mimeType }], itunes: { duration, image } } } = this.props 
        const color = "#E1E1E1"
        const newDimensions = { marginLeft: 5.5, marginRight: 18, width: 44 }
        const interval = width - (Object.keys(newDimensions).map(key => newDimensions[key]).reduce((total, num) => total + num) + 14)
        const parsedDate = published.replace(/\s\+[0-9]+/, "");
        const date = new Date(parsedDate)
        const { locale, stamp } = { locale: date.toLocaleDateString(), stamp: +date }
        const downloadMap = downloads.filter(({status}) => status === "complete").map(({name}) => name).includes(`${castId}_${stamp}`);
        
        return (
            <TouchableNativeFeedback onPress={() => this.playCast(stamp, downloadMap)} background={TouchableNativeFeedback.Ripple('#3C3C47')}>
                <View style={{width: "100%", paddingHorizontal: 14}}>
                    <View style={[rowAlign, { justifyContent: "space-between" }]}>
                        <FastImage resizeMode={FastImage.resizeMode.contain} style={{width: 55, height: 55}} source={{uri: image ? image : cover}}/>
                        <Text numberOfLines={2} style={[textTitle, {color, flexDirection: "row", alignItems: "center"}]}>{title}</Text>
                        {
                            !this.state.progress ?
                                <TouchableNativeFeedback onPress={() => downloadCast(stamp, castId, this.props.episode)}>
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
                            <View style={{flexDirection: "row"}}>
                                {
                                    downloadMap ?
                                        <Icon name="file-download" size={21} color="#fff"/>
                                    :
                                    null
                                }
                                <Icon name="favorite-border" size={21} color={color} style={{marginLeft: 6, paddingRight: 18}}/>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    state = {
        progress: null
    }

    playCast = (timestamp, exists) => {
        const { id, castName, title, published, enclosures: [{ url, length, mimeType }], itunes: { duration, image } } = this.props.episode;
        const { castId } = this.props;
        const storedName = `${RNBackgroundDownloader.directories.documents}/media/${castId}_${timestamp}.mp3`

        TrackPlayer.reset().then(() => TrackPlayer.add({
            id,
            url: exists ? storedName : url,
            title,
            artist: castName,
            artwork: image ? image : this.props.cover
        }).then(() => TrackPlayer.play()))
    }
}