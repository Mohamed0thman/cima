import { API_KEY } from './config';
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

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

const getImagePath = (path) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path) => `https://image.tmdb.org/t/p/original${path}`;

const getProfilePath = (path) => `https://image.tmdb.org/t/p/w92${path}`;
export const getMovies = async () => {
  const { results } = await fetch(API_URL).then((x) => x.json());

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

export const getCast = async (id) => {
  const results = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
  ).then((x) => x.json());

  const cast = results.cast.map(({ id, name, profile_path, character }) => ({
    key: id,
    name,
    character,
    profile: getProfilePath(profile_path),
  }));

  let crew = [];

  results.crew.forEach(({ id, name, job }) => {
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

  return { cast, crew };
};

export const getNowPlaying = async (page) => {
  console.log(page);
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&region=US&page=${page}`
  ).then((x) => x.json());

  console.log(data);

  const movies = data.results.map(
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
  console.log(movies);

  return movies;
};

export const getUpcoming = async (page) => {
  console.log(page);
  const data = await fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&region=US&page=${page}`
  ).then((x) => x.json());

  console.log('getUpcoming', data);

  const movies = data.results.map(
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
  console.log(movies);
  return movies;
};

// w370_and_h556_multi_faces
