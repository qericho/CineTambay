import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaTimes,
  FaPlus,
} from "react-icons/fa";
import Slider from "react-slick";
import instance from "../api/axios";
import Loader from "../components/Loader";

// Custom arrows
const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-3 rounded z-10"
  >
    <FaChevronRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-3 rounded z-10"
  >
    <FaChevronLeft />
  </button>
);

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);

  const [slidesToShow, setSlidesToShow] = useState(5);

  const truncateText = (text, maxLength) =>
    text && text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await instance.get(`/movie/${id}`);
        setMovie(res.data);

        const similarRes = await instance.get(`/movie/${id}/similar`);
        setSimilarMovies(similarRes.data.results.slice(0, 10));

        const trailerRes = await instance.get(`/movie/${id}/videos`);
        const trailer = trailerRes.data.results.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer"
        );
        if (trailer)
          setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
      } catch (err) {
        console.error("Failed to fetch movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader />
      </div>
    );

  if (!movie)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <p className="text-white text-xl">Movie not found</p>
      </div>
    );

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen text-white">
      {/* Banner */}
      <div
        className="relative h-[80vh] w-full flex items-end md:items-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 30%, rgba(0,0,0,0.5) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="px-6 md:px-16 w-full flex flex-col md:flex-row items-start md:items-center gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-40 md:w-64 rounded shadow-xl"
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 mb-4 text-sm md:text-base">
              {movie.vote_average && (
                <div className="flex items-center gap-1 text-yellow-400 font-semibold">
                  <FaStar /> {movie.vote_average.toFixed(1)}
                </div>
              )}
              <span>{movie.release_date?.slice(0, 4)}</span>
              <span>{movie.runtime} min</span>
            </div>
            <p className="text-gray-300 mb-6 line-clamp-6">
              {truncateText(movie.overview, 200)}
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="cursor-pointer bg-red-700 px-6 py-2 md:px-8 md:py-3 font-medium rounded hover:bg-red-800 transition flex items-center gap-2">
                <FaPlus /> Save
              </button>

              {trailerUrl ? (
                <button
                  onClick={() => setShowTrailer(true)}
                  className="cursor-pointer bg-white text-black px-6 py-2 md:px-8 md:py-3 font-medium rounded hover:bg-gray-200 transition flex items-center gap-2"
                >
                  <FaPlay /> Play Trailer
                </button>
              ) : (
                <button className="bg-gray-600 text-gray-200 px-6 py-2 md:px-8 md:py-3 font-medium rounded cursor-not-allowed">
                  No Trailer Available
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && trailerUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl bg-black rounded shadow-lg">
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 text-white text-xl z-50"
            >
              <FaTimes />
            </button>
            <iframe
              className="w-full h-96 md:h-[500px] rounded"
              src={trailerUrl}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {similarMovies.length > 0 && (
        <div className="px-6 md:px-16 mt-10 relative">
          <h2 className="text-2xl font-bold mb-6">Similar Movies</h2>
          <Slider {...sliderSettings}>
            {similarMovies.map((smovie) => (
              <div key={smovie.id} className="px-2">
                <Link to={`/movie/${smovie.id}`}>
                  <div className="relative bg-gray-900 rounded shadow-md overflow-hidden hover:scale-105 transition-transform">
                    <img
                      src={`https://image.tmdb.org/t/p/w300${smovie.poster_path}`}
                      alt={smovie.title}
                      className="w-full h-72 object-cover rounded"
                    />
                    <div className="absolute top-2 left-2 bg-black/70 px-2 py-1 rounded text-yellow-400 text-sm font-medium flex items-center gap-1">
                      <FaStar /> {smovie.vote_average.toFixed(1)}
                    </div>
                    <div className="absolute bottom-0 left-0 w-full bg-black/70 px-3 py-2 text-white font-semibold text-sm truncate">
                      {smovie.title}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
