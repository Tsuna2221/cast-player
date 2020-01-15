import React, { Component, Fragment } from 'react';
import { Keyboard, Animated, ScrollView, View, Text } from 'react-native';

//Style
import style from './Explore/style'

//Components
import Header from './Header'
import FooterNavigator from './FooterNavigator'
import FooterPlayer from './FooterPlayer'

//Client
import { getMainCasts } from "../client";

const {  } = style

export default class Temp extends Component {
    constructor() {
        super()
        this.state = {
            scrollY: new Animated.Value(0),
            file: {},
            mainFeed: [],
            keyboardStatus: false
        }

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => this.keyboardListener(true));
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => this.keyboardListener(false));
    }
    
    render() {
        const { state: { file, keyboardStatus }, props: { headLabel } } = this, { size, name, type, uri } = file, btnHeight = 62.1;
        const maxHeight = 115 - btnHeight;
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
                    <Header label={headLabel} textOpacity={textOpacity} headerHeight={headerHeight}/>
                    <ScrollView contentContainerStyle={{paddingTop: headLabel ? 115 : btnHeight, paddingBottom: 10}} onScroll={Animated.event(
                        [{ nativeEvent: {
                            contentOffset: {
                                y: this.state.scrollY
                            }
                        }
                        }])} scrollEventThrottle={16}
                    >
                        {{...this.props.children, keyboardStatus}}
                    </ScrollView>
                </View>
                {
                    !keyboardStatus ? 
                        <Fragment>
                            <FooterPlayer/>
                            <FooterNavigator navigate={this.props.navigation.dispatch} selected={headLabel}/>
                        </Fragment>
                    :
                        null
                }
            </Fragment>
        );
    }

    componentDidMount = () => getMainCasts().then(res => this.setState({mainFeed: res}))
    
    componentWillUnmount = () => {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    
    keyboardListener = (keyboardStatus) => this.setState({...this.state, keyboardStatus})
}