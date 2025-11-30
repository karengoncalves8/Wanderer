import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";
import { Usuario } from "@/interfaces/Usuario";

const verifyLogin = async (email: string, password: string): Promise<string | ApiException> => {
  try {
    const { data } = await Api.post('/usuario/login', {email, senha: password});
    return data.token;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

const createUser = async (usuario: Usuario): Promise<Usuario | ApiException> => {
  try {
    const { data } = await Api.post('/usuario', usuario);
    return data as Usuario;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

const updateUser = async (usuario: any): Promise<Usuario | ApiException> => {
  try {
    const { data } = await Api.put('/usuario', usuario);
    return data as Usuario;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

const updateUserPreferences = async (id: number, preferencias: any): Promise<Usuario | ApiException> => {
  try {
    const { data } = await Api.put(`/usuario/${id}/preferencias`, preferencias);
    return data as Usuario;
  } catch (error) {
    if (error instanceof Error) {
      return new ApiException(error.message || "Erro ao consultar empresas.");
    }
    return new ApiException("Erro desconhecido.");
  }
};

export const usuarioService = {
    verifyLogin,
    createUser,
    updateUser,
    updateUserPreferences
}