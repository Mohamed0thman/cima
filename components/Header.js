import React from 'react';
import { View, Image } from 'react-native';

import { icons, COLORS, SIZES, FONTS } from '../constants';

const Header = () => {
  return (
    <View
      style={{
        paddingHorizontal: SIZES.padding,
        paddingTop: SIZES.padding,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Image source={icons.cimaPlusLogo} style={{ width: 57, height: 37 }} />

      <View
        style={{
          width: 30,
          height: 30,
        }}
      />
    </View>
  );
};

export default Header;
