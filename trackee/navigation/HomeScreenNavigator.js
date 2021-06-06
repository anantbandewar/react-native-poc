import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HomeScreen from '../screens/HomeScreen';
import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';


const Stack = createStackNavigator();

export default function HomeScreenNavigator() {
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
            name="Home"
            component={HomeScreen}
            options={{
                headerTitle: 'Freight Docker',
                headerLeft: () => (
                  <HeaderButtons HeaderButtonComponent={HeaderButton}>
                      <Item 
                          title='Menu'
                          iconName='facebook'
                          onPress={() => {}}
                      />
                  </HeaderButtons>
                ),
                headerRight: () => (
                  <HeaderButtons HeaderButtonComponent={HeaderButton}>
                      <Item 
                          title='Menu'
                          iconName='menu'
                          onPress={() => {}}
                      />
                  </HeaderButtons>
                )
            }}
        />
    </Stack.Navigator>
  );
}
