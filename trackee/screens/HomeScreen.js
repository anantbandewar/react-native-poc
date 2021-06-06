import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert, Platform, TouchableOpacity,  TouchableNativeFeedback} from "react-native";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import SimpleCard from '../components/UI/SimpleCard';
import Colors from '../constants/Colors';

const HomeScreen = props => {
    const [isFetching, setIsFetching] = useState(false);
    const [lastPosition, setLastPosition] = useState();

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient Permission!',
                'You need to grant location permission to use this app.'
                [{ text: 'Okay' }]
            );

            console.log("Permission not granted.");
            return false;
        }
        return true;
    };

    const trackLocationHandler = async () => {
        console.log("Tracking started..");

        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        try {
            setIsFetching(true);
            Location.watchPositionAsync(
                { distanceInterval: 1 }, // in meters
                (location) => {
                    // if (lastPosition && (lastPosition.lat != location.coords.latitude || lastPosition.lng != location.coords.longitude)) {
                    //     setLastPosition({ lat: location.coords.latitude, lng: location.coords.longitude });
                        Alert.alert(
                            'New Location',
                            'Congrats! 100 meter distance covered successfully.',
                            [{ text: 'Okay' }]
                        );
                        console.log("Fetched location: ");
                        console.log(location);
                    // } else {
                    //     console.log("same location..");
                    //     !lastPosition && setLastPosition({ lat: location.coords.latitude, lng: location.coords.longitude });
                    // }
                }
            );
        } catch (error) {
            Alert.alert(
                'Could not fetch location!',
                'Please try again later.',
                [{ text: 'Okay' }]
            );
        }
        setIsFetching(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.details}>
                <TouchableCmp onPress={trackLocationHandler} useForeground>
                    <View>
                        <SimpleCard style={styles.mainButton}>
                            <Text style={styles.label}>Let's Start!</Text>
                        </SimpleCard>
                    </View>
                </TouchableCmp>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    mainButton: {
        padding: 10,
        backgroundColor: Colors.primary
    },
    label: {
        paddingLeft: 20,
        paddingRight: 20,
        fontFamily: 'open-sans',
        fontSize: 16,
        color: Colors.accent
    }
});

export default HomeScreen;
