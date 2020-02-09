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

const { rowAlign, textTitle, container } = style
const { width } = Dimensions.get('window');

export default class EpisodeItem extends Component {
    static contextType = DownloadContext;

    render() {
        const { downloadCast, downloads } = this.context;
        const { cover, castId, episode: { title, published, itunes: { duration, image } } } = this.props 
        const parsedDate = published.replace(/\s\+[0-9]+/, "");
        const date = new Date(parsedDate);
        const { locale, stamp } = { locale: date.toLocaleDateString(), stamp: +date }
        const downloadMap = downloads.filter(({status}) => status === "complete").map(({name}) => name).includes(`${castId}_${stamp}`);
        
        return (
                <View style={[rowAlign, container, { justifyContent: "space-between" }]}>
                    <TouchableNativeFeedback onPress={() => this.playCast(stamp, downloadMap)} background={TouchableNativeFeedback.Ripple('#3C3C47')}>
                        <View style={{flexDirection: "row"}}>
                            <FastImage resizeMode={FastImage.resizeMode.contain} style={{width: 68, height: 68}} source={{uri: image ? image : cover}}/>
                            <View style={{width: "66%", flexDirection: "column", justifyContent: "center", paddingLeft: 12}}>
                                <Text numberOfLines={2} style={[textTitle, {color: "#C5CACF", flexDirection: "row", alignItems: "center"}]}>{title}</Text>
                                
                                <View style={{flexDirection: "row", marginTop: 6, alignItems: "center"}}>
                                    {
                                        downloadMap ?
                                            <Icon style={{marginRight: 4}} name="file-download" size={19} color="#C5CACF"/>
                                        :
                                        null
                                    }
                                    <View style={rowAlign}>
                                        <Icon size={19} name="event" color="#C5CACF"/>
                                        <Text style={{color: "#C5CACF", fontSize: 13, marginLeft: 3}}>{locale}</Text>
                                    </View>
                                    <View style={[rowAlign, {marginLeft: 6}]}>
                                        <Icon size={19} name="timer" color="#C5CACF"/>
                                        <Text style={{color: "#C5CACF", fontSize: 13, marginLeft: 3}}>{duration}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={() => downloadCast(stamp, castId, this.props.episode)} style={[rowAlign]}>
                        <Icon name="favorite-border" size={23} color="#C5CACF" style={{marginLeft: 6}}/>
                    </TouchableNativeFeedback>
                </View>
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