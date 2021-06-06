import React from 'react';
import { Platform } from 'react-native';
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
//import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HomeScreen from '../screens/HomeScreen';
//import UserProfileScreen from '../screens/account/UserProfileScreen';
import Colors from '../constants/Colors';
import HeaderButton from '../components/UI/HeaderButton';


//const Drawer = createDrawerNavigator();
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

        {/* <Drawer.Screen 
            name="Profile"
            component={UserProfileScreen}
            options={{
                drawerLabel: 'Profile',
                drawerIcon: ({ color }) => (
                  <MaterialCommunityIcons name="account" color={color} size={26} />
                )
            }}
        />
    
        <Drawer.Screen 
            name="Logout"
            component={UserProfileScreen}
            options={{
                drawerLabel: 'Logout',
                drawerIcon: ({ color }) => (
                  <MaterialCommunityIcons name="logout" color={color} size={26} />
                )
            }}
        /> */}
    </Stack.Navigator>
  );
}
