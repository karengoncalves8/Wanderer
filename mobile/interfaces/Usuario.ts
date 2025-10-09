import { PrefAcomodacao, PrefIdioma, PrefOrcamento, PrefTransporte } from "@/enums/UsuarioPrefs"

export interface Usuario {
    id?: number,
    nome: string,
    email: string,
    senha: string, 
    dataNascimento: Date,
    cidade: string,
    pais: string,
    preferencias?: UsuarioPreferencia
}

export interface UsuarioPreferencia {
    id?: number,
    idioma: PrefIdioma,
    transporte: PrefTransporte,
    acomodacao: PrefAcomodacao,
    orcamento: PrefOrcamento
}