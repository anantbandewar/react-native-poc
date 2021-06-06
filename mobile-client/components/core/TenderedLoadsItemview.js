import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';

import SimpleCard from '../UI/SimpleCard';
import Colors from '../../constants/Colors';

const TenderedLoadsItemview = props => {
    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    return (
        <SimpleCard style={styles.load}>
            <View style={styles.touchable}>
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.container}>
                            <View style={styles.subContainer}>
                                <View style={{ marginRight: 10 }}>
                                    <MaterialIcons name="my-location" size={20} />
                                </View>
                                <View>
                                    <Text style={styles.title}>{props.load.stops[0].facility.name}</Text>
                                    <Text style={styles.address}>{props.load.stops[0].facility.address.city}</Text>
                                </View>
                            </View>
                            <View style={{ flexGrow: 1 }}>
                                <FontAwesome name="long-arrow-right" color={Colors.primary} size={26} />
                            </View>
                            <View style={styles.subContainer}>
                                <View style={{ marginRight: 10 }}>
                                    <MaterialIcons name="location-on" size={20} />
                                </View>
                                <View>
                                    <Text style={styles.title}>{props.load.stops[1].facility.name}</Text>
                                    <Text style={styles.address}>{props.load.stops[1].facility.address.city}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.detailsContainer}>
                            <View>
                                <Text style={styles.label}>Load #</Text>
                                <Text style={styles.details}>{props.load.id}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Mode</Text>
                                <Text style={styles.details}>TL</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Commodity</Text>
                                <Text style={styles.details}>Batteries</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Progress</Text>
                                <Text style={styles.details}>Picked Up</Text>
                            </View>
                        </View>
                    </View>
                </TouchableCmp>
            </View>
        </SimpleCard>
    );
};

const styles = StyleSheet.create({
    load: {
        height: 150,
        margin: 10
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    container: {
        height: '65%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    subContainer: {
        height: '100%',
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 4
    },
    loadId: {
        fontFamily: 'open-sans-bold',
        fontSize: 14,
        color: Colors.primary
    },
    title: {
        fontFamily: 'open-sans',
        fontSize: 14,
    },
    address: {
        fontFamily: 'open-sans',
        fontSize: 12,
        color: '#888'
    },
    detailsContainer: {
        backgroundColor: '#F5F5F5',
        height: '35%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    label: {
        fontFamily: 'open-sans',
        fontSize: 10,
        color: '#888'
    },
    details: {
        fontFamily: 'open-sans',
        fontSize: 12
    }
});

export default TenderedLoadsItemview;
