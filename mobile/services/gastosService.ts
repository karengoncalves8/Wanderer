import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { Gastos } from "@/interfaces/Gastos";

const getAllGastos = async (viagem_id: number): Promise<Gastos[] | ApiException> => {
  try {
    const { data } = await Api.get(`/gastos/viagem/${viagem_id}`);
    return data as Gastos[];
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
}

const getGastosById = async (id: number): Promise<Gastos | ApiException> => {
  try {
    const { data } = await Api.get(`/gastos/${id}`);
    return data as Gastos;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
}

export const gastosService = {
  getAllGastos,
  getGastosById
}