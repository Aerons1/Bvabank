import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "https://bvabankserver.onrender.com";

export const loginAdmin = async (email, password) => {
  return await axios.post(`${API_URL}/admin/login`, { email, password });
};

export const loginUser = async (email, password) => {
  return await axios.post(`${API_URL}/user/login`, { email, password });
};
