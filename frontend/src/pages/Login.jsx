import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService.js";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/LOGO.png";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      const { token, user } = res;

      // Spara i context
      login(user, token);

      setMessage("Login successful!");
      navigate("/"); // gå till startsidan
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white px-4">
      {/* Logo */}
      <img
        src={logo}
        alt="Tune-In Logo"
        className="w-28 h-auto mb-4 hover:scale-105 transition-transform"
      />

      {/* Intro Text */}
      <h2 className="text-center text-lg font-light text-gray-300 mb-8">
        It's never been easier to spread you're love to music!
      </h2>

      {/* Login screen */}
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.email}
          />

          <input
            type="password"
            name="password"
            placeholder="Lösenord"
            className="p-3 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            value={formData.password}
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded font-semibold transition-colors"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-300">{message}</p>
        )}

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Create an account today
          </a>
        </p>
      </div>
    </div>
  );
}
