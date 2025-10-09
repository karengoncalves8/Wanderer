import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Replace 'YOUR_LOCAL_IP' with your actual local IP address
// To find your IP: run 'ipconfig' in Windows Command Prompt and look for IPv4 Address
// Example: 'http://192.168.1.100:5000' or 'http://192.168.0.105:5000'
export const Api = axios.create({
  baseURL: 'http://192.168.15.9:5000', // Change this to your actual local IP
});

// Helper function to get token from the same storage used by AuthContext
const getStorageToken = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem(key);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
    return null;
  } else {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (e) {
      console.error('SecureStore is unavailable:', e);
      return null;
    }
  }
};

Api.interceptors.request.use(async (config) => {
  const token = await getStorageToken('session');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔑 Token attached to request:', token.substring(0, 20) + '...');
  } else {
    console.log('⚠️ No token found in storage');
  }
  return config;
});

// Response interceptor to handle auth errors
Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('🚫 Authentication failed:', error.response.data);
    }
    return Promise.reject(error);
  }
);