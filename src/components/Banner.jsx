import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaPlay, FaPlus } from "react-icons/fa";
import instance from "../api/axios";
import requests from "../api/requests";
import Loader from "./Loader";

const Banner = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await instance.get(requests.fetchNowPlayingMovies);
        setMovies(res.data.results.slice(0, 10));
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const truncateText = (text, maxLength) =>
    text && text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-900">
        <Loader color="#f00" />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <section
                className="relative h-[70vh] w-full text-white flex items-center justify-start"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 px-6 md:px-16 max-w-2xl">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    {movie.title || movie.name}
                  </h1>
                  <p className="text-sm md:text-lg mb-6 line-clamp-3">
                    {truncateText(movie.overview, 150)}
                  </p>
                  <div className="flex gap-4">
                    {/* Save Button */}
                    <button className="bg-red-700 px-6 py-2 md:px-8 md:py-3 font-medium rounded hover:bg-red-800 transition flex items-center gap-2">
                      <FaPlus /> Save
                    </button>
                    {/* Play Button */}
                    <button className="bg-white text-black px-6 py-2 md:px-8 md:py-3 font-medium rounded hover:bg-gray-200 transition flex items-center gap-2">
                      <FaPlay /> Play
                    </button>
                  </div>
                </div>
              </section>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
