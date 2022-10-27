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
  ImageBackground,
} from 'react-native';

import MaskedView from '@react-native-masked-view/masked-view';

import { LinearGradient } from 'expo-linear-gradient';

import { dummyData, icons, COLORS, SIZES, FONTS } from '../constants';
const { width, height } = SIZES;

import { ButtomTicket, GradientBorder } from '../components';

const Booking = ({ route, navigation }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const [movie, setMovie] = React.useState(null);
  const [seats, SetSeats] = React.useState(dummyData?.seats);

  const flatListDayRef = React.useRef(null);
  const flatListTimeRef = React.useRef(null);

  const [currentSelectedDayIndex, setCurrentSelectedDayIndex] = React.useState(
    2
  );
  const [
    currentSelectedTimeIndex,
    setCurrentSelectedTimeIndex,
  ] = React.useState(2);

  const seatsColumns = ['1', '2', '3', '4', '5', '6'];
  const seatsRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

  React.useEffect(() => {
    let { movie } = route.params;
    setMovie(movie);
  });

  const scrollToDayIndex = (index) => {
    flatListDayRef.current.scrollToIndex({
      animated: true,
      index,
      viewPosition: 0.5,
    });
    setCurrentSelectedDayIndex(index);
  };

  const scrollToTimeIndex = (index) => {
    flatListTimeRef.current.scrollToIndex({
      animated: true,
      index,
      viewPosition: 0.5,
    });
    setCurrentSelectedTimeIndex(index);
  };

  const selectSeat = (columnIndex, rowIndex) => {
    const selectedSeat = seats[columnIndex].row[rowIndex];
    let newSeats = [...seats];
    console.log(selectedSeat);

    if (selectedSeat.status === 'Available') {
      newSeats[columnIndex].row[rowIndex] = {
        ...selectedSeat,
        status: 'Selected',
      };
    }
    if (selectedSeat.status === 'Selected') {
      newSeats[columnIndex].row[rowIndex] = {
        ...selectedSeat,
        status: 'Available',
      };
    }

    SetSeats(newSeats);
  };

  function renderBookingHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
          paddingTop: 25,
          backgroundColor: '#000',
          height: 80,
        }}>
        <GradientBorder
          containerStyle={{
            width: 30,
            height: 30,
          }}
          borderRadius={8}
          onPress={() => navigation.navigate('Home')}>
          <Image
            source={icons.leftArrow}
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.white,
            }}
          />
        </GradientBorder>

        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h2,
          }}>
          Select Seats
        </Text>
        <View style={{ width: 30, height: 30 }} />
      </View>
    );
  }

  function renderSeats() {
    const seatStatus = (status) => {
      if (status === 'Reserved') {
        return COLORS.white;
      } else if (status === 'Selected') {
        return COLORS.primary;
      }

      return COLORS.darkGray;
    };
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          marginBottom: 5,
        }}>
        <View
          style={{
            marginTop: SIZES.base,
          }}
        />
        {seats.map((seat, columnIndex) => {
          return (
            <View
              key={columnIndex}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: SIZES.base * 2,
              }}>
              {seat?.row.map((row, rowIndex) => {
                return (
                  <TouchableOpacity
                    key={rowIndex}
                    style={{
                      width: 30,
                      height: 30,
                      backgroundColor: seatStatus(row.status),
                      borderRadius: SIZES.base,
                      marginRight: SIZES.base,
                    }}
                    onPress={() => selectSeat(columnIndex, rowIndex)}
                  />
                );
              })}
            </View>
          );
        })}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {dummyData.seatStatus.map((state, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8,
                }}>
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: seatStatus(state),
                    marginRight: 4,
                  }}
                />
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.body4,
                  }}>
                  {state}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  function renderDate() {
    return (
      <View
        style={{
          backgroundColor: COLORS.darkGray2,

          flex: 1,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        <View
          style={{
            paddingHorizontal: SIZES.padding,
            paddingTop: 10,
          }}>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h3,
            }}>
            Select Date
          </Text>
        </View>

        {/*  days */}

        <Animated.FlatList
          ref={flatListDayRef}
          data={dummyData?.days}
          keyExtractor={(item) => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          horizontal
          decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
          snapToAlignment={'center'}
          contentContainerStyle={{
            alignItems: 'center',
            marginTop: -40,
          }}
          getItemLayout={(data, index) => ({
            length: width / 5,
            offset: (width / 5) * index,
            index,
          })}
          snapToInterval={width / 5}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item, index }) => {
            const isCurrentlySelected = index === currentSelectedDayIndex;

            const ITEM_SIZE = width / 5;

            const inputRange = [
              (index - 4) * ITEM_SIZE,
              (index - 3) * ITEM_SIZE,
              (index - 2) * ITEM_SIZE,
              (index - 1) * ITEM_SIZE,
              index * ITEM_SIZE,
            ];

            const translateY = scrollX.interpolate({
              inputRange,
              outputRange: [10, 0, -10, 0, 10],
              extrapolate: 'clamp',
            });

            return (
              <Animated.View
                style={{
                  width: width / 5,
                  paddingHorizontal: 5,
                  paddingTop: 10,
                  transform: [{ translateY }],
                }}>
                <TouchableOpacity
                  style={
                    {
                      //backgroundColor: isCurrentlySelected ? COLORS.primary : '#000',
                      // borderRadius: 12,
                    }
                  }
                  onPress={() => scrollToDayIndex(index)}>
                  <ImageBackground
                    source={
                      isCurrentlySelected
                        ? icons.selectedDayButtom
                        : icons.dayButtom
                    }
                    style={{
                      width: '100%',
                      height: 75,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.body5,
                      }}>
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.white,
                        ...FONTS.h2,
                      }}>
                      {item.date}
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </Animated.View>
            );
          }}
        />

        {/*  Times */}

        <FlatList
          ref={flatListTimeRef}
          data={dummyData.times}
          keyExtractor={(item) => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          horizontal
          snapToAlignment={'center'}
          contentContainerStyle={{
            alignItems: 'flex-start',
          }}
          getItemLayout={(data, index) => ({
            length: width / 5,
            offset: (width / 5) * index,
            index,
          })}
          snapToInterval={width / 5}
          scrollEventThrottle={16}
          renderItem={({ item, index }) => {
            const SPACING = 10;
            const ITEM_SIZE =
              Platform.OS === 'ios' ? (width / 5) * 0.8 : (width / 5) * 0.84;

            const isCurrentlySelected = index === currentSelectedTimeIndex;

            return (
              <View
                style={{
                  width: width / 5,
                  paddingHorizontal: 5,
                }}>
                <TouchableOpacity
                  style={{
                    height: 35,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: isCurrentlySelected
                      ? COLORS.primary
                      : COLORS.lightGray,
                    borderRadius: 8,
                  }}
                  onPress={() => scrollToTimeIndex(index)}>
                  <Text
                    style={{
                      color: COLORS.white,
                      ...FONTS.body5,
                    }}>
                    {item.time}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.black,
      }}>
      {renderBookingHeader()}
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          backgroundColor: COLORS.backgroundColor,
          borderTopColor: COLORS.secondary,
          borderTopWidth: 3,
        }}>
        {renderSeats()}
        {renderDate()}

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
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: SIZES.padding,
            }}>
            <View>
              <Text
                style={{
                  color: COLORS.lightGray,
                  ...FONTS.body4,
                }}>
                Price
              </Text>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h2,
                }}>
                $48.00
              </Text>
            </View>
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
    </SafeAreaView>
  );
};

export default Booking;
