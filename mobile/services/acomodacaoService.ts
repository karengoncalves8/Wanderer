import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { Acomodacao } from "@/interfaces/Acomodacao";
import { Viagem } from "@/interfaces/Viagem";

const getAllAcomodacoes = async (viagem_id: number): Promise<Acomodacao[] | ApiException> => {
  try {
    const { data } = await Api.get(`/acomodacao/viagem/${viagem_id}`);
    return data as Acomodacao[];
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
}

const getAcomodacaoById = async (acomodacaoId: number): Promise<Viagem | ApiException> => {
  try {
    const { data } = await Api.get(`/acomodacao/${acomodacaoId}`);
    return data as Viagem;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar acomodação.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

const createAcomodacao = async (acomodacao: Acomodacao): Promise<Acomodacao | ApiException> => {
  try {
    const { data } = await Api.post(`/acomodacao`, acomodacao);
    return data as Acomodacao;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

export const acomodacaoService = {
  getAllAcomodacoes,
  getAcomodacaoById,
  createAcomodacao
}