import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Animated,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { fetchCastAndCrew } from '../redux/movies/movies-action';

import { dummyData, icons, COLORS, SIZES, FONTS } from '../constants';

const { width, height } = SIZES;

import { getCast } from '../api';

import { ButtomTicket, GradientBorder } from '../components';

const HEADER_HEIGHT = 500;

const Details = ({
  route,
  navigation,
  fetchCastAndCrew,
  cast,
  crew,
  addFavoriteMovie,
  favorite,
}) => {
  const [movie, setMovie] = React.useState(null);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@favorite', jsonValue);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@favorite');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  React.useEffect(() => {
    let { movie } = route.params;
    setMovie(movie);
  });

  React.useEffect(() => {
    const handleSotrge = async () => {
      const data = await getData();
      console.log('Dadadada', data);

      if (data != null) {
        const exist = data.find((item) => item.key === movie.key);
        console.log('exist', exist);

        if (exist) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      }
      return;
    };

    handleSotrge();
  }, [movie]);

  React.useEffect(() => {
    if (movie?.key) {
      fetchCastAndCrew(movie?.key);
    }
  }, [movie, fetchCastAndCrew]);

  const handleOnCilckBookmark = async (data) => {
    const favoriteMovies = await getData();

    if (isFavorite) {
      const newFavoriteMovies = favoriteMovies.filter(
        (item) => item.key != data.key
      );
      console.log('removieItem', newFavoriteMovies);

      await storeData(newFavoriteMovies);

      setIsFavorite(false);

      return;
    } else {
      if (favoriteMovies != null) {
        console.log('yes');
        await storeData([...favoriteMovies, data]);
        console.log('favoriteMovies', favoriteMovies);
        setIsFavorite(true);
        return;
      }
      storeData([data]);
      setIsFavorite(true);
      console.log('no');
    }
  };

  console.log('favorite', favorite);

  function renderHeaderBar() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
          zIndex: 50,
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.black,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        />

        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 10,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),

            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                  outputRange: [50, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
              marginBottom: 2,
            }}>
            {movie?.title}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={icons.star}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
              }}
            />
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h3,

                marginHorizontal: SIZES.base,
              }}>
              {movie?.rating}
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
        </Animated.View>
        <GradientBorder
          containerStyle={{
            width: 30,
            height: 30,
          }}
          borderRadius={8}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.leftArrow}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
            }}
          />
        </GradientBorder>

        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 35,
            width: 35,
          }}
          onPress={() => handleOnCilckBookmark(movie)}>
          <Image
            source={isFavorite ? icons.bookmarkFilled : icons.bookmark}
            style={{
              width: 30,
              height: 30,
              tintColor: isFavorite ? COLORS.primary : COLORS.white,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMovieCardHeader() {
    return (
      <View
        style={{
          height: HEADER_HEIGHT,
        }}>
        <ImageBackground
          source={{ uri: movie?.backdrop }}
          style={{ flex: 1, justifyContent: 'flex-end' }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[COLORS.transparentBlack, COLORS.backgroundColor]}
            style={{
              height: HEADER_HEIGHT,
              justifyContent: 'flex-end',
              paddingHorizontal: SIZES.padding,
            }}>
            <Text
              style={{
                color: COLORS.white,
                ...FONTS.h1,
                marginBottom: 5,
              }}>
              {movie?.title}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 12,
              }}>
              <Image
                source={icons.star}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                }}
              />
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                  fontSize: 18,
                  marginHorizontal: SIZES.base,
                }}>
                {movie?.rating}
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 12,
              }}>
              {movie?.genres.map((genre, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={{
                      height: 28,
                      borderWidth: 1,
                      borderColor: COLORS.white,
                      borderRadius: 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      marginRight: 5,
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.h4,
                      }}>
                      {genre}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 10,
              }}>
              {crew.map((item, i) => {
                return (
                  <Text
                    key={item.id}
                    style={{
                      color: COLORS.white,
                    }}>
                    {`${item.job}:${item.name}`}{' '}
                    {i === crew.length - 1 ? '' : '|'}{' '}
                  </Text>
                );
              })}
            </View>

            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body4,
                lineHeight: 20,
                marginBottom: 12,
              }}>
              {movie?.description}
            </Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );
  }

  function renderCastHeader() {
    return (
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
          Cast
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <Animated.FlatList
        data={cast}
        keyExtractor={(item) => `${item.key}`}
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={true}
        scrollEventThrottle={16}
        bounces={true}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        ListHeaderComponent={
          <View>
            {renderMovieCardHeader()}
            {renderCastHeader()}
          </View>
        }
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: SIZES.padding,
                marginTop: 15,
              }}>
              <Image
                source={{ uri: item.profile }}
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                }}
              />

              <View
                style={{
                  alignItems: 'flex-start',
                  marginLeft: SIZES.base,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    color: COLORS.white,
                  }}>
                  as {item.character}
                </Text>
              </View>
            </View>
          );
        }}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 200,
            }}
          />
        }
      />
      {renderHeaderBar()}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LinearGradient
          colors={[COLORS.transparent, COLORS.backgroundColor]}
          style={{
            width,
            height: 90,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ButtomTicket
            onPress={() =>
              navigation.navigate('Booking', {
                movie,
              })
            }
          />
        </LinearGradient>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    cast: state.movies.cast,
    crew: state.movies.crew,
    favorite: state.favorite,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchCastAndCrew: (movieId, onSuccess, onError) =>
    dispatch(fetchCastAndCrew(movieId, onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Details);
