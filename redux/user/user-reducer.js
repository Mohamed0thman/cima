import { UserActionTypes } from './user-type';
import { AsyncStorage } from 'react-native';

const defaultState = {
  userId: null,
  fullName: null,
  email: null,
  token: null,
  isLoggedIn: false,
};

const getMyObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@USER_INFO');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }

  console.log('Done.');
};

const INITIAL_STATE = {
  accountDropdown: false,
  currentUser: getMyObject() != null ? getMyObject() : defaultState,
};

const userReduser = (state = INITIAL_STATE, action) => {
  console.log(' action.payload', action.payload);
  console.log('getMyObject', getMyObject());
  switch (action.type) {
    case UserActionTypes.TOGGLE_ACCOUNT_DORPDOWN:
      return {
        ...state,
        accountDropdown: !state.accountDropdown,
      };
    case UserActionTypes.SET_USER_INFO:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UserActionTypes.RESET_USER_INFO:
      return {
        ...state,
        currentUser: defaultState,
      };
    default:
      return state;
  }
};

export default userReduser;
