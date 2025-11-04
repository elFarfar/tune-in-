import { useState } from "react";
import { registerUser } from "../services/authService.js";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "artist",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      setMessage(res.message || "User registered successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage(
        error.response?.data?.message ||
          "Something went wrong during registration"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            onChange={handleChange}
            value={formData.username}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            onChange={handleChange}
            value={formData.password}
          />
          <select
            name="role"
            className="p-2 rounded bg-gray-700 text-white border border-gray-600"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="artist">Artist</option>
            <option value="producer">Producer</option>
            <option value="A&R">A&R</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded font-semibold"
          >
            Register
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}

        <p className="mt-6 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
