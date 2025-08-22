import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";
import instance from "../api/axios";

// Custom arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded bg-black/50 hover:bg-black text-white"
  >
    <FaChevronRight size={18} />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded bg-black/50 hover:bg-black text-white"
  >
    <FaChevronLeft size={18} />
  </button>
);

const Rows = ({ fetchUrl, title = "Movies" }) => {
  const sliderRef = useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch movies from TMDB
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await instance.get(fetchUrl);
        setMovies(res.data.results || []);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [fetchUrl]);

  // Responsive slides
  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;
      if (width < 480) setSlidesToShow(1);
      else if (width < 768) setSlidesToShow(2);
      else if (width < 1024) setSlidesToShow(3);
      else if (width < 1280) setSlidesToShow(4);
      else setSlidesToShow(5);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  if (loading) return <p className="text-white px-6 mt-10">Loading...</p>;

  return (
    <div className="px-6 mt-10 relative text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      <Slider ref={sliderRef} {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-2">
            <Link to={`/movie/${movie.id}`}>
              <div className="relative bg-gray-900 rounded overflow-hidden shadow-md group hover:scale-105 transition-transform duration-300">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="w-full h-72 md:h-80 object-cover rounded"
                />
                {movie.vote_average && (
                  <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-yellow-400 text-sm font-medium flex items-center gap-1">
                    <FaStar size={12} /> {movie.vote_average.toFixed(1)}
                  </div>
                )}
                <div className="absolute bottom-0 left-0 w-full bg-black/70 px-3 py-2 text-white font-semibold text-sm md:text-base truncate">
                  {movie.title || movie.name}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Rows;
