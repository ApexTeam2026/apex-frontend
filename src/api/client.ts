import axios from "axios";
import Constants from "expo-constants";
import { TokenStore } from "./tokenStore";
const API_URL = Constants.expoConfig?.extra?.API_URL;
console.log("API_URL:", API_URL);
const apiClient = axios.create({
  baseURL: API_URL, 
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// подключение токена
apiClient.interceptors.request.use(
  async (config) => {
    // TODO: заменить на AsyncStorage / SecureStore
    const token = TokenStore.get();

    console.log("CURRENT TOKEN:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// обработка ошибок глобально
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;