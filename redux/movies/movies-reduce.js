import { MoviesActionTypes } from './movies-type';

const INITIAL_STATE = {
  discoverMovies: [],
  upcomingMovies: [],
  nowplayingMovies: [],
  crew: [],
  cast: [],
};

const moviesReduser = (state = INITIAL_STATE, action) => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case MoviesActionTypes.SET_DISCOVER_MOVIES:
      return {
        ...state,
        discoverMovies: action.payload,
      };
    case MoviesActionTypes.SET_NOW_PLAYING_MOVIES:
      return {
        ...state,
        nowplayingMovies: state.nowplayingMovies.concat(action.payload),
      };
    case MoviesActionTypes.SET_UPCOMING_MOVIES:
      return {
        ...state,
        upcomingMovies: state.upcomingMovies.concat(action.payload),
      };
    case MoviesActionTypes.SET_CAST_AND_CREW:
      return {
        ...state,
        crew: action.payload.crew,
        cast: action.payload.cast,
      };
    default:
      return state;
  }
};

export default moviesReduser;
