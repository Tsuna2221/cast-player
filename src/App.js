import React, { Component, Fragment } from 'react';
import { View, Text, Animated, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import TrackPlayer from 'react-native-track-player';

//Components
import Router from './components/Router'
import Header from './components/Header'
import Explore from './components/Explore'

//Style
import style from './components/Header/style'

export default class App extends Component {
    render() {
        return (
			<Router/>
        );
	}

	componentDidMount = () => TrackPlayer.updateOptions({
		capabilities: [
			TrackPlayer.CAPABILITY_PLAY,
			TrackPlayer.CAPABILITY_PAUSE,
			TrackPlayer.CAPABILITY_STOP
		]
	}).then(() => TrackPlayer.setupPlayer())
	
	// getFile = () => DocumentPicker.pick().then(async (file) => {
	// 	await TrackPlayer.add({
	// 		id: file.size,
	// 		url: file.uri,
	// 		title: file.name,
	// 		artist: "Artist Name",
	// 	});
	
	// 	// Starts playing it
	// 	TrackPlayer.play();

	// 	this.setState({file})
	// })
}