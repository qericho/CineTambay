const api_Key = import.meta.env.VITE_TMDB_API_KEY;

const requests = {
  fetchTopRatedMovies: `/movie/top_rated?api_key=${api_Key}`,
  fetchUpcomingMovies: `/movie/upcoming?api_key=${api_Key}`,
  fetchNowPlayingMovies: `/movie/now_playing?api_key=${api_Key}`,
  fetchTrendingMovies: `https://api.themoviedb.org/3/trending/movie/week?api_key=${api_Key}`,
  fetchPopularTV: `/tv/popular?api_key=${api_Key}`,
};

export default requests;
