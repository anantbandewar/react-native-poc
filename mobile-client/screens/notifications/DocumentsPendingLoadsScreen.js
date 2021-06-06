import * as React from 'react';
import { View, Text, Button } from "react-native";


export default function DocumentsPendingLoadsScreen({ navigation, route }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Documents Pending Loads Screen</Text>
            <Button
                title="Go to load Details"
                onPress={() => {
                    navigation.navigate('Load Details', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    });
                }}
            />
        </View>
    );
}
