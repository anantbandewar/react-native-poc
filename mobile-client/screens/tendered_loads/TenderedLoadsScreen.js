import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import * as loadsAction from '../../store/actions/loads';
import Colors from '../../constants/Colors';
import TenderedLoadsItemview from '../../components/core/TenderedLoadsItemview';


export default function LoadsScreen({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const loads = useSelector(state => state.loads.loads);

    const fetchLoads = useCallback (async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(loadsAction.fetchLoads());
        } catch (err) {
            setError(err);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        fetchLoads();
    }, [dispatch, fetchLoads]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        )
    }

    if (error) {
        return (
            <View style={styles.centered}>
              <Text>An error occurred!</Text>
              <Button
                title="Try again"
                onPress={fetchLoads}
                color={Colors.primary}
              />
            </View>
        );
    }

    if (!isLoading && loads.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No loads found.</Text>
            </View>
        );
    }

    const selectItemHandler = (loadId) => {
        navigation.navigate('Load Details', {
            loadId: loadId
        });
    };

    return (
        <FlatList 
            data={loads}
            keyExtractor={item => (item.id.toString())}
            renderItem={itemData => (
                <TenderedLoadsItemview 
                    load={itemData.item}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id)
                    }}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
