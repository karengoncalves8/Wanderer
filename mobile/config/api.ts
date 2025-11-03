import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Replace 'YOUR_LOCAL_IP' with your actual local IP address
// To find your IP: run 'ipconfig' in Windows Command Prompt and look for IPv4 Address
// Example: 'http://192.168.1.100:5000' or 'http://192.168.0.105:5000'
export const Api = axios.create({
  // baseURL: Platform.OS === 'android' 
  //   ? 'http://10.0.2.2:5000'  // Android emulator localhost
  //   : 'http://192.168.137.1:5000', // iOS simulator or physical device
  baseURL: 'http://192.168.15.12:5000',
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request logging
Api.interceptors.request.use(
  (config) => {
    console.log('🚀 Making request to:', config.baseURL! + config.url);
    console.log('📱 Platform:', Platform.OS);
    console.log('🔧 Config:', JSON.stringify(config, null, 2));
    return config;
  },
  (error) => {
    console.log('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Helper function to get token from the same storage used by AuthContext
const getStorageToken = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    try {
      if (typeof localStorage !== 'undefined') {
        const sessionData = localStorage.getItem(key);
        if (sessionData) {
          try {
            const parsed = JSON.parse(sessionData);
            return parsed.token || null;
          } catch {
            // If it's not JSON, assume it's a raw token
            return sessionData;
          }
        }
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
    return null;
  } else {
    try {
      const sessionData = await SecureStore.getItemAsync(key);
      if (sessionData) {
        try {
          const parsed = JSON.parse(sessionData);
          return parsed.token || null;
        } catch {
          // If it's not JSON, assume it's a raw token
          return sessionData;
        }
      }
      return null;
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
  (response) => {
    console.log('✅ Response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log('❌ Response error:', error.message);
    console.log('🔍 Error details:', {
      code: error.code,
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
    });
    
    if (error.response?.status === 401) {
      console.log('🚫 Authentication failed:', error.response.data);
    } else if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
      console.log('🌐 Network error - check if API server is running and accessible');
    }
    return Promise.reject(error);
  }
);

// Test function to check API connectivity
export const testApiConnection = async (): Promise<boolean> => {
  try {
    console.log('🧪 Testing API connection...');
    console.log('🔗 Base URL:', Api.defaults.baseURL);
    console.log('📱 Platform:', Platform.OS);
    
    const response = await Api.get('/api-docs');
    console.log('✅ API connection successful!', response.status);
    return true;
  } catch (error: any) {
    console.log('❌ API connection failed:', error.message);
    console.log('🔍 Error code:', error.code);
    console.log('🌐 Network error details:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
      config: error.config
    });
    return false;
  }
};

// Test function to debug token extraction
export const debugTokenExtraction = async (): Promise<void> => {
  try {
    console.log('🧪 Testing token extraction...');
    const rawSession = Platform.OS === 'web' 
      ? (typeof localStorage !== 'undefined' ? localStorage.getItem('session') : null)
      : await SecureStore.getItemAsync('session');
    
    console.log('📦 Raw session from storage:', rawSession);
    
    const extractedToken = await getStorageToken('session');
    console.log('🎯 Extracted token:', extractedToken);
    
    if (rawSession && extractedToken) {
      try {
        const parsed = JSON.parse(rawSession);
        console.log('👤 User info available:', parsed.user);
        console.log('🔑 Token matches:', parsed.token === extractedToken);
      } catch (e) {
        console.log('⚠️ Session is not JSON, treating as raw token');
      }
    }
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
};