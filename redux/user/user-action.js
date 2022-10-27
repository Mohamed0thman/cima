import { UserActionTypes } from './user-type';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = (data, onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: 'POST',
    url: '/api/users/register',
    data,
    success: (response) => setUserInfo(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const loginUser = (data, onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: 'POST',
    url: '/api/users/login',
    data,
    success: (response) => setUserInfo(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const logoutUser = async () => {
  await AsyncStorage.removeItem('USER_INFO');
  return { type: UserActionTypes.RESET_USER_INFO };
};

const setUserInfo = (data) => {
  const userInfo = {
    userId: data.user.user_id,
    fullName: data.user.full_name,
    email: data.user.email,
    token: data.user.token,
    isLoggedIn: true,
  };

  setObjectValue(userInfo);
  return { type: UserActionTypes.SET_USER_INFO, payload: userInfo };
};

const setObjectValue = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@USER_INFO', jsonValue);

    console.log('jsonValue', jsonValue);
  } catch (e) {
    // save error
    console.log(e);
  }

  console.log('Done.');
};

export const updateUser = (data, onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: 'PATCH',
    url: '/api/users/me',
    data,
    success: (response) => setUserProfile(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const fetchUserProfile = (data, onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: 'GET',
    url: '/api/users/me',
    data,
    success: (response) => setUserProfile(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

const setUserProfile = (data) => ({
  type: UserActionTypes.SET_USER_PROFILE,
  payload: data,
});

export const uploadAvatar = (data, onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: 'POST',
    url: '/api/users/me/avatar',
    data,
    headers: {
      ContentType: 'multipart/form-data',
    },
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});
export const deleteAvatar = (onSuccess, onError) => ({
  type: UserActionTypes.API,
  payload: {
    method: 'DELETE',
    url: '/api/users/me/avatar',
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});
