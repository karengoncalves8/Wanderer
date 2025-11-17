import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { Viagem } from "@/interfaces/Viagem";

const getAllViagens = async (usuario_id: number): Promise<Viagem[] | ApiException> => {
  try {
    const { data } = await Api.get(`/viagem/usuario/${usuario_id}`);
    return data as Viagem[];
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
}

const updateAllViagensStatus = async (usuario_id: number): Promise<Viagem[] | ApiException> => {
  try {
    const { data } = await Api.get(`/viagem/usuario/${usuario_id}/status`);
    return data as Viagem[];
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
}

const getViagemById = async (viagemId: number): Promise<Viagem | ApiException> => {
  try {
    const { data } = await Api.get(`/viagem/${viagemId}`);
    return data as Viagem;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar viagem.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

const createViagem = async (viagem: any, usuario_id: number): Promise<Viagem | ApiException> => {
  try {
    const { data } = await Api.post(`/viagem/usuario/${usuario_id}`, viagem);
    return data as Viagem;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

export const viagemService = {
    createViagem,
    getAllViagens,
    updateAllViagensStatus,
    getViagemById
}