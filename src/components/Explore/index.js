import React, { Component, Fragment } from 'react';
import { ActivityIndicator, Animated, ScrollView, View, Text } from 'react-native';

//Style
import style from './style'

//Components
import ItemSlider from '../Partials/ItemSlider'
import Header from '../Header'

//Client
import { getMainCasts } from "../../client";

const {  } = style

export default class Explore extends Component {
    constructor() {
        super()
        this.state = {
            scrollY: new Animated.Value(0),
            file: {},
            mainFeed: [],
        }
    }
    
    render() {
        const { file, mainFeed } = this.state, { size, name, type, uri } = file, btnHeight = 62.1;
        const maxHeight = 115 - btnHeight, minHeight = 0;
        const distance = (maxHeight + btnHeight) - btnHeight;

        const textOpacity = this.state.scrollY.interpolate({
            inputRange: [0, 0, distance - 15],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
            });

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, distance],
            outputRange: [(maxHeight + btnHeight), btnHeight],
            extrapolate: 'clamp'
        })

        return (
            <Fragment>
                <View style={{backgroundColor: "#0E0E16", flex: 1, height: "100%"}}>
                    <Header textOpacity={textOpacity} headerHeight={headerHeight}/>
                    <ScrollView contentContainerStyle={{paddingTop: 115, paddingBottom: 10}} onScroll={Animated.event(
                        [{ nativeEvent: {
                            contentOffset: {
                                y: this.state.scrollY
                            }
                        }
                        }])} scrollEventThrottle={16}
                    >
                        { 
                            mainFeed.length > 0 ?
                                mainFeed.map(({title, items}, index) => items.length > 5 && title !== "Podcasts" ? <ItemSlider key={index} label={title} items={items}/> : null)
                            :
                                <ActivityIndicator size="large"/>
                        }
                    </ScrollView>
                </View>
                {/* Footer */}
                <View style={{width: "100%", height: 30, backgroundColor: "#fff"}}>
                    <Text>Footer</Text>
                </View>
            </Fragment>
        );
    }

    componentDidMount = () => getMainCasts().then(res => this.setState({mainFeed: res}));
}