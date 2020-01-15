import React, { Component, Fragment } from 'react';
import { View, Image, FlatList, Text, ActivityIndicator, Dimensions, TextInput, TouchableNativeFeedback } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage"
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationEvents } from 'react-navigation';
import style from './style'

//Components;
import RecentSearches from './RecentSearches'
import RecentResults from './RecentResults'
import QueryResults from './QueryResults'

//Client
import { getFeeds } from '../../client'

//Style
const {  } = style
const { height, width } = Dimensions.get('window');

export default class Search extends Component {
    render() {
        const { props: { navigation }, state: { searchInput, recentResults, recentSearches, queryingStatus, searching, results } } = this;
        const iconWidth = (100 / width) * 100;
        console.log(results)
        return (
            <View>
                <NavigationEvents onDidFocus={this.focusReset}/>
                <View style={{width: "100%", height: 50, paddingHorizontal: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: "#3C3C47"}}>
                    <Icon name="search" size={24} color="#9d9d9d" style={{width: iconWidth, textAlign: "center"}}/>
                    <TextInput onSubmitEditing={() => this.fetchQuery(searchInput)} onChangeText={text => this.updateInput(text)} value={searchInput} placeholder="Pesquisar" placeholderTextColor="#9d9d9d" style={{color: "#fff", width: width - (iconWidth * 2) - 16, height: "100%", paddingVertical: 0, flexDirection: "row", alignItems: "center", fontSize: 18, fontStyle: searchInput.length > 0 ? "normal" : "italic"}}/>
                    <TouchableNativeFeedback onPress={() => this.fetchQuery(searchInput)}>
                        <Icon name={searchInput.length > 0 ? "arrow-forward" : queryingStatus ? "close" : null} size={24} color="#fff" style={{width: iconWidth, textAlign: "center"}}/>
                    </TouchableNativeFeedback>
                </View>
                {
                    queryingStatus ?
                        searching ? 
                            <ActivityIndicator/>
                        :
                            <QueryResults navigation={navigation} results={results}/>
                    :
                        <Fragment>
                            <RecentSearches fetchQuery={this.fetchQuery} searches={recentSearches}/>
                        </Fragment>
                }
            </View>
        );
    }

    state = {
        searchInput: "",
        recentSearches: [],
        recentResults: [],
        queryingStatus: false,
        searching: false,
        results: []
    }

    focusReset = () => this.setState({...this.state, queryingStatus: false})

    componentDidMount = () => AsyncStorage.getItem("recentSearches").then(res => this.setState({...this.state, recentSearches: res ? JSON.parse(res) : []}))

    updateInput = (input) => this.setState({...this.state, searchInput: input})

    fetchQuery = (searchInput, fromResults) => {
        this.setState({...this.state, queryingStatus: true, searching: true})

        getFeeds(searchInput)
            .then((data) => this.setState({...this.state, results: data, searching: false}))
            .then(async () => {
                if(!fromResults){
                    const searchStorage = await AsyncStorage.getItem("recentSearches");
                    const data = JSON.parse(searchStorage) || []
                    
                    if(data) data.unshift(searchInput)
                    if(data.length > 4) data.pop()
                
                    return AsyncStorage.setItem("recentSearches", JSON.stringify(data))
                }
            })
    }
}