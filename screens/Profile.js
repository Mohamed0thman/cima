import React from 'react';
import { View, Text, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import { icons, COLORS, SIZES, FONTS } from '../constants';

const Profile = ({ navigation, currentUser }) => {
  useFocusEffect(() => {
    console.log('isLoggedIn', currentUser.isLoggedIn);
    if (!currentUser.isLoggedIn) {
      navigation.navigate('SignUp');
    }
  });

  console.log('navigation');
  if (!currentUser.isLoggedIn) {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          paddingTop: 30,
          backgroundColor: COLORS.backgroundColor,
        }}></View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        paddingTop: 30,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <Text
        style={{
          color: COLORS.white,
        }}>
        Profile
      </Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.user.currentUser,
  };
};
export default connect(mapStateToProps)(Profile);
