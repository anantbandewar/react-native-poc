import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import LoadsScreen from '../screens/my_loads/LoadsScreen';
import LoadDetailsScreen, { screenOptions as loadDetailScreenOptions } from '../screens/my_loads/LoadDetailsScreen';
import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';
import CreateLoadScreenNavigator from './CreateLoadScreenNavigator';


const Stack = createStackNavigator();

export default function MyLoadsScreenNavigator({ navigation, route }) {
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
            name="My Loads"
            component={LoadsScreen}
            options={{ 
                headerTitle: 'My Loads',
                headerRight: () => (
                    <HeaderButtons HeaderButtonComponent={HeaderButton}>
                        <Item 
                            title='Create Load'
                            iconName='add-to-list'
                            onPress={() => {
                                navigation.navigate('Create Load')
                            }}
                        />
                    </HeaderButtons>
                )
            }}
        />

        <Stack.Screen
            name="Load Details"
            component={LoadDetailsScreen}
            options={loadDetailScreenOptions}
        />

        <Stack.Screen
            name="Create Load"
            component={CreateLoadScreenNavigator}
            options={{ title: 'Create Load' }}
        />
    
    </Stack.Navigator>
  );
}
