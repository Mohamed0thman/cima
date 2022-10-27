import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

import { Header, MovieItem } from '../components';

import { LinearGradient } from 'expo-linear-gradient';

import {
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
} from '../redux/movies/movies-action';

import { getNowPlaying, getUpcoming } from '../api';

import { dummyData, icons, COLORS, SIZES, FONTS } from '../constants';

const { width, height } = SIZES;

const Ticket = ({
  navigation,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
  upcomingMovies,
  nowplayingMovies,
}) => {
  const [toggleListIndex, setToggleListIndex] = React.useState(0);
  const toggleListArray = ['Today', 'Upcoming'];
  const [nowPlayingCurrentPage, setNowPlayingCurrentPage] = React.useState(1);
  const [upComingCurrentPage, setupComingCurrentPage] = React.useState(1);

  const [isLoading, setIsLoading] = React.useState(false);

  const flatlistRef = React.useRef();

  React.useEffect(() => {
    console.log('Today');
    setIsLoading(true);
    fetchNowPlayingMovies(nowPlayingCurrentPage);
    setIsLoading(false);
  }, [nowPlayingCurrentPage]);

  React.useEffect(() => {
    console.log('Upcoming');
    setIsLoading(true);
    fetchUpcomingMovies(upComingCurrentPage);
    setIsLoading(false);
  }, [upComingCurrentPage]);

  const loadMoreItem = () => {
    if (toggleListArray[toggleListIndex] === 'Today') {
      setNowPlayingCurrentPage(nowPlayingCurrentPage + 1);
    } else {
      setupComingCurrentPage(upComingCurrentPage + 1);
    }
  };

  const handleOnToggle = (index) => {
    flatlistRef.current.scrollToOffset({ offset: 0 });
    setToggleListIndex(index);
  };

  const renderLoader = () => {
    return isLoading ? (
      <View style={{ marginTop: 100, alignItems: 'center', height: 100 }}>
        <Text
          style={{
            color: '#fff',
          }}>
          loading......
        </Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    ) : null;
  };

  function renderToggle() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          marginVertical: 20,
        }}>
        <View
          style={{
            backgroundColor: COLORS.darkGray,
            height: 50,
            borderRadius: SIZES.radius,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 6,
            paddingVertical: 6,
          }}>
          {toggleListArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                flex: 1,
              }}
              onPress={() => handleOnToggle(index)}>
              <LinearGradient
                colors={
                  toggleListIndex === index
                    ? ['#DF9320', '#C91CA3', '#3820CA']
                    : ['transparent', 'transparent']
                }
                start={{ x: 0.0, y: 1 }}
                end={{ x: 1, y: 1.0 }}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 12,
                }}>
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.h2,
                    fontSize: 20,
                  }}>
                  {item}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  function renderMovies() {
    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}>
        <FlatList
          ref={flatlistRef}
          data={
            toggleListArray[toggleListIndex] === 'Today'
              ? nowplayingMovies
              : upcomingMovies
          }
          keyExtractor={(item) => item.key}
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreItem}
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
          ListFooterComponent={renderLoader}
        />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      <Header />
      {renderToggle()}
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: 30,
            zIndex: 110,
          }}>
          <LinearGradient
            colors={[COLORS.backgroundColor, COLORS.transparent]}
            style={{
              width,
              height: 30,
            }}
          />
        </View>
        {renderMovies()}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 90,
          }}>
          <LinearGradient
            colors={[COLORS.transparent, COLORS.backgroundColor]}
            style={{
              width,
              height: 90,
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    upcomingMovies: state.movies.upcomingMovies,
    nowplayingMovies: state.movies.nowplayingMovies,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNowPlayingMovies: (page, onSuccess, onError) =>
    dispatch(fetchNowPlayingMovies(page, onSuccess, onError)),
  fetchUpcomingMovies: (page, onSuccess, onError) =>
    dispatch(fetchUpcomingMovies(page, onSuccess, onError)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
