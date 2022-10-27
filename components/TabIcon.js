import React from 'react';
import { View, Image } from 'react-native';

import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

import { COLORS } from '../constants';
const TabIcon = ({ boldIcon, lightIcon, focused }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 50,
      }}>
      {focused ? (
        <MaskedView
          style={{ flex: 1, flexDirection: 'row', height: '100%' }}
          maskElement={
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={boldIcon}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: '#000',
                }}
              />
              {focused && (
                <View
                  style={{
                    width: 30,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: '#F00000',
                    marginTop: 7,
                  }}
                />
              )}
            </View>
          }>
          <LinearGradient
            colors={['#DF9320', '#C91CA3', '#3820CA']}
            start={{ x: 0.0, y: 0 }}
            end={{ x: 0, y: 1.0 }}
            style={{ flex: 1 }}
          />
        </MaskedView>
      ) : (
        <MaskedView
          style={{ flex: 1, flexDirection: 'row', height: '100%' }}
          maskElement={
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={boldIcon}
                fadeDuration={0}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: '#000',
                }}
              />
            </View>
          }>
          <LinearGradient colors={['#C7C7C7', '#FFFFFF']} style={{ flex: 1 }} />
        </MaskedView>
      )}
    </View>
  );
};

export default TabIcon;

// <LinearGradient colors={['#AB1A1A', '#F00000']} style={{ flex: 1 }} />

//  <SvgXml width="200" height="200" xml={Ticket} />

//  <Image
//         source={boldIcon}
//         resizeMode="contain"
//         style={{
//           width: 30,
//           height: 30,
//           tintColor: '#fff',
//         }}
//       />
