import { Api } from "@/config/api";
import { ApiException } from "@/config/apiException";

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

export const usuarioService = {
    verifyLogin
}