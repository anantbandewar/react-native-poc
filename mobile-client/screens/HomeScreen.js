import * as React from 'react';
import { StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { Fontisto } from '@expo/vector-icons';

import Colors from '../constants/Colors';


const HomeScreen = () => {
    const initialRegion = {
        latitude:22.00, 
        longitude:80.00, 
        latitudeDelta: 24.00,
        longitudeDelta: 24.00
    };

    const coords = [
        { latitude: 19.0759899, longitude: 72.8773928 }, // Mumbai
        { latitude: 18.521428, longitude: 73.8544541 }, // Pune
        { latitude: 12.9587464, longitude: 77.5573456 }, // Banglore
        { latitude: 28.6517178, longitude: 77.2219388 }, // Delhi
        { latitude: 26.916194, longitude: 75.820349 }, // Jaipur
        { latitude: 14.5203896, longitude: 75.7223521 }, // Karnataka
        { latitude: 29, longitude: 76 } // Haryana
    ];
    
    return (
        <MapView style={styles.map} region={initialRegion}>
            {
                coords.map(markerCoordinates => (
                    <Marker
                        key={markerCoordinates.latitude}
                        coordinate={markerCoordinates}
                        // title={(
                        //     <View>
                        //         <Text>Load #12345</Text>
                        //     </View>
                        // )}
                        // description={
                        //     <View>
                        //         <Text>Load Details</Text>
                        //     </View>
                        // }
                    >
                        <Fontisto name="truck" size={20} color={Colors.accent} />
                    </Marker>
                ))
            }
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});

export default HomeScreen;
