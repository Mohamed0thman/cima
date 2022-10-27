import { combineReducers } from 'redux';
import userReduser from './user/user-reducer';
import loadingReducer from './loading/loading-reduce';
import moviesReduser from './movies/movies-reduce';

const rootReducer = combineReducers({
  user: userReduser,
  loading: loadingReducer,
  movies: moviesReduser,
});

export default rootReducer;
