import React from 'react';
import AppLoading from 'expo-app-loading';
import { connect } from 'react-redux';

import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import * as font from 'expo-font';

import { Details, Booking, SignUp, LogIn, Profile } from './screens';

import { Provider } from 'react-redux';
import { store } from './redux/store';

import AppStack from './navigation/stack';

import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

const getFonts = () =>
  font.loadAsync({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

const App = ({}) => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  // return {
  //   isLoggedIn: state?.user?.currentUser?.isLoggedIn,
  // };
};
export default App;

// <NavigationContainer>
//   <Stack.Navigator
//     screenOptions={{
//       headerShown: false,
//     }}
//     initialRouteName={'Home'}>
//     <Stack.Screen name="Home" component={Tabs} />
//     <Stack.Screen name="Details" component={Details} />
//     <Stack.Screen name="Booking" component={Booking} />
//     <Stack.Screen name="SignUp" component={SignUp} />
//     <Stack.Screen
//       name="LogIn"
//       component={LogIn}
//       options={{
//         ...TransitionPresets.SlideFromRightIOS,
//       }}
//     />

//     <Stack.Screen name="Profile" component={Profile} />
//   </Stack.Navigator>
// </NavigationContainer>
