import * as React from 'react';
import { View, Text, Button } from "react-native";


export default function CreateLoadScreen({ navigation, route }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Create Load Screen</Text>
            <Button title="View load summary" onPress={() => navigation.navigate('Create Load Summary')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}
