import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import CardWithTitle from '../../components/UI/CardWithTitle';


const LoadTenderStatusItemview = props => {
    return (
        <View>
            <CardWithTitle 
                style={styles.padding_10}
                title="TENDER STATUS"
            >
                <View style={styles.emptyViewContainer}>
                    <FontAwesome5 name="file-contract" color={Colors.gray} size={50} />
                    <Text style={styles.emptyView}>No Details.</Text>
                </View>
            </CardWithTitle>
        </View>
    );
};

const styles = StyleSheet.create({
    padding_10: {
        padding: 10
    },
    emptyViewContainer: {
        alignItems: 'center',
        padding: 20
    },
    emptyView: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.gray,
    }
});

export default LoadTenderStatusItemview;
