import React, { useContext } from 'react';
import { View, Image, Text, ScrollView, Dimensions, TouchableNativeFeedback } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"

//Context
import { DownloadContext } from '../../contexts/DownloadContext'

//Style
import style from "./style"

const { width } = Dimensions.get("window");
const { container } = style;

export default DownloadsSection = () => {
    const { downloading, downloads, cancelTask, toggleTaskState } = useContext(DownloadContext);

    return (
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
            <BackgroundWarning margin="30%" label="Nenhum download encontrado" icon="file-download"/>
    );
}