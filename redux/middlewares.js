import axios from 'axios';
import { UserActionTypes } from './user/user-type';
import { LoadingActionTypes } from './loading/loading-type';
import { logoutUser } from './user/user-action';

export const apiMiddleware = ({ dispatch, getState }) => (next) => (action) => {
  if (action.type !== UserActionTypes.API) return next(action);
  const {
    url,
    method,
    success,
    data,
    themoviedb,
    postProcessSuccess,
    postProcessError,
  } = action.payload;

 
  dispatch({ type: LoadingActionTypes.TOGGLE_LOADER });

  const BASE_URL = 'https://multi-endpoint.herokuapp.com';
  const themoviedb_URL = `https://api.themoviedb.org`;
  const AUTH_TOKEN = getState().user.currentUser.token;
  if (AUTH_TOKEN) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  }

  axios({
    method,
    url: themoviedb ? themoviedb_URL + url : BASE_URL + url,
    data: data ? data : null,
  })
    .then((response) => {
      dispatch({ type: LoadingActionTypes.TOGGLE_LOADER });

      console.log('response', response);

      if (success) dispatch(success(response.data));
      if (postProcessSuccess) postProcessSuccess(response.data);
    })
    .catch((e) => {
      dispatch({ type: LoadingActionTypes.TOGGLE_LOADER });

      console.log(e);
      if (!e.response) console.warn(e);
      else {
        if (e.response && e.response.status === 403) {
          dispatch(logoutUser());
        }
        if (e.response.status === 401) {
          console.log(e.response);
        }
        if (e.response.data.message) {
          if (postProcessError) postProcessError(e.response.data.message);
        }
      }
    });
};
