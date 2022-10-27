import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { COLORS, SIZES, icons, FONTS } from '../constants';

const ButtomTicket = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 208,
        height: 55,
      }}
      onPress={onPress}>
      <ImageBackground
        source={icons.buttomTicket}
        resizeMode="contain"
        style={{
          width: 208,
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: '#fff',
            ...FONTS.h2,
          }}>
          BUY TICKET
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ButtomTicket;
