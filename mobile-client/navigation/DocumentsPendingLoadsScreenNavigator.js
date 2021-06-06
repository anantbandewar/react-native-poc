import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoadDetailsScreen from '../screens/my_loads/LoadDetailsScreen';
import DocumentsPendingLoadsScreen from '../screens/notifications/DocumentsPendingLoadsScreen';
import Colors from '../constants/Colors';


const Stack = createStackNavigator();

export default function DocumentsPendingLoadsScreenNavigator() {
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
            name="Documents Pending"
            component={DocumentsPendingLoadsScreen}
            options={{ title: 'Documents Pending' }}
        />

        <Stack.Screen
            name="Load Details"
            component={LoadDetailsScreen}
            options={{ title: 'Load Details' }}
        />
    
    </Stack.Navigator>
  );
}
