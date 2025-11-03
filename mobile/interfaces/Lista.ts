export interface ListaItem {
    id: number;
    nome: string;
    status: boolean;
}

export interface Lista {
    id: number;
    titulo: string;
    listaItems: ListaItem[];
}