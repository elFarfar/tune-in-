import { Link, useNavigate } from "react-router-dom";
import { Home, Search, User, LogOut, X, Menu } from "lucide-react";
import logo from "../assets/LOGO.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-black text-white fixed top-0 left-0 w-full z-50 shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        {/* LEFT SIDE (Desktop) */}
        <div className="hidden md:flex items-center space-x-6">
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
            <span className="text-sm font-semibold tracking-widest">
              EXPLORE
            </span>
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="flex items-center space-x-1 hover:text-yellow-400 transition"
            >
              <span className="text-sm font-semibold tracking-widest">
                ADMIN
              </span>
            </Link>
          )}
        </div>

        {/* LOGO */}
        <Link to="/" className="flex items-center justify-center">
          <img
            src={logo}
            alt="Tune-In Logo"
            className="h-12 object-contain hover:scale-105 transition-transform"
          />
        </Link>

        {/* RIGHT SIDE (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
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

        {/* HAMBURGER ICON (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-black border-t border-gray-700 flex flex-col space-y-4 px-6 py-4">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition"
          >
            HOME
          </Link>
          <Link
            to="/explore"
            onClick={() => setMenuOpen(false)}
            className="hover:text-blue-400 transition"
          >
            EXPLORE
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-400 transition"
            >
              ADMIN
            </Link>
          )}

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-400 transition"
              >
                PROFILE
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-red-400 hover:text-red-600 transition"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-400 transition"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="hover:text-blue-400 transition"
              >
                REGISTER
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
