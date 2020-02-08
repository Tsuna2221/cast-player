import React, { createContext, Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { colorsFromUrl } from 'react-native-vibrant-color';
import * as rssParser from 'react-native-rss-parser';
import RNBackgroundDownloader from 'react-native-background-downloader';
import RNFetchBlob from 'rn-fetch-blob'

const { fs: { createFile, unlink } } = RNFetchBlob;
const { documents } = RNBackgroundDownloader.directories;

export const FeedContext = createContext();

class FeedContextProvider extends Component {
    state = {
        storedCasts: []
    }

    componentDidMount = () => {
        return AsyncStorage.getItem("storedCasts").then(casts => this.setState({...this.state, storedCasts: JSON.parse(casts)}))
    }

    saveCast = (cast) => AsyncStorage.getItem("storedCasts").then(async (casts) => {
        let data = JSON.parse(casts || "[]");

        if(data.map(({trackId}) => trackId).includes(cast.trackId)){
            data = data.filter(({trackId}) => trackId !== cast.trackId);
            
            unlink(`${documents}/${cast.trackId}.json`)
        }else{
            let colors = await colorsFromUrl(cast.artworkUrl600);
            data.push({...cast, colors});

            fetch(cast.feedUrl)
                .then((response) => response.text())
                .then((responseData) => rssParser.parse(responseData))
                .then((rss) => createFile(`${documents}/${cast.trackId}.json`, JSON.stringify(rss), "utf8"))
                .catch(err => console.log(Object.keys(err).map(key => err[key])))
        }

        return AsyncStorage.setItem("storedCasts", JSON.stringify(data))
            .then(() => this.setState({...this.state, storedCasts: data}));
    })

    render(){
        return (
            <FeedContext.Provider value={{...this.state, saveCast: this.saveCast}}>
                {this.props.children}
            </FeedContext.Provider>
        )
    }
}

export default FeedContextProvider;