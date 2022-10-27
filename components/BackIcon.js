import React from 'react';
import {
  Image,
  TouchableHighlight,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { icons, COLORS, SIZES, FONTS } from '../constants';

const BackIcon = ({ onPress }) => {
  return (
    <LinearGradient
      colors={['#DF9320', '#C91CA3', '#3820CA']}
      style={{
        height: 32,
        width: 32,
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 1,
        borderRadius: SIZES.base,
      }}>
      <TouchableHighlight
        style={{
          height: 30,
          width: 30,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.backgroundColor,
          borderRadius: SIZES.base,
        }}
        onPress={onPress}>
        <Image
          source={icons.leftArrow}
          style={{
            width: 24,
            height: 24,
            tintColor: COLORS.white,
          }}
        />
      </TouchableHighlight>
    </LinearGradient>
  );
};

export default BackIcon;
