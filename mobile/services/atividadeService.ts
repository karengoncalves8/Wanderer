import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { Atividade } from "@/interfaces/Atividade";

const getAllAtividades = async (viagem_id: number): Promise<Atividade[] | ApiException> => {
  try {
    const { data } = await Api.get(`/atividade/viagem/${viagem_id}`);
    return data as Atividade[];
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
}

const getAtividadesByData = async (viagem_id: number, data: string): Promise<Atividade[] | ApiException> => {
  try {
    const { data: responseData } = await Api.get(`/atividade/viagem/${viagem_id}/data/${data}`);
    return responseData as Atividade[];
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar atividades por data.");
    }
    return new ApiException("Erro desconhecido.");
  }
}


const createAtividade = async (atividade: any): Promise<Atividade | ApiException> => {
  try {
    const { data } = await Api.post(`/atividade`, atividade);
    return data as Atividade;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

export const atividadeService = {
  getAllAtividades,
  getAtividadesByData,
  createAtividade
}