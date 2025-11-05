import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API}/posts`, postData, config); 
  return response.data;
};

export const getPosts = async () => {
  const response = await axios.get(`${API}/posts`); 
  return response.data;
};
