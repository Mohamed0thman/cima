import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';

import { loginUser } from '../redux/user/user-action';

import { icons, COLORS, SIZES, FONTS } from '../constants';

const { width, height } = SIZES;

import {
  BackIcon,
  CustomInput,
  CustomButton,
  GradientBorder,
} from '../components';

const LogIn = ({ navigation, loginUser, isLoggedIn }) => {
  const [email, setEmail] = React.useState({
    value: '',
    isSuccess: false,
    errormMssage: null,
  });
  const [password, setPassword] = React.useState({
    value: '',
    isSuccess: false,
    errormMssage: null,
  });

  const validate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmail({
        value: text,
        isSuccess: false,
        errormMssage: 'Email is Not Correct',
      });
      return false;
    } else {
      setEmail({
        value: text,
        isSuccess: true,
        errormMssage: null,
      });
    }
  };

  const handleSubmit = async (event) => {
    loginUser(
      {
        email: email.value,
        password: password.value,
      },
      () => {
        navigation.navigate('Home');
        return console.log('Account Created Successfully!');
      },
      (message) => console.log(`Error: ${message}`)
    );
  };

  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: 24,
          paddingTop: 30,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
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
            marginLeft: 10,
          }}>
          Sign up
        </Text>
      </View>
    );
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
      }}>
      {renderHeader()}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 35,
        }}>
        <Image source={icons.cimaPlusLogo} fadeDuration={0} style={{}} />
      </View>

      <View
        style={{
          paddingHorizontal: SIZES.padding,
        }}>
        <CustomInput
          containerStyle={{
            marginTop: 25,
          }}
          lable="Email"
          placeholder="CimaPlus@app.com"
          placeholderTextColor="#C5C5C5"
          onChangeText={(text) => validate(text)}
          value={email.value}
          isSuccess={email.isSuccess}
          error={email.errormMssage}
        />
        <CustomInput
          containerStyle={{
            marginTop: 25,
          }}
          lable="Passward"
          secureTextEntry={true}
          placeholder="Pick a strong password"
          placeholderTextColor="#C5C5C5"
          value={password.value}
          onChangeText={(text) =>
            setPassword({
              ...password,
              value: text,
            })
          }
          maxLength={16}
        />
        <CustomButton
          containerStyle={{
            marginTop: 25,
          }}
          lable="Create Account"
          onPress={() => handleSubmit()}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Text
            style={{
              color: '#F3F3F3',
              ...FONTS.body4,
            }}>
            Dont have an account?
          </Text>
          <TouchableOpacity
            style={{
              marginLeft: 5,
            }}
            onPress={() => navigation.goBack()}>
            <Text
              style={{
                color: '#fff',
                ...FONTS.h4,
              }}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.currentUser.isLoggedIn,
  };
};
const mapDispatchToProps = (dispatch) => ({
  loginUser: (userCredentials, onSuccess, onError) =>
    dispatch(loginUser(userCredentials, onSuccess, onError)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
