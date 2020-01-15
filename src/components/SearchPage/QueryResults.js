import React, { Fragment } from 'react';
import { View, Image, Text, FlatList, TouchableNativeFeedback, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { colorsFromUrl } from 'react-native-vibrant-color';

import style from './style'

const {  } = style;

const { width } = Dimensions.get('window');
const itemHeight = 64;

const getDetailsAndNavigate = (id, image, navigate) => colorsFromUrl(image).then(colors => {
    navigate("CastPage", { id, image, colors })
});

export default QueryResults = ({results, navigation}) => (
    <FlatList
        data={results}
        keyExtractor={item => item.trackId}
        style={{marginTop: 10}}
        renderItem={({item: { artworkUrl60, artworkUrl600, artistName, trackName, trackId } }) => (
            <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#3C3C47')} onPress={() => getDetailsAndNavigate(trackId, artworkUrl600, navigation.navigate)}>
                <View style={{width, paddingHorizontal: 20, height: itemHeight + 16, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Image style={{width: itemHeight, height: itemHeight, marginRight: 14}} source={{uri: artworkUrl60 }}/>
                        <View style={{width: "63%"}}>
                            <Text numberOfLines={1} style={{color: "#fff", fontSize: 17, fontWeight: "bold", marginBottom: 2}}>{trackName}</Text>
                            <Text numberOfLines={1} style={{color: "#9D9D9D", fontSize: 16, marginBottom: 2}}>{artistName}</Text>
                        </View>
                    </View>
                    <Icon name="add" color="#fff" size={25}/>
                </View>
            </TouchableNativeFeedback>
        )}
    />
);