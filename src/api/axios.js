import axios from "axios";

const api_Key = import.meta.env.VITE_TMDB_API_KEY; // make sure this exists

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: api_Key,
  },
});

export default instance;
