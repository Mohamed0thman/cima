import React from 'react';
import { View, TouchableOpacity,  } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

import { icons, COLORS, SIZES, FONTS } from '../constants';

const GradientBorder = ({
  children,
  borderRadius,
  containerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      <MaskedView
        style={{ flex: 1, flexDirection: 'row', height: '100%' }}
        maskElement={
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: borderRadius,
              borderWidth: 2,
              borderColor: '#000',
            }}
          />
        }>
        <LinearGradient
          colors={['#DF9320', '#C91CA3', '#3820CA']}
          start={{ x: 0.0, y: 1 }}
          end={{ x: 1, y: 1.0 }}
          style={{ flex: 1 }}
        />
      </MaskedView>
      <View
        style={{
          position: 'absolute',
          alignSelf: 'center',
        }}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default GradientBorder;
