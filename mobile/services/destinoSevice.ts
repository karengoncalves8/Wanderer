import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { Destino } from "@/interfaces/Destino";

const getPopularDestinations = async (languageCode: string): Promise<Destino[] | ApiException> => {
  try {
    const { data } = await Api.get(`/destinos/popular`, {
      params: { languageCode }
    });
    return data as Destino[];
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao buscar destinos populares.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

const getDestinationDetails = async (objId: string, userCountry: string): Promise<Destino | ApiException> => {
  try {
    const { data } = await Api.get(`/destinos/details`, {
      params: { objId, userCountry }
    });
    return data as Destino;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao buscar detalhes do destino.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

export const destinoService = {
  getPopularDestinations,
  getDestinationDetails
};