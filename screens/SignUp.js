import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';

import { LinearGradient } from 'expo-linear-gradient';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { registerUser } from '../redux/user/user-action';

import { icons, COLORS, SIZES, FONTS } from '../constants';

const { width, height } = SIZES;

import {
  BackIcon,
  CustomInput,
  CustomButton,
  GradientBorder,
} from '../components';

const SignUp = ({ navigation, registerUser, user }) => {
  const [fullName, setFullName] = React.useState({
    value: '',
    isSuccess: false,
    errormMssage: null,
  });
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

  const emailValidate = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      setEmail({
        value: text,
        isSuccess: false,
        errormMssage: 'Email is Not Correct',
      });
      return;
    } else {
      setEmail({
        value: text,
        isSuccess: true,
        errormMssage: null,
      });
    }
  };

  const passwordValidate = (text) => {
    if (text.length <= 8) {
      return setPassword({
        value: text,
        isSuccess: false,
        errormMssage: 'should contain at least 8',
      });
    }
    let reg = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if (reg.test(text) === false) {
      setPassword({
        value: text,
        isSuccess: false,
        errormMssage: 'password must have one digit or one chr',
      });
      return;
    } else {
      setPassword({
        value: text,
        isSuccess: true,
        errormMssage: null,
      });
    }
  };

  console.log(user);

  React.useEffect(() => {
    if (fullName.value.length > 0) {
      setFullName({
        ...fullName,
        isSuccess: true,
      });
    } else {
      setFullName({
        ...fullName,
        isSuccess: false,
      });
    }
  }, [fullName.value]);

  const handleSubmit = async (event) => {
    Keyboard.dismiss();
    registerUser(
      {
        full_name: fullName.value,
        email: email.value,
        password: password.value,
      },
      () => console.log('Account Created Successfully!'),
      (message) => console.log(`Error: ${message}`)
    );
  };

  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: 24,
          marginTop: 32,

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: COLORS.backgroundColor,
        }}>
        {renderHeader()}

        <KeyboardAwareScrollView>
          <View
            style={{
              marginTop: 35,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={icons.cimaPlusLogo} />
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: SIZES.padding,
            }}>
            <CustomInput
              containerStyle={{
                marginTop: 25,
              }}
              lable="name"
              placeholder="Your full name"
              placeholderTextColor="#C5C5C5"
              value={fullName.value}
              onChangeText={(text) =>
                setFullName({
                  ...fullName,
                  value: text,
                })
              }
              isSuccess={fullName.isSuccess}
            />
            <CustomInput
              containerStyle={{
                marginTop: 25,
              }}
              lable="Email"
              placeholder="Cima@app.com"
              placeholderTextColor="#C5C5C5"
              onChangeText={(text) => emailValidate(text)}
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
              onChangeText={(text) => passwordValidate(text)}
              maxLength={16}
              isSuccess={password.isSuccess}
              error={password.errormMssage}
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
                Already have an account?
              </Text>
              <TouchableOpacity
                style={{
                  marginLeft: 5,
                }}
                onPress={() => navigation.navigate('LogIn')}>
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
          <View
            style={{
              height: 30,
            }}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => ({
  registerUser: (userCredentials, onSuccess, onError) =>
    dispatch(registerUser(userCredentials, onSuccess, onError)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
