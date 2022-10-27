import React from 'react';
import { View, Text, SafeAreaView, FlatList, AsyncStorage } from 'react-native';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

import { icons, COLORS, SIZES, FONTS } from '../constants';

const { width, height } = SIZES;

import { Header, MovieItem } from '../components';

const Favorite = ({ navigation }) => {
  const [favoriteMovies, setFavoriteMovies] = React.useState([]);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    console.log('called');

    // Call only when screen open or when back on screen
    if (isFocused) {
      getData();
    }
  }, [isFocused]);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorite');
      console.log('jsonValue', jsonValue);

      setFavoriteMovies(jsonValue != null ? JSON.parse(jsonValue) : []);
      return;
    } catch (e) {
      // error reading value
    }
  };

  console.log('favoriteMovies', favoriteMovies);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <Header />
      {favoriteMovies.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#fff',
              ...FONTS.h2,
            }}>
            There is no item
          </Text>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding,
              marginVertical: 15,
            }}>
            <View
              style={{
                width: 5,
                height: 35,
                backgroundColor: '#FFCA0E',
              }}
            />
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h2,
                marginLeft: SIZES.base,
              }}>
              Favorite
            </Text>
          </View>
          <FlatList
            data={favoriteMovies}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding,
            }}
            renderItem={({ item, index }) => {
              return (
                <MovieItem
                  item={item}
                  onPress={() =>
                    navigation.navigate('Details', {
                      movie: item,
                    })
                  }
                />
              );
            }}
            ListFooterComponent={
              <View
                style={{
                  marginTop: 80,
                }}
              />
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};
export default Favorite;
