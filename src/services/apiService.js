// src/services/apiService.js
import axios from "axios";
import { API_ENDPOINTS, BASE_URL } from "../authapi/api";

export const loginApi = async (email, password) => {
  try {
    const response = await axios.post(API_ENDPOINTS.LOGIN, {
      email,
      password,
    });

    return response.data;  // token + user data
  } catch (err) {
    throw err.response?.data || { message: "Admin login failed" };
  }
};
