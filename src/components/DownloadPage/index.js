import React, { Component, Fragment } from 'react';
import { View, TouchableNativeFeedback, Text, Dimensions, Animated } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"
import RNFetchBlob from 'rn-fetch-blob';

//Context
import { DownloadContext } from '../../contexts/DownloadContext'
import RNBackgroundDownloader from 'react-native-background-downloader';

const { width } = Dimensions.get("window")

export default class DownloadPage extends Component {
    static contextType = DownloadContext;

    render() {
        const { downloading, files, downloads, cancelTask, toggleTaskState } = this.context;

        return (
            <View>
                {
                    downloading.map((download) => {
                        const index = downloads.findIndex(({episode: { id }}) => id === download.id);
                        const { episode: { title } } = downloads[index];

                        const percentage = download.percent;

                        return (
                            <View key={download.id} style={{width, height: 55, flexDirection: "column", justifyContent: "flex-end"}}>
                                <View style={{maxWidth: width, height: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 14}}>
                                    <Text numberOfLines={1} style={{color: "#fff", fontSize: 15, flex: 1, flexWrap: 'wrap'}}>{title}</Text>
                                    <View style={{flexDirection: "row"}}>
                                        <TouchableNativeFeedback onPress={() => toggleTaskState(download)}>
                                            <Icon name={download.state === "PAUSED" ? "play-arrow" : "pause"} size={27} color="#fff" style={{marginRight: 10}}/>
                                        </TouchableNativeFeedback>
                                        
                                        <TouchableNativeFeedback onPress={() => cancelTask(download)}>
                                            <Icon name="stop" size={27} color="#fff"/>
                                        </TouchableNativeFeedback>
                                    </View>
                                </View>
                                <View style={{width: (percentage * width), height: 5, backgroundColor: "#FF0055"}}/>
                            </View>
                        )
                    })
                }
            </View>
        );
    }
}