// App.jsx
import { useState, useEffect } from "react";
import Banner from "./components/Banner";
import Rows from "./components/Rows";
import Loader from "./components/Loader";
import requests from "./api/requests";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <Loader color="#f00" />
      </div>
    );
  }

  return (
    <div>
      <Banner />
      <Rows fetchUrl={requests.fetchUpcomingMovies} title="Upcoming Movies" />
      <Rows fetchUrl={requests.fetchNowPlayingMovies} title="Trending Now" />
      <Rows fetchUrl={requests.fetchTopRatedMovies} title="Top Rated" />
      <Rows fetchUrl={requests.fetchPopularTV} title="Popular TV Shows" />
    </div>
  );
};

export default App;
