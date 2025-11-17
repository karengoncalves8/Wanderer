import { ApiException } from '@/config/apiException';
import axios from 'axios';

const getPlaceImageUri = async (img_name: string): Promise<string | ApiException> => {
  try {
    const url = `https://places.googleapis.com/v1/${img_name}/media?maxHeightPx=400&maxWidthPx=400&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
    const response = await axios.get(url);
    console.log("response", response);
    return response.data.photoUri

  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

const getReverseGeolocation = async (lat: number, lng: number): Promise<any | ApiException> => {
  try {
    console.log("EXPO_PUBLIC_GOOGLE_API_KEY", process.env.EXPO_PUBLIC_GOOGLE_API_KEY);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
    console.log("url", url)
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

export const googleAPIService = {
    getPlaceImageUri,
    getReverseGeolocation
}