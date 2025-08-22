import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import instance from "../api/axios";
import requests from "../api/requests";
import Loader from "../components/Loader";

const AllTvShows = ({ fetchUrl = requests.fetchPopularTV }) => {
  const [tvShows, setTvShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const res = await instance.get(fetchUrl);
        setTvShows(res.data.results || []);
      } catch (err) {
        console.error("Failed to fetch TV shows:", err);
        setTvShows([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTvShows();
  }, [fetchUrl]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <Loader color="#f00" />
      </div>
    );
  }

  if (!tvShows.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-white text-xl">No TV Shows found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen mt-20">
      <div className="px-6 md:px-16 py-10">
        <h1 className="text-3xl font-bold mb-6">All TV Shows</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {tvShows.map((tv) => (
            <Link key={tv.id} to={`/tv/${tv.id}`}>
              <div className="bg-gray-800 rounded shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">
                <img
                  src={
                    tv.poster_path
                      ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={tv.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-2 flex justify-between items-center">
                  <span className="font-semibold text-sm truncate">
                    {tv.name}
                  </span>
                  {tv.vote_average !== undefined && (
                    <span className="flex items-center gap-1 text-yellow-400 text-sm">
                      <FaStar size={12} /> {tv.vote_average.toFixed(1)}
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

export default AllTvShows;
