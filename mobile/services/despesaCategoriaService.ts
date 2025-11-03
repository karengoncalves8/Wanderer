import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { DespesaCategoria } from "@/interfaces/Despesa";

const getAllDespesasCategorias = async (): Promise<DespesaCategoria[] | ApiException> => {
  try {
    const { data } = await Api.get(`/despesaCategoria/`);
    return data as DespesaCategoria[];
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
}

export const despesaCategoriaService = {
  getAllDespesasCategorias
}