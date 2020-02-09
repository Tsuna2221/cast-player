import React, { Component, Fragment } from 'react';
import { View, Image, TouchableNativeFeedback, Dimensions, Text } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"

//Context
import { FeedContext } from '../../contexts/FeedContext'

const { width } = Dimensions.get("window");

export default class Feed extends Component {
    static contextType = FeedContext;

    render() {
        const { storedCasts } = this.context;
        const { navigate } = this.props.navigation;

        return (
            <View style={{flexWrap: "wrap", width: "100%", flexDirection: "row"}}>
                {
                    storedCasts.length > 0 ?
                        storedCasts.map(({trackId, artworkUrl600, colors}) => (
                            <TouchableNativeFeedback key={trackId} background={TouchableNativeFeedback.Ripple('#3C3C47')} onPress={() => navigate("CastPage", { id: trackId, image: artworkUrl600, colors })}>
                                <Image style={{width: width/3, height: width/3, backgroundColor: colors.averageColor}} resizeMode="contain" source={{uri: artworkUrl600}}/>
                            </TouchableNativeFeedback>
                        ))
                    :
                        <View style={{width: "100%", marginTop: "38%", flexDirection: "column", alignItems: "center"}}>
                            <Icon name="list" size={150} color="#364454"/>
                            <Text style={{color: "#364454", fontWeight: "bold", fontSize: 18.5}}>Não há podcasts salvos</Text>
                        </View>
                }
            </View>
        );
    }
}