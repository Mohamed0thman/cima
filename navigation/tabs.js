import React from 'react';
import { View, Platform } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { Home, Ticket, Favorite, SignUp, Profile } from '../screens';

import { TabIcon } from '../components';

import { icons } from '../constants';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          height: 80,
        },
      }}
      tabBarOptions={{
        showLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              boldIcon={icons.homeBold}
              lightIcon={icons.homeLight}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Ticket"
        component={Ticket}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              boldIcon={icons.ticketBold}
              lightIcon={icons.ticketLight}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              boldIcon={icons.heartBold}
              lightIcon={icons.heartLight}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              boldIcon={icons.profileBold}
              lightIcon={icons.profileLight}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
