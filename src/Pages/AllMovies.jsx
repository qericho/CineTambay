import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import instance from "../api/axios";
import requests from "../api/requests";
import Loader from "../components/Loader";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await instance.get(requests.fetchTrendingMovies);
        setMovies(res.data.results || []);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
        <Loader />
      </div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen mt-20">
      <div className="px-6 md:px-16 py-10">
        <h1 className="text-3xl font-bold mb-6">All Movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <div className="bg-gray-800 rounded shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 object-cover"
                />
                <div className="p-2 flex justify-between items-center">
                  <span className="font-semibold text-sm truncate">
                    {movie.title}
                  </span>
                  {movie.vote_average && (
                    <span className="flex items-center gap-1 text-yellow-400 text-sm">
                      <FaStar size={12} /> {movie.vote_average.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
