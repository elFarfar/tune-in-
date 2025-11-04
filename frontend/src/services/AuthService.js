import api from "../utils/api";

// REGISTER USER
export const registerUser = async (userData) => {
  const res = await api.post("/auth/register", userData);
  return res.data;
};

// LOGIN USER
export const loginUser = async (userData) => {
  const res = await api.post("/auth/login", userData);

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data;
};

// LOGOUT USER
export const logoutUser = () => {
  localStorage.removeItem("token");
};
