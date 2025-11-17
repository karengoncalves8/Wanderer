export interface DespesaCategoria {
    id: number;
    nome: 'Alimentação' | 'Transporte' | 'Hospedagem' | 'Entretenimento' | 'Outros';
}

export interface Despesa {
    id: number;
    nome: string;
    valor: number;
    despesaCategoriaId: number;
    despesaCategoria?: DespesaCategoria;
    gastosId: number;
    createdAt: Date;
}
