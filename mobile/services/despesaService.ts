import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { Despesa } from "@/interfaces/Despesa";

const getAllDespesas = async (gastos_id: number): Promise<Despesa[] | ApiException> => {
  try {
    const { data } = await Api.get(`/despesa/gastos/${gastos_id}`);
    return data as Despesa[];
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
}


const createDespesa = async (despesa: any): Promise<Despesa | ApiException> => {
  try {
    const { data } = await Api.post(`/despesa`, despesa);
    return data as Despesa;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

export const despesaService = {
  getAllDespesas,
  createDespesa
}