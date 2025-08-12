import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// Base URL for your backend API - update this with your actual backend URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor - handle common response scenarios
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // Handle common errors
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Simplified API service class - only GET requests for menu viewing
export class ApiService {
  // GET request
  static async get<T>(endpoint: string): Promise<T> {
    try {
      const response = await apiClient.get<T>(endpoint);
      return response.data;
    } catch (error) {
      console.error(`GET ${endpoint} failed:`, error);
      throw error;
    }
  }
}

export default apiClient;
