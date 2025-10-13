import { Link } from "react-router-dom";
import { Home, Search, User } from "lucide-react";
import logo from "../assets/LOGO.png";

const Navbar = () => {
  return (
    <nav className="bg-black text-white flex items-center justify-between px-8 py-4 shadow-lg">
      {/* LEFT SIDE */}

      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="flex items-center space-x-1 hover:text-blue-400 transition"
        >
          <Home size="{20}" />
          <span className="text-sm font-semibold tracking-widest">HOME</span>
        </Link>

        <Link
          to="/explore"
          className="flex items-center space-x-1 hover:text-blue-400 transition"
        >
          <Search size="{20}" />
          <span className="text-sm font-semibold tracking-widest">EXPLORE</span>
        </Link>
      </div>
      {/*CENTER - LOGO */}
      <Link to="/" className="flex items-center justify-center">
        <img
          src="{logo}"
          alt="Tune-in Logo"
          className="h-10 object-contain hover:scale-105 transition-transform"
        />
      </Link>
    </nav>
  );
};
