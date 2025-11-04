import axios from "axios";

const API_URL = "http://localhost:5000/api/posts";

export const createPost = async (postData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, postData, config);
  return response.data;
};

export const getPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
