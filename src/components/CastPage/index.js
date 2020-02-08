import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, ActivityIndicator, FlatList, Dimensions, StyleSheet } from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import SwiperFlatList from 'react-native-swiper-flatlist';
import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFetchBlob from 'rn-fetch-blob'

//Client
import { getFeeds } from "../../client"

//Components
import EpisodeItem from './EpisodeItem'

const { width, height } = Dimensions.get('window');

const { fs: { readFile } } = RNFetchBlob;
const { documents } = RNBackgroundDownloader.directories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  child: {
    height: 170,
    width,
    justifyContent: 'center',
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
    zIndex: 10
  }
});

export default class CastPage extends Component {
    render() {
        const { state: { feed }, props: { navigation: { state: { params: { id, image, colors } } } } } = this;

        return (
            <Fragment>
                <View style={styles.container}>
                    <SwiperFlatList
                    autoplay
                    autoplayDelay={2}
                    loop
                    >
                        <View style={[styles.child, { backgroundColor: colors.averageColor }]}>
                            <Image style={{width: 130, height: 130}} source={{uri: image}}/>
                        </View>
                        <View style={[styles.child, { backgroundColor: colors.averageColor }]}>
                            <View style={{backgroundColor: "#000", opacity: 0.2, width: "100%", height: "100%"}}/>
                            <View style={{width: "100%", height: "100%", position: "absolute"}}>
                                <Text style={styles.text}>2</Text>
                            </View>
                        </View>
                    </SwiperFlatList>
                </View>
                <FlatList
                    data={feed.items}
                    renderItem={({ item }) => <EpisodeItem castId={id} cover={image} episode={{...item, castName: feed.title}}/>}
                    keyExtractor={item => item.id}
                    style={{marginTop: 10}}
                />
            </Fragment>
        );
    }

    state = {
        feed: {}
    }

    componentDidMount = async () => {
        const { navigation: { state: { params: { id, image } } } } = this.props;
        const cachedFeed = await RNFetchBlob.fs.readFile(`${documents}/${id}.json`).catch(() => null);

        if(!cachedFeed){
            return getFeeds(id, "single").then((data) => {
                fetch(data.feedUrl)
                    .then((response) => response.text())
                    .then((responseData) => rssParser.parse(responseData))
                    .then((rss) => this.setState({feed: rss}))
            })
        }

        return this.setState({feed: JSON.parse(cachedFeed)})
    }
}