import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { AtividadeCategoria } from "@/interfaces/Atividade";

const getAllAtividadesCategorias = async (): Promise<AtividadeCategoria[] | ApiException> => {
  try {
    const { data } = await Api.get(`/atividadeCategoria/`);
    return data as AtividadeCategoria[];
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
}

export const atividadeCategoriaService = {
  getAllAtividadesCategorias
}