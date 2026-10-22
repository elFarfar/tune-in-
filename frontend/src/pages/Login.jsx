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
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white px-6 py-12">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-6xl flex-col items-center justify-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex w-full max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
          <img
            src={logo}
            alt="Tune-In Logo"
            className="mb-6 h-auto w-28 hover:scale-105 transition-transform"
          />
          <h2 className="text-3xl font-semibold leading-snug md:text-4xl">
            Stuck on a sound? Let's work it out together.
          </h2>
          <p className="mt-4 text-base font-light leading-relaxed text-gray-300 md:text-lg">
            Share your beats, snippets, and unfinished ideas. Get feedback from
            fellow creators, solve mixing problems, and discover new ways to
            bring your sound to life.
          </p>
        </div>

        <div className="w-full max-w-md bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-xl">
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
    </div>
  );
}
