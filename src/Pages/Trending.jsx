import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import instance from "../api/axios";
import Loader from "../components/Loader";

const TrendingMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const res = await instance.get("/trending/all/week");
        const data = res.data.results || [];
        const filtered = data.filter((m) => m.poster_path);
        setMovies(filtered);
      } catch (err) {
        console.error("Failed to fetch trending movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader />
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">No Movies found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen mt-20">
      <div className="px-6 md:px-16 py-10">
        <h1 className="text-3xl font-bold mb-6">Trending This Week</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <Link
              key={movie.id}
              to={
                movie.media_type === "tv"
                  ? `/tv/${movie.id}`
                  : `/movie/${movie.id}`
              }
            >
              <div className="bg-gray-800 rounded shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-2 flex justify-between items-center">
                  <span className="font-semibold text-sm truncate">
                    {movie.title || movie.name}
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

export default TrendingMovies;
