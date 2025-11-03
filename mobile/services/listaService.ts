import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { Lista } from "@/interfaces/Lista";

const getAllListas = async (viagem_id: number): Promise<Lista[] | ApiException> => {
  try {
    const { data } = await Api.get(`/lista/viagem/${viagem_id}`);
    return data as Lista[];
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
}


const createLista = async (lista: any): Promise<Lista | ApiException> => {
  try {
    const { data } = await Api.post(`/lista`, lista);
    return data as Lista;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

export const listaService = {
  getAllListas,
  createLista
}