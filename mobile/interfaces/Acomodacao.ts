import { Avaliacao } from "./Avaliacao";

export interface Acomodacao {
    id?: number;
    nome: string;
    preco: number;
    tipo: string;
    gps_lat: number;
    gps_long: number;
    localizacao: string;
    check_in: string | Date;
    check_out: string | Date;
    data_entrada: Date;
    data_saida: Date;
    dias: number;
    viagemId: number;
    avaliacao?: Avaliacao;
}
