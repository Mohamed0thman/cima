import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { icons, COLORS, SIZES, FONTS } from '../constants';

const MovieItem = ({ onPress, item }) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 140,
        backgroundColor: '#444449',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SIZES.padding,
        marginTop: 12,
        borderRadius: 25,
        borderBottomColor: COLORS.secondary,
        borderBottomWidth: 1,
      }}
      onPress={onPress}>
      <Image
        source={{ uri: item.poster }}
        style={{
          width: 95,
          height: 112,
          borderRadius: 15,
        }}
      />
      <View
        style={{
          width: '70%',
          marginLeft: SIZES.base,
        }}>
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h4,
          }}>
          {item?.title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.base,
          }}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{
              width: 20,
              height: 20,
            }}
          />
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h4,
              marginHorizontal: SIZES.base,
            }}>
            {item.rating}
          </Text>
          <Image
            source={icons.IMDB}
            resizeMode="contain"
            style={{
              width: 46,
              height: 16,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default MovieItem;
