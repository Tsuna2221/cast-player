import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import TrackPlayer from 'react-native-track-player';

//Components
import Header from './components/Header'
import Explore from './components/Explore'

export default class App extends Component {
    render() {
		const { file, viewPosition } = this.state, { size, name, type, uri } = file

        return (
			<Fragment>
				<View style={{backgroundColor: "#0E0E16", flex: 1, height: "100%"}}>
					<Header viewPosition={viewPosition}/>
					<Explore hideLabel={this.hideLabel}/>
				</View>
				{/* Footer */}
				<View style={{width: "100%", height: 30, backgroundColor: "#fff"}}>
					<Text>Text</Text>
				</View>
			</Fragment>
        );
	}

	state = {
		file: {},
		viewPosition: 115
	}

	hideLabel = (pos) => this.setState({...this.state, viewPosition: pos})

	// componentDidMount = () => TrackPlayer.setupPlayer()
	
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