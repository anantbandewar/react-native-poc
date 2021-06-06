import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';


const LoadSummaryItemview = props => {
    return (
        <View style={styles.loadSummaryContainer}>
            <View style={styles.padding_10}>
                <View style={styles.padding_10}>
                    <Text style={styles.label}>Mode</Text>
                    <Text style={styles.details}>TL</Text>
                </View>
                <View style={styles.padding_10}>
                    <Text style={styles.label}>Equipment Category</Text>
                    <Text style={styles.details}>{props.load.equipmentCategory.description}</Text>
                </View>
                <View style={styles.padding_10}>
                    <Text style={styles.label}>Total Distance</Text>
                    <Text style={styles.details}>{props.load.totalDistance} km</Text>
                </View>
            </View>
            <View style={styles.padding_10}>
                <View style={styles.padding_10}>
                    <Text style={styles.label}>Progress</Text>
                    <Text style={{ ...styles.details, color: Colors.primary }}>{props.load.progress}</Text>
                </View>
                <View style={styles.padding_10}>
                    <Text style={styles.label}>Equipment Type</Text>
                    <Text style={styles.details}>{props.load.equipmentType.description}</Text>
                </View>
                <View style={styles.padding_10}>
                    <Text style={styles.label}>Over Dimentions</Text>
                    <Text style={styles.details}>{props.load.overDimentions ? 'True' : 'False'}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loadSummaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    padding_10: {
        padding: 10
    },
    label: {
        fontFamily: 'open-sans',
        fontSize: 12,
        color: Colors.gray
    },
    details: {
        fontFamily: 'open-sans',
        fontSize: 14
    }
});

export default LoadSummaryItemview;
