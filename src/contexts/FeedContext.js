import React, { createContext, Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'
import { colorsFromUrl } from 'react-native-vibrant-color';
import RNFetchBlob from 'rn-fetch-blob'

export const FeedContext = createContext();
const { fs: { createFile, readFile, dirs: { DocumentDir } } } = RNFetchBlob;

class FeedContextProvider extends Component {
    state = {
        storedCasts: []
    }

    componentDidMount = () => {
        console.log(RNFetchBlob.fs)
        return AsyncStorage.getItem("storedCasts").then(casts => this.setState({...this.state, storedCasts: JSON.parse(casts)}))
    }

    saveCast = (cast) => AsyncStorage.getItem("storedCasts").then(async (casts) => {
        let data = JSON.parse(casts || "[]");

        if(data.map(({trackId}) => trackId).includes(cast.trackId)){
            data = data.filter(({trackId}) => trackId !== cast.trackId);
        }else{
            let colors = await colorsFromUrl(cast.artworkUrl600);

            data.push({...cast, colors});
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