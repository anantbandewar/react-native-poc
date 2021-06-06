import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import CardWithTitle from '../UI/CardWithTitle';


const LoadDetailsStopItemview = props => {
    const editStopHandler = (stopId) => {
        console.log("Update Stop: " + stopId);
    };

    return(
        <View style={styles.padding_10}>
            <CardWithTitle 
                style={styles.padding_10}
                title={'STOP #' + props.stop.stopId + ' - ' + (props.stop.stopType == 1 ? 'Pickup' : 'Delivery')}
                titleIcon={<AntDesign name="edit" color={Colors.primary} size={24} />}
                titleIconLabel="Edit"
                onPress={() => {editStopHandler(props.stop.stopId)}}
                allowAction={props.isEditable}
            >
                <View style={styles.stopContainer}>
                    <View>
                        <View style={styles.padding_10}>
                            <Text style={styles.label}>Facility</Text>
                            <Text style={styles.details}>{props.stop.facility.name}</Text>
                        </View>
                        <View style={styles.padding_10}>
                            <Text style={styles.label}>Address</Text>
                            <Text style={styles.details}>{props.stop.facility.address.city} - {props.stop.facility.address.postalCode}</Text>
                            <Text style={styles.details}>{props.stop.facility.address.state}, {props.stop.facility.address.country}</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.padding_10}>
                            <Text style={styles.label}>Expected {props.stop.stopType == 1 ? 'Pickup' : 'Delivery'} Date</Text>
                            <Text style={styles.details}>{props.stop.expectedFromDateUTC}</Text>
                        </View>
                        <View style={styles.padding_10}>
                            <Text style={styles.label}>Actual {props.stop.stopType == 1 ? 'Pickup' : 'Delivery'} Date</Text>
                            <Text style={styles.details}>{props.stop.actualInDateTimeUTC}</Text>
                        </View>
                    </View>
                </View>
            </CardWithTitle>
        </View>
    );
};

const styles = StyleSheet.create({
    padding_10: {
        padding: 10
    },
    label: {
        fontFamily: 'open-sans',
        fontSize: 12,
        color: '#888'
    },
    details: {
        fontFamily: 'open-sans',
        fontSize: 14
    },
    stopContainer: {
        flexDirection: 'row',
        marginBottom: 10
    },
    cardTitle: {
        fontFamily: 'open-sans-bold',
        textAlign: 'left'
    }
});

export default LoadDetailsStopItemview;
