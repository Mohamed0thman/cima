import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { icons, COLORS, SIZES, FONTS } from '../constants';

const CustomButton = ({ containerStyle, lable, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        ...containerStyle,
      }}
      onPress={onPress}>
      <LinearGradient
        colors={['#DF9320', '#C91CA3', '#3820CA']}
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
          borderRadius: 25,
          marginTop: 12,
        }}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.body3,
          }}>
          {lable}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustomButton;
