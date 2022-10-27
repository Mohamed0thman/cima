import React from 'react';
import {
  Text,
  View,
  TextInput,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { icons, COLORS, SIZES, FONTS } from '../constants';
import { Entypo } from '@expo/vector-icons';

const CustomInput = ({ containerStyle, lable, isSuccess, error, ...props }) => {
  const [focusInput, setFocusInput] = React.useState(false);

  console.log(   'isSuccess', isSuccess);

  return (
    <View
      style={{
        ...containerStyle,
      }}>
      <Text
        style={{
          color: COLORS.white,
          ...FONTS.body3,
        }}>
        {lable}
      </Text>

      <LinearGradient
        colors={
          focusInput
            ? ['#DF9320', '#C91CA3', '#3820CA']
            : ['#282835', '#282835']
        }
        start={{ x: 0.0, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
          borderRadius: 12,
          marginTop: 12,
        }}>
        <TextInput
      
          style={{
            width: '100%',
            height: 50,
            backgroundColor: focusInput ? COLORS.backgroundColor : '#282835',
            borderRadius: 12,
            color: COLORS.white,
            paddingHorizontal: 24,
            ...FONTS.body4,
          }}
          onFocus={() => setFocusInput(true)}
          onBlur={() => setFocusInput(false)}
          {...props}
        />
        {isSuccess && (
          <View
            style={{
              position: 'absolute',
              right: 20,
              width: 18,
              height: 18,
              backgroundColor: '#2C2C39',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Entypo name="check" size={14} color={COLORS.white} />
          </View>
        )}
      </LinearGradient>

      {error && (
        <Text
          style={{
            marginTop: 12,
            color: '#f00000',
            ...FONTS.body4,
          }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;
