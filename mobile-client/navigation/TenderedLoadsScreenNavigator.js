import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import TenderedLoadsScreen from '../screens/tendered_loads/TenderedLoadsScreen';
import LoadDetailsScreen, { screenOptions as loadDetailScreenOptions } from '../screens/tendered_loads/LoadDetailsScreen';
import Colors from '../constants/Colors';


const Stack = createStackNavigator();

export default function TenderedLoadsScreenNavigator({ navigation, route }) {
  return (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: Platform.OS == 'android' ? Colors.primary : '',
            },
            headerTintColor: Platform.OS == 'android' ? 'white' : Colors.primary,
            headerTitleStyle: {
                fontWeight: 'bold',
            }            
        }}
    >

        <Stack.Screen 
            name="Tendered Loads"
            component={TenderedLoadsScreen}
            options={{
                headerTitle: 'Tendered Loads'
            }}
        />

        <Stack.Screen
            name="Load Details"
            component={LoadDetailsScreen}
            options={loadDetailScreenOptions}
        />

    </Stack.Navigator>
  );
}
