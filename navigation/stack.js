import React from 'react';
import { connect } from 'react-redux';

import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Details, Booking, SignUp, LogIn, Profile } from '../screens';

import Tabs from './tabs';

const Stack = createStackNavigator();

const AppStack = ({ isLoggedIn }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Tabs'}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Profile" component={Profile} />

        {!isLoggedIn && (
          <>
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen
              name="LogIn"
              component={LogIn}
              options={{
                ...TransitionPresets.SlideFromRightIOS,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state?.user?.currentUser?.isLoggedIn,
  };
};
export default connect(mapStateToProps)(AppStack);
