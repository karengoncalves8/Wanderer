import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { ListaItem } from "@/interfaces/Lista";

const createListaItem = async (listaItem: any): Promise<ListaItem | ApiException> => {
  try {
    console.log('[listaItemService] POST /listaItem', listaItem);
    const { data } = await Api.post(`/listaItem`, listaItem);
    console.log('[listaItemService] created', data);
    return data as ListaItem;
  } catch (error) {
    console.log('[listaItemService] create error', error);
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

const updateListaItem = async (id: number, payload: Partial<ListaItem>): Promise<ListaItem | ApiException> => {
  try {
    console.log('[listaItemService] PUT /listaItem/' + id, payload);
    const { data } = await Api.put(`/listaItem/${id}`, payload);
    console.log('[listaItemService] updated', data);
    return data as ListaItem;
  } catch (error) {
    console.log('[listaItemService] update error', error);
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

export const listaItemService = {
  createListaItem,
  updateListaItem,
}