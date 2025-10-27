import axios from "axios";

const API = import.meta.env.VITE_API_URL;

//REGISTER USER

export const registerUser = async (userData) => {
  const res = await axios.post(`${API}/auth/register`, userData);
  return res.data;
};
//LOGIN USER

export const loginUser = async (userData) => {
  const res = await axios.post(`${API}/auth/login`, userData);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

//LOGOUT USER

export const logoutUser = () => {
  localStorage.removeItem("token");
};
