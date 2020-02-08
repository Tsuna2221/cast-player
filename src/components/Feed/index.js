import React, { Component, Fragment } from 'react';
import { View, Image, TouchableNativeFeedback, Dimensions } from 'react-native';


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
                    storedCasts.map(({trackId, artworkUrl600, colors}) => (
                        <TouchableNativeFeedback key={trackId} background={TouchableNativeFeedback.Ripple('#3C3C47')} onPress={() => navigate("CastPage", { id: trackId, image: artworkUrl600, colors })}>
                            <Image style={{width: width/3, height: width/3}} resizeMode="contain" source={{uri: artworkUrl600}}/>
                        </TouchableNativeFeedback>
                    ))
                }
            </View>
        );
    }
}