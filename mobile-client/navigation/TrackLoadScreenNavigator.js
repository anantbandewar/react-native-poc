import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import TrackLoadScreen from '../screens/track_load/TrackLoadScreen';
import TrackVehicleScreen, { screenOptions as trackVehicleScreenOptions } from '../screens/track_load/TrackVehicleScreen';


const Stack = createStackNavigator();

export default function TrackLoadScreenNavigator() {
  return (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: (Colors.primary),
            },
            headerTintColor: 'white',
            headerTitleStyle: {
                fontWeight: 'bold',
            }
        }}
    >

        <Stack.Screen 
            name="Track Load"
            component={TrackLoadScreen}
            options={{ title: 'Track Load' }}
        />

        <Stack.Screen
            name="Track Vehicle"
            component={TrackVehicleScreen}
            options={trackVehicleScreenOptions}
        />
    
    </Stack.Navigator>
  );
}
