import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import Polyline from '@mapbox/polyline';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

//import Map from '../../components/UI/Map';
import Colors from '../../constants/Colors';
import env from '../../env';
import SimpleCard from '../../components/UI/SimpleCard';
import * as loadAction from '../../store/actions/load';
import LoadSummaryItemview from '../../components/core/LoadSummaryItemview';
import LoadStopItemview from '../../components/core/LoadStopItemview';
import LoadDocumentsItemview from '../../components/core/LoadDocumentsItemview';
import LoadChargesItemview from '../../components/core/LoadChargesItemview';
import LoadTenderStatusItemview from '../../components/core/LoadTenderStatusItemview';


export default function LoadDetailsScreen({ navigation, route }) {
    const [isMapLoading, setIsMapLoading] = useState(false);
    const [mapError, setMapError] = useState();

    const [isFetching, setIsFetching] = useState(false);
    const [apiError, setApiError] = useState();
    const dispatch = useDispatch();
    const load = useSelector(state => state.load.selectedLoad);

    const [coords, setCoords] = useState([]);
    const { loadId } = route.params;
    
    const [originMerkerCoordinates, setOriginMerkerCoordinates] = useState();
    const [destinationMerkerCoordinates, setDestinationMerkerCoordinates] = useState();

    const fetchLoad = useCallback (async (loadId) => {
        setApiError(null);
        setIsFetching(true);
        try {
            await dispatch(loadAction.fetchLoad(loadId));
        } catch (err) {
            setApiError(err);
        }
        setIsFetching(false);
    }, [dispatch, setIsFetching, setApiError]);

    useEffect(() => {
        fetchLoad(loadId);
    }, [fetchLoad]);

    const fetchCoords = useCallback (async (origin, destination) => {
        setMapError(null);
        setIsMapLoading(true);
        setOriginMerkerCoordinates({ latitude: 18.516726, longitude: 73.856255 });
        setDestinationMerkerCoordinates({ latitude: 12.972442, longitude: 77.580643 });

        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${env.googleApiKey}`);

            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            const jsonResponse = await response.json();

            let points = Polyline.decode(jsonResponse.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return {
                    latitude: point[0],
                    longitude: point[1]
                };
            });
            setCoords(coords);
        } catch (err) {
            setMapError(err);
        }
        setIsMapLoading(false);
    }, [setIsMapLoading, setMapError]);

    // useEffect(() => {
    //     fetchCoords("18.516726,73.856255", "12.972442,77.580643");
    // }, [fetchCoords]);

    if (isMapLoading || isFetching) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    if (apiError) {
        return (
            <View style={styles.centered}>
              <Text>An error occurred!</Text>
              <Button
                title="Try again"
                onPress={fetchLoad}
                color={Colors.primary}
              />
            </View>
        );
    }

    if (mapError) {
        return (
            <View style={styles.centered}>
              <Text>An error occurred!</Text>
              <Button
                title="Try again"
                onPress={fetchCoords}
                color={Colors.primary}
              />
            </View>
        );
    }

    if ((!isMapLoading && coords.length === 0) && (!isFetching && !load)) {
        return (
            <View style={styles.centered}>
                <Text>Not found.</Text>
            </View>
        );
    }

    if (!isFetching && !load) {
        return (
            <View style={styles.centered}>
                <Text>Not found.</Text>
                <Button
                    title="Try again"
                    onPress={fetchLoad}
                    color={Colors.primary}
                />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#D3D3D3', height: '30%' }}>
                {/* <Map coords={coords} originMerkerCoordinates={originMerkerCoordinates} destinationMerkerCoordinates={destinationMerkerCoordinates} /> */}
            </View>
            <View style={{ backgroundColor: 'white', height: '70%' }}>
                <View style={styles.locationCardContainer}>
                    <SimpleCard style={styles.locationCard}>
                        <View style={styles.locationContainer}>
                            <View style={{ paddingRight: 5 }}>
                                <MaterialIcons name="my-location" size={20} />
                            </View>
                            <View>
                                <Text style={styles.location}>{load.stops[0].facility.address.city}</Text>
                            </View>
                        </View>
                        <View style={{ flexGrow: 1 }}>
                            <FontAwesome name="long-arrow-right" color={Colors.primary} size={26} />
                        </View>
                        <View style={styles.locationContainer}>
                            <View style={{ paddingRight: 5 }}>
                                <MaterialIcons name="location-on" size={20} />
                            </View>
                            <View>
                                <Text style={styles.location}>{load.stops[1].facility.address.city}</Text>
                            </View>
                        </View>
                    </SimpleCard>
                </View>
                <ScrollView>
                    <View>
                        <LoadSummaryItemview load={load} />
                    </View>
                    <View>
                        <LoadStopItemview stop={load.stops[0]} isEditable={true} />
                        <LoadStopItemview stop={load.stops[1]} isEditable={true} />
                    </View>
                    <View style={styles.padding_10}>
                        <LoadDocumentsItemview load={load} isEditable={true} />
                    </View>
                    <View style={styles.padding_10}>
                        <LoadChargesItemview load={load} isEditable={true} />
                    </View>
                    <View style={styles.padding_10}>
                        <LoadTenderStatusItemview load={load} />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export const screenOptions = navData => {
    return {
        headerTitle: ('Load #' + navData.route.params.loadId)
    };
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    locationCardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    locationCard: {
        height: 50,
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: -25
    },
    locationContainer: {
        height: '100%',
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 4
    },
    location: {
        fontFamily: 'open-sans',
        fontSize: 12
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 14
    },
    padding_20: {
        padding: 20
    },
    padding_10: {
        padding: 10
    }
});
