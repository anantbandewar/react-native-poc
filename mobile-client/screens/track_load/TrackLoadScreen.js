import React, { useState } from 'react';
import { Button, Text, TextInput, View, Alert, ActivityIndicator, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapView, { Marker } from 'react-native-maps';
import { Fontisto, Entypo, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';

import Colors from '../../constants/Colors';
import SimpleCard from '../../components/UI/SimpleCard';
import CustomButton from '../../components/UI/CustomButton';


export default function TrackLoadScreen({ navigation, route }) {
    const [isFetching, setIsFetching] = useState(false);
    const [pickedLocation, setPickedLocation] = useState();
    const [initialRegion, setInitialRegion] = useState();
    const [loadId, setLoadId] = useState();

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permission to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        
        try {
            setIsFetching(true);
            const location = await Location.getCurrentPositionAsync({ timeout: 5000 });
            setPickedLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });

            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            });
        } catch (error) {
            Alert.alert(
                'Could not fetch location!',
                'Please try again later or pick a location on the map.'
                [{ text: 'Okay' }]
            );
        }

        setIsFetching(false);
    };

    const trackVehicleHandler = () => {
        navigation.navigate('Track Vehicle', {
            loadId: loadId,
            initialRegion: initialRegion,
            pickedLocation: pickedLocation
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {
                    isFetching ?
                        <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
                    :
                        pickedLocation ?
                            <View>
                                <View style={styles.mapContainer}>
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
                                            <Fontisto name="truck" size={40} color={Colors.accent} />
                                        </Marker>
                                    </MapView>
                                    <SimpleCard style={{ marginTop: -20 }}>
                                        <TouchableCmp onPress={trackVehicleHandler} useForeground>
                                            <View style={styles.trackButtonContainer}>
                                                <Text style={{ marginRight: 20, color: Colors.accent }}>TRACK VEHICLE</Text>
                                                <Entypo name="chevron-right" color={Colors.accent} size={20} />
                                            </View>
                                        </TouchableCmp>
                                    </SimpleCard>
                                </View>

                                <View style={styles.detailsContainer}>
                                    <View style={styles.detailsItem}>
                                        <View style={styles.marginBottom_10}>
                                            <Text style={styles.label}>Current Location</Text>
                                            <Text style={styles.details}>Googleplex Headquarters</Text>
                                        </View>
                                        
                                        <View style={styles.marginBottom_10}>
                                            <Text style={styles.label}>Distance Travelled</Text>
                                            <Text style={styles.details}>320 km</Text>
                                        </View>

                                        <View style={styles.marginBottom_10}>
                                            <Text style={styles.label}>Vehicle No.</Text>
                                            <Text style={styles.details}>MH 14 NT 4110</Text>
                                        </View>
                                    </View>
                                    <View style={styles.detailsItem}>
                                        <View style={styles.marginBottom_10}>
                                            <Text style={styles.label}>Speed</Text>
                                            <Text style={styles.details}>60 kmph</Text>
                                        </View>
                                        
                                        <View style={styles.marginBottom_10}>
                                            <Text style={styles.label}>Distance Pending</Text>
                                            <Text style={styles.details}>130 km</Text>
                                        </View>

                                        <View style={styles.marginBottom_10}>
                                            <Text style={styles.label}>Vehicle Type</Text>
                                            <Text style={styles.details}>Flatbed Container</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        :
                            <View style={styles.emptyViewContainer}>
                                <FontAwesome5 name="search-location" color={Colors.gray} size={100} />
                                <Text style={styles.emptyView}>No Details.</Text>
                            </View>
                }
            </View>

            <View style={styles.formContainer}>
                <TextInput 
                    value={loadId}
                    style={styles.formInput}
                    autoFocus={true}
                    placeholder="LoadId"
                    onChangeText={text => setLoadId(text)}
                    keyboardType='decimal-pad'
                    editable={!pickedLocation}
                />
                {
                    pickedLocation ?
                        <CustomButton style={styles.customButton} onPress={() => { setLoadId(null); setPickedLocation(null); }}>
                            <MaterialCommunityIcons name="close" color={Colors.primary} size={20} />
                        </CustomButton>
                    :
                        <CustomButton style={styles.customButton} onPress={() => { loadId && getLocationHandler() }}>
                            <FontAwesome5 name="search-location" color={Colors.primary} size={20} />
                        </CustomButton>
                }
                
                
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mapContainer: {
        height: '60%'
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '40%',
        backgroundColor: 'white',
        padding: 20
    },
    detailsItem: {
        padding: 10,
        marginTop: 10
    },
    marginBottom_10: {
        marginBottom: 10
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
    formContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 10
    },
    formInput: {
        width: '70%',
        borderColor: 'gray',
        borderWidth: 1,
        textAlign: 'center'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    emptyViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyView: {
        fontFamily: 'open-sans',
        fontSize: 18,
        color: Colors.gray,
    },
    trackButtonContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center'
    },
    customButton: {
        backgroundColor: Colors.black,
        borderColor: Colors.black,
        borderWidth: 1
    }
});

//export default TrackLoadScreen;
