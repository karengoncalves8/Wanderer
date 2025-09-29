import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { AcomodacaoAPI, AcomodacaoAPISearch } from "@/interfaces/acomodacaoAPI";

const searchAcomodacao = async (params: AcomodacaoAPISearch): Promise<AcomodacaoAPI[] | ApiException> => {
  try {
    const { data } = await Api.get(`/acomodacoesAPI?cidade=${params.cidade}&checkin=${params.checkin}&checkout=${params.checkout}&hospedes=${params.hospedes}`);
    return data.token;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};


export const acomodacaoAPIService = {
    searchAcomodacao
}