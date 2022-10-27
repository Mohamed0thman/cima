import { MoviesActionTypes } from './movies-type';
import { API_KEY } from '../../config';

const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

const getImagePath = (path) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path) => `https://image.tmdb.org/t/p/original${path}`;

const getProfilePath = (path) => `https://image.tmdb.org/t/p/w92${path}`;

const formatData = (results) => {
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: id,
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres[genre]),
    })
  );

  return movies;
};

export const fetchDiscoverMovies = (onSuccess, onError) => ({
  type: MoviesActionTypes.API,
  payload: {
    method: 'GET',
    url: `/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`,
    themoviedb: true,
    success: (response) => setDiscoverMovies(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const fetchNowPlayingMovies = (page, onSuccess, onError) => ({
  type: MoviesActionTypes.API,
  payload: {
    method: 'GET',
    url: `/3/movie/now_playing?api_key=${API_KEY}&region=US&page=${page}`,
    themoviedb: true,
    success: (response) => setNowplaying(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const fetchUpcomingMovies = (page, onSuccess, onError) => ({
  type: MoviesActionTypes.API,
  payload: {
    method: 'GET',
    url: `/3/movie/upcoming?api_key=${API_KEY}&language=en-US&region=US&page=${page}`,
    themoviedb: true,
    success: (response) => setUpcoming(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

export const fetchCastAndCrew = (id, onSuccess, onError) => ({
  type: MoviesActionTypes.API,
  payload: {
    method: 'GET',
    url: `/3/movie/${id}/credits?api_key=${API_KEY}`,
    themoviedb: true,
    success: (response) => setCastAndCrew(response),
    postProcessSuccess: onSuccess,
    postProcessError: onError,
  },
});

const setDiscoverMovies = (data) => {
  const movies = formatData(data.results);
  return {
    type: MoviesActionTypes.SET_DISCOVER_MOVIES,
    payload: movies,
  };
};

const setNowplaying = (data) => {
  console.log(data);
  const movies = formatData(data.results);
  console.log('nowPlaying', movies);
  return {
    type: MoviesActionTypes.SET_NOW_PLAYING_MOVIES,
    payload: movies,
  };
};

const setUpcoming = (data) => {
  const movies = formatData(data.results);
  return {
    type: MoviesActionTypes.SET_UPCOMING_MOVIES,
    payload: movies,
  };
};

const setCastAndCrew = (data) => {
  console.log('data2', data);
  const cast = data.cast.map(({ id, name, profile_path, character }) => ({
    key: id,
    name,
    character,
    profile: getProfilePath(profile_path),
  }));
  console.log('cast', cast);

  let crew = [];

  data.crew.forEach(({ id, name, job }) => {
    if (
      (job === 'Director' || job === 'Writer') &&
      !crew.some((item) => item.job === job)
    ) {
      crew.push({
        id,
        name,
        job,
      });
    }
    return;
  });

  console.log('crew', crew);

  return {
    type: MoviesActionTypes.SET_CAST_AND_CREW,
    payload: { cast, crew },
  };
};
