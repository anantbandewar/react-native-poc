import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Entypo } from '@expo/vector-icons';

import HomeScreenNavigator from '../navigation/HomeScreenNavigator';
import NotificationsScreenNavigator from './NotificationsScreenNavigator';
import Colors from '../constants/Colors';


const Tab = createMaterialBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>

        <Tab.Navigator
            initialRouteName="Home"
            activeColor={Colors.primary}
            inactiveColor={Colors.black}
            barStyle={{ backgroundColor: 'white' }}
        >
            <Tab.Screen 
                name="Home"
                component={HomeScreenNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="home" color={color} size={26} />
                    )
                }}
            />

            <Tab.Screen
                name="Notifications"
                component={NotificationsScreenNavigator}
                options={{
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="bell" color={color} size={26} />
                    )
                }}
            />

        </Tab.Navigator>
    </NavigationContainer>
  );
}
