import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-white">CineTambay</h2>
          <p className="text-sm mt-2 text-gray-400">
            Your spot to binge trending movies and TV shows.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-400 cursor-pointer">Trending</li>
            <li className="hover:text-red-400 cursor-pointer">TV Shows</li>
            <li className="hover:text-red-400 cursor-pointer">Movies</li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-medium text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a href="#" className="hover:text-red-400">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-red-400">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-red-400">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} CineTambay. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
