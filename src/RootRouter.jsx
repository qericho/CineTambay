import { Routes, Route } from "react-router-dom";
import App from "./App";
import MovieDetails from "./Pages/MovieDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllMovies from "./Pages/AllMovies";
import AllTvShows from "./Pages/AllTvShows";
import Trending from "./Pages/Trending";
import ScrollToTop from "./Pages/ScrollToTop";

const RootRouter = () => (
  <>
    <Navbar />
    <ScrollToTop />
    <main>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movies" element={<AllMovies />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/tvshows" element={<AllTvShows />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </main>
    <Footer />
  </>
);

export default RootRouter;
