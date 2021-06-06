import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TenderedLoadsScreenNavigator from './TenderedLoadsScreenNavigator';
import DocumentsPendingLoadsScreenNavigator from './DocumentsPendingLoadsScreenNavigator';
import Colors from '../constants/Colors';


const Tab = createMaterialTopTabNavigator();

export default function NotificationsScreenNavigator() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: (Colors.primary),
                inactiveTintColor: 'black'
            }}
        >
            <Tab.Screen 
                name="Tendered Loads"
                component={TenderedLoadsScreenNavigator}
                options={{
                    tabBarLabel: 'Tendered Loads',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="dump-truck" color={color} size={26} />
                    )
                }}
            />

            <Tab.Screen
                name="Documents Pending"
                component={DocumentsPendingLoadsScreenNavigator}
                options={{
                    tabBarLabel: 'Documents Pending',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="dump-truck" color={color} size={26} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}