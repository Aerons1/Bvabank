import axiosInstance from '../utils/axiosInstance';

// No need for an API_URL constant here, axiosInstance already handles the base URL.

export const loginAdmin = async (email, password) => {
  try {
    // axiosInstance.baseURL is already e.g., 'https://bvabankserver.onrender.com/api'
    // So, we just append the specific route part '/admin/login'
    return await axiosInstance.post('/admin/login', { email, password });
  } catch (error) {
    console.error("Admin login failed:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    // Similarly, for user login, just the relative path
    return await axiosInstance.post('/users/login', { email, password });
  } catch (error) {
    console.error("User login failed:", error);
    throw error;
  }
};