import React, { Fragment } from 'react';
import { View, Image, Text, ScrollView, Animated, Dimensions, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'
import style from './style'

const {  } = style
const { height, width } = Dimensions.get('window');

export default RecentSearches = ({searches, fetchQuery}) => (
    <Fragment>
        {
            searches.length > 0 ?
                <View style={{marginTop: 12}}>
                    <Text style={{color: "#C5CACF", paddingHorizontal: 20, fontSize: 20, fontWeight: "bold", marginBottom: 8}}>Buscas Recentes</Text>
                    {
                        searches.map((item, key) => (
                            <TouchableNativeFeedback key={key} background={TouchableNativeFeedback.Ripple('#3C3C47')} onPress={() => fetchQuery(item, true)}>
                                <View style={{width, paddingHorizontal: 20, height: 44, borderBottomColor: "#3c3c3c", borderBottomWidth: 0.5, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                    <Text style={{color: "#C5CACF", fontSize: 16, marginBottom: 2}}>{item}</Text>
                                    <Icon name="close" color="#C5CACF" size={20}/>
                                </View>
                            </TouchableNativeFeedback>
                        ))
                    }
                </View>
            :
                <Fragment/>
        }
    </Fragment>
);