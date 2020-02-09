import React, { Component, Fragment } from 'react';
import { View, TouchableNativeFeedback, Text, Dimensions, Animated } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"

//Style
import style from "./style"

//Context
import { DownloadContext } from '../../contexts/DownloadContext'

const { width } = Dimensions.get("window");
const { container } = style;

export default class DownloadPage extends Component {
    static contextType = DownloadContext;

    render() {
        const { currentTab } = this.state;
        const { downloading, downloads, cancelTask, toggleTaskState } = this.context;
        const navigation = ["Baixando", "Terminados"]

        return (
            <View>
                <View style={{flexDirection: "row"}}>
                    {
                        navigation.map(label => (
                            <TouchableNativeFeedback onPress={() => this.setState({currentTab: label})} key={label}>
                                <View style={{width: width / navigation.length, height: 60, justifyContent: "center", alignItems: "center", borderBottomColor: currentTab === label ? "#ff0055" : "transparent", borderBottomWidth: 3}}>
                                    <Text style={{color: "#C5CACF", fontSize: 14, fontWeight: currentTab === label ? "bold" : "normal"}}>{label}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        ))
                    }
                </View>
                {
                    downloading.length > 0 ?
                        downloading.map((download) => {
                            const index = downloads.findIndex(({episode: { id }}) => id === download.id);
                            const { episode: { title, castName } } = downloads[index];
                            const percentage = download.percent;

                            return (
                                <View key={download.id} style={container}>
                                    <View style={{flexDirection: "row", height: "100%", paddingHorizontal: 15}}>
                                        <View style={{width: "75%", justifyContent: "center"}}>
                                            <Text numberOfLines={1} style={{color: "#C5CACF", fontWeight: "bold", fontSize: 15, flexWrap: 'wrap'}}>{title}</Text>
                                            <Text numberOfLines={1} style={{color: "#6A727D", marginTop: 4, fontSize: 15, flexWrap: 'wrap'}}>{castName}</Text>
                                        </View>
                                        <View style={{width: "25%", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                                            <TouchableNativeFeedback onPress={() => toggleTaskState(download)}>
                                                <Icon name={download.state === "PAUSED" ? "play-arrow" : "pause"} size={27} color="#fff" style={{marginRight: 15}}/>
                                            </TouchableNativeFeedback>
                                            <TouchableNativeFeedback onPress={() => cancelTask(download)}>
                                                <Icon name="stop" size={27} color="#fff"/>
                                            </TouchableNativeFeedback>
                                        </View> 
                                    </View>
                                    <View style={{width: percentage * width, height: 5, flexDirection: "row", alignItems: "flex-end", backgroundColor: "#C5CACF"}}/>                           
                                </View>
                            )
                        })
                    :
                        <View style={{width: "100%", marginTop: "30%", flexDirection: "column", alignItems: "center"}}>
                            <Icon name="file-download" size={150} color="#364454"/>
                            <Text style={{color: "#364454", fontWeight: "bold", fontSize: 18.5}}>Nenhum download encontrado</Text>
                        </View>
                }
            </View>
        );
    }

    state = {
        currentTab: "Baixando"
    }
}