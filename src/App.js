import React, { Component, Fragment } from 'react';
import { View, Text, Animated, ScrollView } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import TrackPlayer from 'react-native-track-player';

//Components
import Header from './components/Header'
import Explore from './components/Explore'

//Style
import style from './components/Header/style'
const { buttonContainer } = style

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			scrollY: new Animated.Value(0),
			file: {},
			viewPosition: 115
		}
	}

    render() {
		const { file, viewPosition } = this.state, { size, name, type, uri } = file
		const maxHeight = 115 - buttonContainer.height, minHeight = 0;
		const distance = (maxHeight + buttonContainer.height) - buttonContainer.height;

		const textOpacity = this.state.scrollY.interpolate({
			inputRange: [0, 0, distance - 15],
			outputRange: [1, 1, 0],
			extrapolate: 'clamp',
		  });

		const headerHeight = this.state.scrollY.interpolate({
			inputRange: [0, distance],
			outputRange: [(maxHeight + buttonContainer.height), buttonContainer.height],
			extrapolate: 'clamp'
		})

        return (
			<Fragment>
				<View style={{backgroundColor: "#0E0E16", flex: 1, height: "100%"}}>
					<Header textOpacity={textOpacity} headerHeight={headerHeight}/>
					<ScrollView contentContainerStyle={{marginTop: 115}} onScroll={Animated.event(
						[{ nativeEvent: {
							contentOffset: {
								y: this.state.scrollY
							}
						}
						}])} scrollEventThrottle={16}
					>
						<Explore/>
					</ScrollView>
				</View>
				{/* Footer */}
				<View style={{width: "100%", height: 30, backgroundColor: "#fff"}}>
					<Text>Text</Text>
				</View>
			</Fragment>
        );
	}

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