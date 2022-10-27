import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Platform,
  Animated,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';

import { AsyncStorage } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { getMovies } from '../api';

import { icons, COLORS, SIZES, FONTS } from '../constants';

const { width, height } = SIZES;

import { Header, GradientBorder } from '../components';
import { fetchDiscoverMovies } from '../redux/movies/movies-action';

const SPACING = 10;
const ITEM_SIZE = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const BACKDROP_HEIGHT = height * 1;

const Backdrop = ({ movies, scrollX, navigation }) => {
  return (
    <View style={{ height: BACKDROP_HEIGHT, width, position: 'absolute' }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 10,
        }}>
        <Header />
      </View>

      <FlatList
        data={[{ key: 'empty-left' }, ...movies, { key: 'empty-right' }]}
        keyExtractor={(item) => item.key + '-backdrop'}
        removeClippedSubviews={false}
        contentContainerStyle={{ width, height: BACKDROP_HEIGHT }}
        renderItem={({ item, index }) => {
          if (!item.backdrop) {
            return null;
          }
          const translateX = scrollX.interpolate({
            inputRange: [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE],
            outputRange: [0, width],
          });
          return (
            <Animated.View
              style={{
                position: 'absolute',
                width: translateX,
                height,
                overflow: 'hidden',
              }}>
              <Image
                source={{ uri: item?.backdrop }}
                style={{
                  width,
                  height: BACKDROP_HEIGHT,
                  position: 'absolute',
                }}
              />
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                colors={['transparent', '#000']}
                style={{
                  height,
                  width,
                  position: 'absolute',
                  top: 0,
                }}
              />
              <View
                style={{
                  height,
                  width,
                  position: 'absolute',
                  top: 150,
                  paddingHorizontal: SIZES.padding,
                  zIndex: 150,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Text
                    style={{
                      width: '90%',
                      color: COLORS.white,
                      ...FONTS.h1,
                      marginBottom: 10,
                    }}>
                    {item.title}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: SIZES.base,
                    }}>
                    <Image
                      source={icons.star}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                      }}
                    />
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.h3,
                        fontSize: 18,
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
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}></View>
                </View>
              </View>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);
const Home = ({
  navigation,
  user,
  fetchDiscoverMovies,
  descoverMovies,
  loading,
}) => {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const movies = await getMovies();

  //     setMovies([{ key: 'empty-left' }, ...movies, { key: 'empty-right' }]);
  //   };

  //   if (movies.length === 0) {
  //     fetchData(movies);
  //   }
  // }, [movies]);
  React.useEffect(() => {
    if (descoverMovies.length > 0) {
      return;
    }
    fetchDiscoverMovies();
  }, [fetchDiscoverMovies]);

  if (descoverMovies.length === 0) {
    return <Loading />;
  }

  console.log('descoverMovies', descoverMovies);
  console.log('loading', loading);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <StatusBar barStyle="light-content" />

      <Backdrop
        movies={descoverMovies}
        scrollX={scrollX}
        navigation={navigation}
      />
      <Animated.FlatList
        data={[
          { key: 'empty-left' },
          ...descoverMovies,
          { key: 'empty-right' },
        ]}
        pagingEnabled={true}
        keyExtractor={(item) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{
          alignItems: 'flex-end',
        }}
        snapToAlignment="start"
        snapToInterval={ITEM_SIZE}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          if (!item.poster) {
            return <View style={{ width: EMPTY_ITEM_SIZE }} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [10, -20, 10],
            extrapolate: 'clamp',
          });

          return (
            <View
              style={{
                width: ITEM_SIZE,
              }}>
              <Animated.View
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  borderRadius: 30,
                  transform: [{ translateY }],
                  alignItems: 'center',
                }}>
                <Image
                  source={{ uri: item.poster }}
                  resizeMode="cover"
                  style={{
                    width: '100%',
                    height: ITEM_SIZE * 1.2,
                    borderRadius: 30,
                  }}
                />
                <GradientBorder
                  containerStyle={{
                    width: 123,
                    height: 34,
                    marginTop: 20,
                  }}
                  borderRadius={15}
                  onPress={() => {
                    navigation.navigate('Details', {
                      movie: item,
                    });
                    //console.log('user', user);
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.h3,
                    }}>
                    BUY TICKET
                  </Text>
                </GradientBorder>
              </Animated.View>
            </View>
          );
        }}
      />

      <View
        style={{
          marginBottom: 50,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    descoverMovies: state.movies.discoverMovies,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchDiscoverMovies: (onSuccess, onError) =>
    dispatch(fetchDiscoverMovies(onSuccess, onError)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// <TouchableOpacity
//   style={{
//     width: 123,
//     height: 34,
//     borderRadius: 15,
//     backgroundColor: COLORS.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10,
//   }}
//   onPress={() => {
//     navigation.navigate('Details', {
//       movie: item,
//     });
//     //console.log('user', user);
//   }}></TouchableOpacity>
