import { ClassesVoo } from "@/enums/ClassesVoo";

export interface PassagemLocal {
    id?: number;
    tipo: 'partida' | 'chegada';
    data?: Date;
    localizacao?: string;
    iata?: string;
    passagemId?: number;
}

export interface Passagem {
    id?: number;
    companhia: string;
    classe: ClassesVoo;
    numero: number;
    passagemLocais: PassagemLocal[];
    preco: number;
    duracao: number;
    arquivo_pdf?: Buffer;
    viagemId?: number;
}