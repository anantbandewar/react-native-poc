import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { Fontisto, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';


export default function TrackVehicleScreen({ navigation, route }) {
    const { loadId } = route.params;
    const { initialRegion } = route.params;
    const { pickedLocation } = route.params;

    return (
        <View style={{ flex: 1 }}>
            <MapView style={{ height: '100%' }} region={initialRegion}>
                <Marker
                    coordinate={pickedLocation}
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
                    <MaterialCommunityIcons name="dump-truck" size={50} color={Colors.accent} />
                </Marker>
            </MapView>
        </View>
    );
}

export const screenOptions = navData => {
    return {
        headerTitle: ('Load #' + navData.route.params.loadId)
    };
}

const styles = StyleSheet.create({

});
