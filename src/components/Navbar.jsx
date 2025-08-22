import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const Links = [
    { name: "Trending", path: "/trending" },
    { name: "TV Show", path: "/tvshows" },
    { name: "Movies", path: "/movies" },
  ];

  return (
    <nav
      className={`p-1 md:p-2 fixed top-0 w-full z-[9999] transition-all duration-300 ${
        isScrolled ? "bg-black/40 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="rounded w-full flex items-center justify-between px-3 md:px-10 py-4">
        <h1 className="text-xl md:text-2xl font-medium text-white">
          <Link to="/">CineTambay</Link>
        </h1>
        <ul className="flex items-center gap-x-4 text-sm md:text-xl">
          {Links.map((li, i) => (
            <li key={i}>
              <Link
                to={li.path}
                className="cursor-pointer hover:text-red-400 text-white"
              >
                {li.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
