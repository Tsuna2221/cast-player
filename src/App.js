import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import TrackPlayer from 'react-native-track-player';

//Components
import Header from './components/Header'
import Explore from './components/Explore'

export default class App extends Component {
    render() {
		const { file } = this.state, { size, name, type, uri } = file

        return (
			<View>
				<Header/>
				<Explore/>
			</View>
        );
	}

	state = {
		file: {}
	}

	componentDidMount = () => TrackPlayer.setupPlayer()
	
	getFile = () => DocumentPicker.pick().then(async (file) => {
		await TrackPlayer.add({
			id: file.size,
			url: file.uri,
			title: file.name,
			artist: "Artist Name",
		});
	
		// Starts playing it
		TrackPlayer.play();

		this.setState({file})
	})
}