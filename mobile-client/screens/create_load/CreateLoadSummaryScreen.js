import * as React from 'react';
import { View, Text, Button } from "react-native";


export default function CreateLoadSummaryScreen({ navigation, route }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Create Load Summary Screen</Text>
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}
