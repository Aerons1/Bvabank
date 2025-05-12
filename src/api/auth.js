import axiosInstance from '../utils/axiosInstance';

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

export const loginAdmin = async (email, password) => {
  try {
    return await axiosInstance.post(`${API_URL}/admin/login`, { email, password });
  } catch (error) {
    console.error("Admin login failed:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    return await axiosInstance.post(`${API_URL}/users/login`, { email, password });
  } catch (error) {
    console.error("User login failed:", error);
    throw error;
  }
};
