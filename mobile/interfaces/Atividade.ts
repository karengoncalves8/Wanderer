export interface AtividadeLocal {
    id?: number;
    localizacao: string;
    lat: number;
    long: number;
    atividadeId?: number;
}

export interface AtividadeCategoria {
    id?: number;
    nome: string;
    atividadeId?: number;
}

export interface Atividade {
    id?: number;
    nome: string;
    data: Date;
    hora_inicio: string;
    hora_fim: string;
    preco: number;
    viagemId?: number;
    atividadeLocal?: AtividadeLocal;
    atividadeCategoria?: AtividadeCategoria;
}