import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { Voo, VooAPISearch } from "@/interfaces/VooAPI";

const searchVoo = async (params: VooAPISearch): Promise<Voo[] | ApiException> => { 
  try {
    const { data } = await Api.get(`/voos?iataOrigem=${params.iataOrigem}&iataDestino=${params.iataDestino}&dataPartida=${params.dataPartida}&idaEVolta=${params.idaEVolta}&classe=${params.classe}&usuarioPais=${params.usuarioPais}&idioma=${params.idioma}`);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};


export const vooAPIService = {
    searchVoo
}