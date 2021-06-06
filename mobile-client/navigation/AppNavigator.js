import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Entypo } from '@expo/vector-icons';

import HomeScreenNavigator from '../navigation/HomeScreenNavigator';
import MyLoadsScreenNavigator from './MyLoadsScreenNavigator';
import TenderedLoadsScreenNavigator from './TenderedLoadsScreenNavigator';
import NotificationsScreenNavigator from './NotificationsScreenNavigator';
import Colors from '../constants/Colors';
import TrackLoadScreenNavigator from './TrackLoadScreenNavigator';


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
                name="Tendered Loads"
                component={TenderedLoadsScreenNavigator}
                options={{
                    tabBarLabel: 'Freights',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="warehouse" color={color} size={26} />
                    )
                }}
            />

            <Tab.Screen
                name="Track Load"
                component={TrackLoadScreenNavigator}
                options={{
                    tabBarLabel: 'Track Load',
                    tabBarIcon: ({ color }) => (
                      <Entypo name="location-pin" color={color} size={26} />
                    )
                }}
            />

            <Tab.Screen
                name="My Loads"
                component={MyLoadsScreenNavigator}
                options={{
                    tabBarLabel: 'My Loads',
                    tabBarIcon: ({ color }) => (
                      <MaterialCommunityIcons name="dump-truck" color={color} size={26} />
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
