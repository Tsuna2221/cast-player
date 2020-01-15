import React, { Component, Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import style from './style'

const {  } = style

export default class Search extends Component {
    render() {
        const { searchInput } = this.state;

        return (
            <View>
                <View style={{width: "100%", height: 50, flexDirection: "row", alignItems: "center", paddingHorizontal: 8, backgroundColor: "#A8A8AB"}}>
                    <Icon name="search" size={24} color="#DCDCDC"/>
                    <TextInput onChangeText={text => this.updateInput(text)} value={searchInput} placeholder="Pesquisar" placeholderTextColor="#DCDCDC" style={{color: "#fff", width: "100%", height: "100%", paddingVertical: 0, paddingLeft: 8, flexDirection: "row", alignItems: "center", fontSize: 18, fontStyle: searchInput.length > 0 ? "normal" : "italic"}}/>
                </View>
                <View style={{marginTop: 12}}>
                    <Text style={{color: "#fff", marginLeft: 20, fontSize: 20, fontWeight: "bold"}}>Buscas Recentes</Text>
                </View>
                <View style={{marginTop: 12}}>
                    <Text style={{color: "#fff", marginLeft: 20, fontSize: 20, fontWeight: "bold"}}>Resultados Recentes</Text>
                </View>
            </View>
        );
    }

    state = {
        searchInput: ""
    }

    updateInput = (input) => this.setState({...this.state, searchInput: input})
}