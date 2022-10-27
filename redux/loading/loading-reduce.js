import { LoadingActionTypes } from './loading-type';

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case LoadingActionTypes.TOGGLE_LOADER:
      return !state;
    default:
      return state;
  }
};

export default loadingReducer;
