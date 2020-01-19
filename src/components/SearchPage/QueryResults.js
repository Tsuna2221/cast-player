import React, { Fragment } from 'react';
import { View, Image, Text, FlatList, VirtualizedList, TouchableNativeFeedback, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colorsFromUrl } from 'react-native-vibrant-color';
import AsyncStorage from "@react-native-community/async-storage"

import style from './style'

const {  } = style;

const { width } = Dimensions.get('window');
const itemHeight = 64;

const getDetailsAndNavigate = (item, navigate, fromResults) => colorsFromUrl(item.artworkUrl600).then(async colors => {
    if(!fromResults){
        const { trackId, artworkUrl60, artworkUrl600, trackName, artistName } = item
        const resultStorage = await AsyncStorage.getItem("recentResults");
        const data = JSON.parse(resultStorage) || []

        if(!data.map(({trackId}) => trackId).includes(trackId)){
            if(data) data.unshift({trackId, artworkUrl60, artworkUrl600, trackName, artistName})
            if(data.length > 5) data.pop()
        
            AsyncStorage.setItem("recentResults", JSON.stringify(data))
        }
    }

    navigate("CastPage", { id: item.trackId, image: item.artworkUrl600, colors })
});

export default QueryResults = ({results, navigation, fromResults}) => (
    <Fragment>
        {
            fromResults ? 
                <Text style={{color: "#fff", paddingHorizontal: 20, fontSize: 20, fontWeight: "bold", marginTop: 18}}>Resultados Recentes</Text>
            :
                null
        }
        <VirtualizedList
            data={results}
            getItem={(data, index) => data[index]}
            keyExtractor={item => item.trackId.toString()}
            style={{marginTop: 10}}
            getItemCount={() => results.length}
            renderItem={({item}) => (
                <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#3C3C47')} onPress={() => getDetailsAndNavigate(item, navigation.navigate, fromResults)}>
                    <View style={{width, paddingHorizontal: 20, height: itemHeight + 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                        <View style={{flexDirection: "row", alignItems: "center"}}>
                            <Image style={{width: itemHeight, height: itemHeight, marginRight: 14}} source={{uri: item.artworkUrl60 }}/>
                            <View style={{width: "63%"}}>
                                <Text numberOfLines={1} style={{color: "#fff", fontSize: 17, fontWeight: "bold", marginBottom: 2}}>{item.trackName}</Text>
                                <Text numberOfLines={1} style={{color: "#9D9D9D", fontSize: 16, marginBottom: 2}}>{item.artistName}</Text>
                            </View>
                        </View>
                        <Icon name="add" color="#fff" size={25}/>
                    </View>
                </TouchableNativeFeedback>
            )}
        />
    </Fragment>
);