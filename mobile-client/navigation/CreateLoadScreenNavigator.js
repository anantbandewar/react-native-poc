import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../constants/Colors';
import CreateLoadScreen from '../screens/create_load/CreateLoadScreen';
import CreateLoadSummaryScreen from '../screens/create_load/CreateLoadSummaryScreen';

const Stack = createStackNavigator();

export default function CreateLoadScreenNavigator() {
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
            name="Create Load"
            component={CreateLoadScreen}
            options={{ 
                headerTitle: 'Create Load'
            }}
        />

        <Stack.Screen 
            name="Create Load Summary"
            component={CreateLoadSummaryScreen}
            options={{ 
                headerTitle: 'Create Load Summary'
            }}
        />

    </Stack.Navigator>
  );
}
