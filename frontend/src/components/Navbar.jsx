import { Link, useNavigate } from "react-router-dom";
import { Home, Search, User, LogOut } from "lucide-react";
import logo from "../assets/LOGO.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white flex items-center justify-between px-8 py-4 shadow-lg w-full fixed top-0 left-0 z-50">
      {/* LEFT SIDE */}
      <div className="flex items-center space-x-6">
        <Link
          to="/"
          className="flex items-center space-x-1 hover:text-blue-400 transition"
        >
          <Home size={20} />
          <span className="text-sm font-semibold tracking-widest">HOME</span>
        </Link>

        <Link
          to="/explore"
          className="flex items-center space-x-1 hover:text-blue-400 transition"
        >
          <Search size={20} />
          <span className="text-sm font-semibold tracking-widest">EXPLORE</span>
        </Link>

        {/* Admin link (visible only if admin) */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="flex items-center space-x-1 hover:text-yellow-400 transition"
          >
            <span className="text-sm font-semibold tracking-widest">ADMIN</span>
          </Link>
        )}
      </div>

      {/* CENTER - LOGO */}
      <Link to="/" className="flex items-center justify-center">
        <img
          src={logo}
          alt="Tune-In Logo"
          className="h-12 object-contain hover:scale-105 transition-transform"
        />
      </Link>

      {/* RIGHT SIDE */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link
              to="/profile"
              className="flex items-center space-x-1 hover:text-blue-400 transition"
            >
              <span className="text-sm font-semibold tracking-widest">
                PROFILE
              </span>
              <User size={20} />
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-400 hover:text-red-600 transition"
            >
              <span className="text-sm font-semibold tracking-widest">
                LOGOUT
              </span>
              <LogOut size={20} />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-semibold tracking-widest hover:text-blue-400 transition"
            >
              LOGIN
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold tracking-widest hover:text-blue-400 transition"
            >
              REGISTER
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
