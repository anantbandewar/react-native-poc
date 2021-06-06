import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

import Colors from '../../constants/Colors';


const Map = props => {
    const initialRegion = {
        latitude:15.7399537, 
        longitude:73.4646154, 
        latitudeDelta: 2.09,
        longitudeDelta: 0.0421
    };

    return (
        <MapView style={styles.map} region={initialRegion}>
            <Polyline
                coordinates={props.coords}
                strokeColor={Colors.primary}
                strokeWidth={6}
            />
            <Marker
                coordinate={props.originMerkerCoordinates}
                title='Origin'
                description='desc'
            />
            <Marker coordinate={props.destinationMerkerCoordinates}
                title='Destination'
                description='desc'
            />
        </MapView>
    )
};

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default Map;